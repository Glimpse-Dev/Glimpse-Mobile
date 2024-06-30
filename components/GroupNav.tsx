import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { Image } from 'expo-image'

type GroupNavProps = {
    groupName: string
    groupImage: string
    profileImage: string
}

export default function GroupNav({ groupName, groupImage, profileImage }: GroupNavProps) {
    return (
        <View className = "flex flex-row items-center justify-between w-full h-10 px-5">
            <View className = "flex flex-row items-center gap-x-3">
                <Pressable onPress={showGroups}>
                    <Image source = {require('../assets/images/group_menu.svg')} className = "w-6 h-6" />
                </Pressable>
                <Image source = {groupImage} className = "w-10 h-10 rounded-[10px]" />
                <Text className = "text-xl font-semibold text-black dark:text-white">{groupName}</Text>
            </View>
            <Image source = {profileImage} className = "w-10 h-10 rounded-full" />

        </View>
    )
}

function showGroups () {
    console.log('show groups')
}