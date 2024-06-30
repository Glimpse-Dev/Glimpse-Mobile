import React from 'react';
import {Text, View} from 'react-native';
import { Image } from 'expo-image'
 
type PromptCardTagProps = {
    tag: string;
}

const tagImageMap: { [key: string]: any } = {
    Image: require('../../assets/images/image_tag_icon.svg'),
    Text: require('../../assets/images/text_tag_icon.svg'),
    Video: require('../../assets/images/video_tag_icon.svg'),
  };

export default function PromptCardTag(props: PromptCardTagProps) {
    const imageSource = tagImageMap[props.tag]
    return (
        <View className = "flex flex-row -mt-1 items-center gap-x-1">
            <Image source={imageSource} className = "w-4 h-4"/>
            <Text className = "text-sm font-medium dark:text-white">{props.tag}</Text>
        </View>
    );
}