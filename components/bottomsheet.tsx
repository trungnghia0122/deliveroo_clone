import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React, { forwardRef, useCallback, useMemo } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router';

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
    const snapPoints = useMemo(() => ['50%'], []);
    const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />, [])
    const { dismiss } = useBottomSheetModal();

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: 'none' }}
            backgroundStyle={{ borderRadius: 0, backgroundColor: Colors.lightGrey }} overDragResistanceFactor={0} ref={ref}
            snapPoints={snapPoints} backdropComponent={renderBackdrop}>
            <View style={styles.contentContainer}>
                <View style={styles.toggle} >
                    <TouchableOpacity style={styles.toggleActive}>
                        <Text style={styles.activeText}>Delivery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleInactive}>
                        <Text style={styles.inactiveText} >Pickup</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.subheader} >Your location</Text>
                    <Link href={'/'} asChild>

                        <TouchableOpacity>
                            <View style={styles.item}>
                                <Ionicons name='location-outline' size={20} color={Colors.medium} />
                                <Text style={{ flex: 1 }}>Select Location</Text>
                                <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                            </View>
                        </TouchableOpacity>
                    </Link>
                    <Text style={styles.subheader} >Arrival time</Text>
                    <TouchableOpacity>
                        <View style={styles.item}>
                            <Ionicons name='stopwatch-outline' size={20} color={Colors.medium} />
                            <Text style={{ flex: 1 }}>Now</Text>
                            <Ionicons name='chevron-forward' size={20} color={Colors.primary} />
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => dismiss()}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetModal>
    )
});

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1
    },
    toggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 32,
        alignItems: 'center'
    },
    toggleActive: {
        backgroundColor: Colors.primary,
        padding: 4,
        borderRadius: 32,
        paddingHorizontal: 35
    },
    activeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    toggleInactive: {
        padding: 5,
        borderRadius: 32,
        paddingHorizontal: 30
    },
    inactiveText: {
        color: Colors.primary,
        fontWeight: '500'
    },
    item: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 12,
        borderColor: Colors.grey,
        borderWidth: 1,
        marginBottom: 20
    },
    subheader: {
        margin: 16,
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        padding: 18,
        margin: 16,
        borderRadius: 4
    }




})


export default BottomSheet;
