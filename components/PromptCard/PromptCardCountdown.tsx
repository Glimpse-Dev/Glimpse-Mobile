import React from 'react';
import { Text, View,} from 'react-native';

type PromptCardCountdownProps = {
    time: string;
}

export default function PromptCardCountdown(props: PromptCardCountdownProps) {
    return (
        <View className = "flex-col justify-center items-center">
            <Text className = "text-xs dark:text-white">Expiring in</Text>
            <Text className = "text-lg font-semibold dark:text-white -mt-1">{props.time}</Text>
        </View>
    );
}