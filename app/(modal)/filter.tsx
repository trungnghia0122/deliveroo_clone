import { View, Text, StyleSheet, FlatList, TouchableOpacity, ListRenderItem } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '@/constants/Colors'
import { useNavigation } from 'expo-router'
import categories from '@/assets/data/filter.json'
import { Ionicons } from '@expo/vector-icons'
import { CheckBox } from 'react-native-elements'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface Category {
    name: string;
    count: number;
    checked?: boolean;
}

const ItemBox = () => (
    <>
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item} >
                <Ionicons name='arrow-down-outline' size={20} color={Colors.medium} />
                <View style={{ flex: 1 }}>
                    <Text>Sort</Text>
                    <Text style={{ color: Colors.medium, fontSize: 13 }}>Recommended</Text>
                </View>
                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} >
                <Ionicons name='fast-food-outline' size={20} color={Colors.medium} />
                <Text style={{ flex: 1 }}>Hygiene Rating</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} >
                <Ionicons name='pricetag-outline' size={20} color={Colors.medium} />
                <Text style={{ flex: 1 }}>Offers</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} >
                <Ionicons name='nutrition-outline' size={20} color={Colors.medium} />
                <Text style={{ flex: 1 }}>Dietary</Text>
                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
            </TouchableOpacity>

        </View>
        <Text style={styles.header}>Categories</Text>
    </>
)

const Filter = () => {
    const navigation = useNavigation();
    const [items, setItems] = useState<Category[]>(categories)
    const [selected, setSelected] = useState<Category[]>([]);
    const flexWidth = useSharedValue(0);
    const scale = useSharedValue(0);

    useEffect(() => {
        const hasSelected = selected.length > 0;
        const selectedItems = items.filter((item) => item.checked)
        const newSelected = selectedItems.length > 0;

        if (hasSelected !== newSelected) {
            flexWidth.value = withTiming(newSelected ? 150 : 0);
            scale.value = withTiming(newSelected ? 1 : 0);
        }

        setSelected(selectedItems)
    }, [items])

    const handleClearAll = () => {
        const updatedItems = items.map((item) => {
            item.checked = false;
            return item;
        })
        setItems(updatedItems);
    }

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width: flexWidth.value,
            opacity: flexWidth.value > 0 ? 1 : 0
        }
    })

    const animatedText = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        }
    })

    const renderItem: ListRenderItem<Category> = ({ item, index }) => (
        <View style={styles.row}>
            <View style={styles.rowHeader}>
                <Text>{item.name}</Text>
                <Text style={{ color: Colors.medium }}>({item.count})</Text>
            </View>
            <BouncyCheckbox fillColor={Colors.primary}
                isChecked={items[index].checked}
                unfillColor={'white'}
                disableBuiltInState
                iconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
                innerIconStyle={{ borderColor: Colors.primary, borderRadius: 4 }}
                onPress={() => {
                    const isChecked = items[index].checked
                    const updatedItems = items.map((item) => {
                        if (item.name === items[index].name) {
                            item.checked = !isChecked
                        }
                        return item;
                    })
                    setItems(updatedItems)
                }}
            />
        </View>
    )

    return (
        <View style={styles.container}>
            <FlatList data={items} renderItem={renderItem} ListHeaderComponent={<ItemBox />} />
            <View style={{ height: 76 }} />
            <View style={styles.footer} >

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleClearAll}>
                        <Animated.View style={[animatedStyles, styles.outlineButton]} >
                            <Animated.Text style={[animatedText, styles.outlineButtonText]}>Clear all</Animated.Text>
                        </Animated.View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.fullButton} onPress={() => { navigation.goBack() }}>
                        <Text style={styles.footerText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGrey,
        padding: 24
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: -10
        }
    },
    fullButton: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        padding: 18,
        borderRadius: 4,
        flex: 1,
        height: 56,
    },
    footerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    itemContainer: {
        backgroundColor: 'white',
        paddingTop: 8,
        paddingRight: 8,
        paddingLeft: 8,
        borderRadius: 8,
        marginBottom: 16,
    },
    header: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderColor: Colors.grey,
        borderBottomWidth: 0.5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderColor: Colors.grey,
        borderBottomWidth: 0.5,
    },
    rowHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center'
    },
    outlineButton: {
        borderColor: Colors.primary,
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        height: 56
    },
    outlineButtonText: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
    }

})

export default Filter;