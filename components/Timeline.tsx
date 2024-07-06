// *Imports
import React from "react";
import { Text, View, Button } from "react-native";

// *Constants
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const today = new Date().getDay();
const todayIndex = today - 1;

// *Start of the Timeline Function
export default function Timeline() {
  return (
    <View className="flex-row space-x-3 items-center">
      {days.map((day, index) => (
        <View key={index} className="flex-col items-center">
          <Text className="mb-2">{day}</Text>
          <View
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              todayIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          >
            <Text
              className={`text-center ${
                todayIndex === index ? "text-white" : "text-black"
              }`}
            >
              {index + 1}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
