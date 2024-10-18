import React from "react";
import { Text, View, Button } from "react-native";
import PromptCardButton from "./PromptCardButton";
import PromptCardTag from "./PromptCardTag";
import PromptCardCountdown from "./PromptCardCountdown";
import { LinearGradient } from "expo-linear-gradient";

type PromptCardProps = {
  prompt: string;
  tag: string;
  startTime: string; //ISO Date-Time format eg. 2024-04-22T15:33:27
  duration: number; //Duration in seconds
  answered: Boolean;
  numAnswers: number;
};

export default function PromptCard({
  prompt,
  tag,
  startTime,
  duration,
  answered,
  numAnswers,
}: PromptCardProps) {
  return (
    <View className="relative w-[327px] h-[229px] rounded-[20px]">
      <LinearGradient
        colors={["#D372E5", "#5731D6"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 20,
          width: 327,
          height: 229,
          position: "absolute",
        }}
      />
      <Text className="text-white font-bold text-2xl">{prompt}</Text>
    </View>
  );
}
