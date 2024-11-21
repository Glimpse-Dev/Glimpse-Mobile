import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { ViewPromptButton } from '../ViewPromptButton';

type BottomRowProps = {
    viewPromptOpen: boolean,
    handleViewPrompt: () => void,
    uploadText: () => void,
}

export default function BottomRow({viewPromptOpen, handleViewPrompt, uploadText}: BottomRowProps){
    return(
        <View className = "flex flex-row w-full h-[20%] items-center justify-between px-9">
            <ViewPromptButton viewPromptOpen={viewPromptOpen} handleViewPrompt={handleViewPrompt} />
            <Pressable onPress={uploadText} className = "py-2 px-4 flex items-center justify-center rounded-[30px] bg-zinc-500">
                <Text className = "text-white font-semibold">Upload</Text>
            </Pressable>
        </View>
    )
}