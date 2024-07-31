import React from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FlashMode } from 'expo-camera';
import Countdown from '../../../components/upload/Countdown';
import { router } from 'expo-router'

type TopRowProps = {
    startTime: string,
    duration: number,
    flash: FlashMode,
    toggleFlash: () => void,
}

export default function TopRow({startTime, duration, flash, toggleFlash}: TopRowProps) {
    return(
            <View className="flex flex-row w-full h-[12%] items-center justify-between px-6">
                <Pressable onPress={() => router.back()}>
                    <Image source={require('../../../assets/images/xIcon.svg')} className="w-6 h-6" />
                </Pressable>

                <Countdown startTime={startTime} duration={duration} />
                <Pressable onPress={toggleFlash}>
                    <Image source={require('../../../assets/images/flashIcon.svg')} className="w-6 h-6 justify-center items-center">
                        {flash == "off" && <View className="w-full h-[1.5px] bg-white rotate-45"/>}
                    </Image>
                </Pressable>
            </View>
    )
}