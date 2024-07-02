import React, {useState, useEffect, useRef} from 'react';
import { Text, View, AppState} from 'react-native';

type PromptCardCountdownProps = {
    startTime: string; //ISO Date-Time format eg. 2024-04-22T15:33:27
    duration: number; //Duration in seconds
}

export default function PromptCardCountdown({startTime, duration}: PromptCardCountdownProps) {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const parseStartTime = (time: string): number => {
        return new Date(time).getTime();
    };

    const calculateRemainingTime = (startTime: number): number => {
        const currentTime = Date.now();
        const elapsedTime = (currentTime - startTime) / 1000;
        return Math.max(duration - elapsedTime, 0);
    }

    const updateRemainingTime = () => {
        const parsedStartTime = parseStartTime(startTime)
        const timeLeft = calculateRemainingTime(parsedStartTime);
        setTimeLeft(timeLeft);
        setIsRunning(timeLeft > 0);
    }

    // Sets initial remaining time and run state on mount
    useEffect(() => {
        updateRemainingTime();
    }, [startTime, duration]);

    // Updates remaining time and run state when app state changes eg. app goes to background or is closed
    useEffect(() => {
        const handleAppStateChange = (nextAppState: string) => {
            if (nextAppState === 'active') {
                updateRemainingTime();
            }
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);

        return () => {
            subscription.remove();
        }
    
    }, [startTime, duration]);

    //Manages interval to update time left every second
    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                const parsedStartTime = parseStartTime(startTime);
                const timeLeft = calculateRemainingTime(parsedStartTime);
                setTimeLeft(timeLeft);
                if (timeLeft <= 0) {
                    clearInterval(intervalRef.current as NodeJS.Timeout);
                    setIsRunning(false);
                }
            }, 1000);
        } else {
            clearInterval(intervalRef.current as NodeJS.Timeout);
        }
        return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }, [isRunning]);

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };


    return (
        <View className = "flex-col justify-center items-center">
            <Text className = "text-xs dark:text-white">Expiring in</Text>
            <Text className = "text-lg font-medium dark:text-white -mt-1 w-full">{formatTime(timeLeft)}</Text>
        </View>
    );
}