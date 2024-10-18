import React from 'react';
import { Text, Pressable} from 'react-native';
import { Image } from 'expo-image'

type PromptResponseButtonProps = {
    tag: string;
    onPress: () => void;
}

// Map of tag to image source
const tagImageMap: { [key: string]: any } = {
    Image: require("../assets/images/image_tag_icon.svg"),
    Text: require("../assets/images/file-text.svg"),
    Video: require('../assets/images/video_tag_icon.svg'),
  };

export default function PromptCardButton({tag, onPress}: PromptResponseButtonProps) {
    const imageSource = tagImageMap[tag];
    return (
        <Pressable className = "flex flex-row justify-center items-center bg-[#020205] h-[57px] rounded-[20px] w-[327px] gap-x-3" onPress={onPress}>
            <Image source={imageSource} style={{width: 24, height: 24}}/>
            <Text className = "text-[20px] text-white font-medium">Respond to the prompt</Text>
        </Pressable>
    );
}