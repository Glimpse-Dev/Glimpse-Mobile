import React from 'react';
import { Text, View, Button } from 'react-native';
import PromptCardButton from './PromptCardButton';
import PromptCardTag from './PromptCardTag';
import PromptCardCountdown from './PromptCardCountdown';

type PromptCardProps = {
  prompt: string;
  date: string;
  tag: string;
  time: string;
  answered: Boolean;
}

type PromptCardHeaderProps = {
  date: string;
  tag: string;
  time: string;
}

type PromptCardFooterProps = {
  answered: Boolean;
}

export default function PromptCard(props: PromptCardProps) {
  return (
    <View className = "flex-col rounded-[20px] border border-[#D9D9D9] w-[327px] h-60 py-[22px] px-5 gap-y-[22px]">
      <PromptCardHeader date={props.date} tag={props.tag} time={props.time}/>
      <Text className = "font-semibold text-[22px] dark:text-white text-wrap">{props.prompt}</Text>
      <View className = "w-[288px] border border-gray-100 dark:border-x-gray-200"/>
      <View><PromptCardFooter answered={props.answered}/></View>
    </View>
  );
}

function PromptCardHeader(props: PromptCardHeaderProps) {
  return (
    <View className = "flex flex-row justify-between items-center">
      <View className = "flex-col gap-y-0">
        <Text className = "text-lg dark:text-white font-semibold">{props.date}</Text>
        <PromptCardTag tag={props.tag}/>
      </View>
      
      <View>
        <PromptCardCountdown time={props.time}/>
      </View>
    </View>
  );
}

function PromptCardFooter(props: PromptCardFooterProps) {
  return (
    <View className = "flex flex-row justify-center items-center">
    {props.answered ? (
      <Text className=" text-base font-semibold dark:text-white">
        You have answered the prompt.
      </Text>
    ) : (
      <PromptCardButton onPress={goToAnswerPrompt}/>
    )}
  </View>

  );
}

function goToAnswerPrompt() {
  console.log("Answer Prompt");
}