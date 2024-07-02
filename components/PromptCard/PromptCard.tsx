import React from 'react';
import { Text, View, Button } from 'react-native';
import PromptCardButton from './PromptCardButton';
import PromptCardTag from './PromptCardTag';
import PromptCardCountdown from './PromptCardCountdown';

type PromptCardProps = {
  prompt: string;
  date: string;
  tag: string;
  startTime: string; //ISO Date-Time format eg. 2024-04-22T15:33:27
  duration: number; //Duration in seconds
  answered: Boolean;
}

type PromptCardHeaderProps = {
  date: string;
  tag: string;
  startTime: string;
  duration: number;
}

type PromptCardFooterProps = {
  answered: Boolean;
}

export default function PromptCard(props: PromptCardProps) {
  return (
    <View className = "flex-col rounded-[20px] border border-[#D9D9D9] w-[327px] h-auto py-[22px] px-5 gap-y-[22px]">
      <PromptCardHeader date={props.date} tag={props.tag} startTime={props.startTime} duration={props.duration}/>
      <Text className = "font-medium text-[22px] dark:text-white text-wrap">{props.prompt}</Text>
      <View className = "w-[288px] border border-gray-100 dark:border-x-gray-200"/>
      <View><PromptCardFooter answered={props.answered}/></View>
    </View>
  );
}

function PromptCardHeader(props: PromptCardHeaderProps) {
  return (
    <View className = "flex flex-row justify-between items-center w-full">
      <View className = "flex-col gap-y-0">
        <Text className = "text-lg dark:text-white font-medium">{props.date}</Text>
        <PromptCardTag tag={props.tag}/>
      </View>
      
      <View className = " w-20">
        <PromptCardCountdown startTime={props.startTime} duration={props.duration}/>
      </View>
    </View>
  );
}

function PromptCardFooter(props: PromptCardFooterProps) {
  return (
    <View className = "flex flex-row justify-center items-center">
    {props.answered ? (
      <Text className=" text-base font-semibold dark:text-white">
        {"You have answered the prompt :)"}
      </Text>
    ) : (
      <PromptCardButton onPress={goToAnswerPrompt}/>
    )}
  </View>

  );
}

// Replace this with the function that navigates to the answer prompt
function goToAnswerPrompt() {
  console.log("Answer Prompt");
}