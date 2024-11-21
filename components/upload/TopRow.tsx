import React from 'react';
import { View, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { FlashMode } from 'expo-camera';
import Countdown from './Countdown';
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
                    <Image source={require('../../assets/images/xIcon.svg')} className="w-6 h-6" />
                </Pressable>

                <Countdown startTime={startTime} duration={duration} />
                <Pressable onPress={toggleFlash} className = "justify-center items-center">
                    <Image source={require('../../assets/images/flashIcon.svg')} className="w-6 h-6 relative"/>
                        {flash == "off" && <View className="w-full h-[1.5px] bg-white rotate-45 absolute"/>}
                    
                </Pressable>
            </View>
    )
}