import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { Link } from 'expo-router'
import BottomSheet from './bottomsheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'

const SearchBar = () => (
    <View style={styles.searchContainer}>
        <View style={styles.searchSection}>
            <View style={styles.searchField}>
                <Ionicons style={styles.searchIcon} name='ios-search' size={20} color={Colors.medium} />
                <TextInput style={styles.input} placeholder='Restaurants, groceries, dishes' placeholderTextColor={Colors.grey} />
            </View>
            <Link href={'/(modal)/filter'} asChild>
                <TouchableOpacity style={styles.optionButton}>
                    <Ionicons name={'options-outline'} size={20} color={Colors.primary} />
                </TouchableOpacity>
            </Link>
        </View>
    </View>
)

const CustomHeader = () => {
    const bottomSheetRef = useRef<BottomSheetModal>(null);
    const openModal = () => {
        bottomSheetRef.current?.present();
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <BottomSheet ref={bottomSheetRef} />
            <View style={styles.container}>
                <TouchableOpacity onPress={openModal}>
                    <Image style={styles.bike} source={require('@/assets/images/bike.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.titleContainer} onPress={openModal}>
                    <Text style={styles.title}>Delivery · Now</Text>
                    <View style={styles.locationName}>
                        <Text style={styles.subtitle}>Selected Location</Text>
                        <Ionicons name='chevron-down' size={20} color={Colors.primary} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.profileButton} >
                    <Ionicons name='person-outline' size={20} color={Colors.primary} />
                </TouchableOpacity>
            </View>
            <SearchBar />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    bike: {
        width: 30,
        height: 30
    },
    titleContainer: {
        flex: 1
    },
    title: {
        fontSize: 14,
        color: Colors.medium
    },
    locationName: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileButton: {
        backgroundColor: Colors.lightGrey,
        padding: 10,
        borderRadius: 50
    },
    searchContainer: {
        height: 50,
        backgroundColor: 'white'
    },
    searchSection: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    searchField: {
        backgroundColor: Colors.lightGrey,
        flex: 1,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        paddingLeft: 10
    },
    input: {
        padding: 10,
        color: Colors.mediumDark,
    },
    optionButton: {
        padding: 10,
        borderRadius: 50
    }

})

export default CustomHeader;