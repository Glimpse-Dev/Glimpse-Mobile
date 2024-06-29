import React from 'react';
import { Text, View, Pressable} from 'react-native';

type PromptCardButtonProps = {
    onPress: () => void;
}

export default function PromptCardButton(props: PromptCardButtonProps) {
    return (
        <Pressable className = "flex flex-row justify-center items-center bg-black dark:bg-white h-[35px] rounded-[20px] w-[289px]" onPress={props.onPress}>
            <Text className = "text-sm text-white dark:text-black font-semibold">Enter Your Answer</Text>
        </Pressable>
    );
}