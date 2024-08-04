import React, { useEffect, useRef, useState} from 'react';
import { View, TextInput, Text} from 'react-native';
import { BlurView } from 'expo-blur';

type TextBoxProps = {
    text: string,
    setText: (text: string) => void,
    prompt: string,
    viewPromptOpen: boolean,
}

//Keep in Mind: May need to fix text box limit logic for people who set their text to be larger font size
//Be wary of potential bug with text box height limit

export default function TextBox({text, setText, prompt, viewPromptOpen}: TextBoxProps) {
    const textInputRef = useRef<TextInput>(null);
    const [inputHeight, setInputHeight] = useState(0);
    const [oldText, setOldText] = useState<string>(text);

    useEffect(() => {
        if (textInputRef.current) {
            textInputRef.current.measure((x, y, width, height) => {
                setInputHeight(height);
            });
        }
    }, [textInputRef.current]);

    const handleTextChange = (newText: string) => {
        setOldText(text);
        setText(newText);
        
    }

    const handleContentSizeChange = (contentWidth: number, contentHeight: number) => {
        if (contentHeight > inputHeight && inputHeight !== 0) {
            setText(oldText);
        }
    }

    return (
            <View className = {`relative w-full h-[66%] rounded-[20px] overflow-hidden`}>
                <View className = {`w-full h-full flex flex-col justify-between px-6 py-10 bg-white rounded-[20px] ${viewPromptOpen ? "opacity-60 " : ""}` }>
                    <TextInput
                        ref={textInputRef}
                        editable
                        multiline
                        value = {text}
                        onContentSizeChange={(e) => handleContentSizeChange(e.nativeEvent.contentSize.width, e.nativeEvent.contentSize.height)}
                        onChangeText = {handleTextChange}
                        placeholder="Tap to type"
                        placeholderTextColor={"#D9D9D9"}
                        style={{ fontSize: 24, fontWeight: '600', height: '76%', lineHeight: 32 }}
                        scrollEnabled={false}
                        maxLength={280}
                        numberOfLines={10}
                    />
                    <Text className = "text-[#D9D9D9] text-right text-xl font-medium">{text.length}/280</Text>
                </View>
                {viewPromptOpen && (
                    <BlurView 
                        intensity={20} 
                        className = "absolute w-full h-full rounded-[20px] overflow-hidden"
                    />
                )}
                {viewPromptOpen && (
                    <View className = "absolute w-full h-full flex items-center justify-start px-6 py-10 rounded-[20px] z-10">
                        <Text className = "text-4xl text-white">{prompt}</Text>
                    </View>
                )}

            </View>

    );
}
