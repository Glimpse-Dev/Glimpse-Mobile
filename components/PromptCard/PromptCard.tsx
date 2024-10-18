import React from "react";
import { Text, View } from "react-native";
import PromptCardCountdown from "./PromptCardCountdown";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";

type PromptCardProps = {
  prompt: string;
  tag: string;
  startTime: string; //ISO Date-Time format eg. 2024-04-22T15:33:27
  duration: number; //Duration in seconds
  numAnswers: number;
};

// Map of tag to image source
const tagImageMap: { [key: string]: any } = {
  Image: require("../../assets/images/image.svg"),
  Text: require("../../assets/images/text.svg"),
  // Video: require('../../assets/images/video.svg'),
};

// Component for prompt card, takes in prompt, tag, start time, duration and number of answers
export default function PromptCard({
  prompt,
  tag,
  startTime,
  duration,
  numAnswers,
}: PromptCardProps) {
  const imageSource = tagImageMap[tag];
  return (
    <View className="relative w-[327px] h-[248px] rounded-[20px] py-6">
      {/* Linear gradient background */}
      <LinearGradient
        colors={["#D372E5", "#5731D6"]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{
          borderRadius: 20,
          width: 327,
          height: 248,
          position: "absolute",
        }}
      />
      <View className="flex flex-col gap-y-4 p-6">
        <PromptCardCountdown startTime={startTime} duration={duration} />
        <Text className="text-white font-semibold text-2xl h-[100px]">
          {prompt}
        </Text>
        <AnswersLabel numAnswers={numAnswers} />
      </View>
      {/* Tag Icon in background */}
      <Image
        source={imageSource}
        style={{ width: 128, height: 128, position: "absolute" }}
        className="-right-5 top-[70px]"
      />
    </View>
  );
}

type AnswersLabelProps = {
  numAnswers: number;
};

function AnswersLabel({ numAnswers }: AnswersLabelProps) {
  return (
    <View className="relative flex-row items-center mt-4 gap-x-1">
      <Image
        source={require("../../assets/images/message-square.svg")}
        style={{ width: 16, height: 16 }}
      />
      <Text className=" text-white text-[14px] font-medium">
        {numAnswers} answers
      </Text>
    </View>
  );
}
