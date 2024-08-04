import React, {ReactNode, useState} from 'react';
import { View, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import TopRow from '../../../components/upload/text/TopRow';
import BottomRow from '../../../components/upload/text/BottomRow';
import TextBox from '../../../components/upload/text/TextBox';
import { supabase } from '../../../lib/supabase';

export default function Page() {
    const [text, setText] = useState<string>("");
    const [viewPromptOpen, setViewPromptOpen] = useState<boolean>(false);
    const currentDate = new Date();
    const currentDateIso = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T00:00:00`;

    async function uploadText(){
        if (text === "") return;
        const { error } = await supabase
            .from('TextResponses')
            .insert([
                { text: text }
            ]);
        if (error) {
            console.log("Error uploading text: ", error);
            return;
        }
        console.log("Successfully uploaded text: ", text);
        
    }

    return (
        <DismissKeyboard>
            <SafeAreaView className="w-full h-full flex flex-col justify-center items-center bg-black">
                <TopRow
                    startTime={currentDateIso} 
                    duration = {86400}
                />
                <TextBox
                    text={text}
                    setText={setText}
                    prompt={"Take a picture of something that makes you happy"}
                    viewPromptOpen={viewPromptOpen}
                />
                <BottomRow
                    viewPromptOpen={viewPromptOpen}
                    handleViewPrompt={() => setViewPromptOpen(!viewPromptOpen)}
                    uploadText={uploadText}
                />
            </SafeAreaView>
        </DismissKeyboard>
    )
}

export const DismissKeyboard = ({ children }: { children: ReactNode }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {children}
    </TouchableWithoutFeedback>
);