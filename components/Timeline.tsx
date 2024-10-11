// *Imports
import React from "react";
import { Text, View } from "react-native";

// *Constants
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const today = new Date();
const todayIndex = today.getDay();

// *Start of the Timeline Function
export default function Timeline() {
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - todayIndex);

  return (
    <View className="flex-row space-x-3 items-center">
      {days.map((day, index) => {
        const dayDate = new Date(firstDayOfWeek);
        dayDate.setDate(firstDayOfWeek.getDate() + index);
        const dateNumber = dayDate.getDate();

        return (
          <View key={index} className="flex-col items-center">
            <Text className="mb-2 font-semibold">{day}</Text>
            <View
              className={`w-10 h-10 rounded-full shadow-md shadow-gray-200 flex items-center justify-center ${
                todayIndex === index ? "bg-white border" : "bg-white"
              }`}
            >
              <Text
                className={`text-center ${
                  todayIndex === index ? "text-black" : "text-black"
                }`}
              >
                {dateNumber}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}
