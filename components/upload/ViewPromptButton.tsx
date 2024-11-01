import React, {useState} from 'react';
import { Pressable, Text } from 'react-native';
import { Image } from 'expo-image';



type ViewPromptButtonProps = {
    viewPromptOpen: boolean,
    handleViewPrompt: () => void,
}

export function ViewPromptButton({viewPromptOpen, handleViewPrompt}: ViewPromptButtonProps){
    const [text, setText] = useState<string>("View Prompt");

    function toggleViewPrompt(){
        setText(viewPromptOpen ? "View Prompt" : "Close Prompt");
        handleViewPrompt();
    }

    return(
        <Pressable onPress={toggleViewPrompt} className = "bg-white justify-center items-center pr-2 py-2 rounded-[30px] flex-row gap-x-2 opacity-100 max-w-[45%]">
            <Image source={viewPromptOpen ? require(`../../assets/images/xIconBlack.svg`) : require(`../../assets/images/eyeIcon.svg`)} className={`${viewPromptOpen ? "w-3 h-3 " : "w-4 h-4 "}`}/>
            <Text className = "font-semibold">{text}</Text>
        </Pressable>
    )
}