import React, { useState, useEffect, useRef, useCallback } from "react";
import { Text, View, AppState } from "react-native";

type PromptCardCountdownProps = {
  startTime: string; //ISO Date-Time format eg. 2024-04-22T15:33:27
  duration: number; //Duration in seconds
};

export default function PromptCardCountdown({
  startTime,
  duration,
}: PromptCardCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const parseStartTime = useCallback((time: string): number => {
    return new Date(time).getTime();
  }, []);

  const calculateRemainingTime = useCallback(
    (parsedStartTime: number): number => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - parsedStartTime) / 1000;
      return Math.max(duration - elapsedTime, 0);
    },
    [duration]
  );

  const updateRemainingTime = useCallback(() => {
    const parsedStartTime = parseStartTime(startTime);
    const timeLeft = calculateRemainingTime(parsedStartTime);
    setTimeLeft(timeLeft);
  }, [parseStartTime, calculateRemainingTime, startTime]);

  useEffect(() => {
    updateRemainingTime();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      updateRemainingTime();
    }, 1000);

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === "active") {
        updateRemainingTime();
      }
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      subscription.remove();
    };
  }, [updateRemainingTime]);

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <View
      className="flex-row items-center justify-center px-4 py-2 rounded-[30px] gap-x-2 w-2/3 ml-[0.25px]"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)", // 20% opacity
      }}
    >
      <Text className="text-[14px] text-white font-medium">Expiring in</Text>
      <Text className="text-[16px] text-white font-medium">
        {formatTime(timeLeft)}
      </Text>
    </View>
  );
}
