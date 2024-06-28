import React from 'react';
import { Text, View, Button } from 'react-native';


type PromptCardProps = {
  prompt: String;
  date: String;
  tag: String;
  time: String;
  answered: Boolean;
}

type PromptCardHeaderProps = {
  date: String;
  tag: String;
  time: String;
}

type PromptCardFooterProps = {
  answered: Boolean;
}

export default function PromptCard(props: PromptCardProps) {
  return (
    <View className = "flex flex-col rounded-[20px] border border-[#D9D9D9] w-[327px] h-[240px] py-[22px] px-[20px] gap-y-6">
      <PromptCardHeader date={props.date} tag={props.tag} time={props.time}/>
      <Text className = "font-medium text-2xl">{props.prompt}</Text>
      <View className = "w-[288px] border border-gray-100"/>
      <PromptCardFooter answered={props.answered}/>
    </View>
  );
}

function PromptCardHeader(props: PromptCardHeaderProps) {
  return (
    <View className = "flex flex-row justify-between">
      <Text>{props.date}</Text>
      <Text>{props.tag}</Text>
      <Text>{props.time}</Text>
    </View>
  );
}

function PromptCardFooter(props: PromptCardFooterProps) {
  return (
      <Text>{props.answered ? "Answered" : "Not Answered"}</Text>

  );
}