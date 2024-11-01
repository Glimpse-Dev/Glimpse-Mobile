import React, { useState, useRef, useEffect } from 'react';
import { Animated, Easing, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { getAssetsAsync } from 'expo-media-library';
import { MediaLibraryPermissionResponse } from 'expo-image-picker';

type BottomRowProps = {
    isRecording: boolean,
    toggleRecording: () => void,
    toggleFacing: () => void,
    videoUri: string | null,
    uploadVideo: () => void,
    retakeVideo: () => void,
    mediaLibraryPermission: MediaLibraryPermissionResponse | null,
    pickVideo: () => void,
}

export default function BottomRow({ isRecording, toggleRecording, toggleFacing, videoUri, uploadVideo, retakeVideo, mediaLibraryPermission, pickVideo }: BottomRowProps) {
    const [firstVideoUri, setFirstVideoUri] = useState<string | null>(null);

    const widthAnimation = useRef(new Animated.Value(66)).current;
    const heightAnimation = useRef(new Animated.Value(66)).current;
    const borderRadiusAnimation = useRef(new Animated.Value(100)).current;
    const borderWidthAnimation = useRef(new Animated.Value(3)).current;
    const flipAnimation = useRef(new Animated.Value(1)).current;

    const animateRecord = () => {
        Animated.parallel([
            Animated.timing(widthAnimation, {
                toValue: 20,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(heightAnimation, {
                toValue: 20,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(borderRadiusAnimation, {
                toValue: 5,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(borderWidthAnimation, {
                toValue: 0,
                duration: 250,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const animateStop = () => {
        Animated.parallel([
            Animated.timing(widthAnimation, {
                toValue: 66,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(heightAnimation, {
                toValue: 66,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(borderRadiusAnimation, {
                toValue: 100,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
            Animated.timing(borderWidthAnimation, {
                toValue: 3,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: false,
            }),
        ]).start();
    };

    async function fetchFirstVideo() {
        const assets = await getAssetsAsync({ 
            first: 1,
            mediaType: 'video',
            sortBy: ['creationTime'],
        });
        if (assets.assets.length > 0){
            setFirstVideoUri(assets.assets[0].uri);
        } else {
            setFirstVideoUri(null);
        }
    }

    useEffect(() => {
        if (mediaLibraryPermission?.granted) {
            fetchFirstVideo();
        } 
    }, [mediaLibraryPermission]);

    useEffect(() => {
        if (isRecording && !videoUri) {
            animateRecord();
            return
        } else {
            animateStop();
        }
    }, [isRecording, videoUri]);

    useEffect(() => {
        widthAnimation.setValue(66);
        heightAnimation.setValue(66);
        borderRadiusAnimation.setValue(100);
        borderWidthAnimation.setValue(3);
    }, [])

    const animateButtonStyle = {
        backgroundColor: 'red',
        borderWidth: borderWidthAnimation,
        borderRadius: borderRadiusAnimation,
        width: widthAnimation,
        height: heightAnimation,
    };

    function animateFlip() {
        Animated.sequence([
            Animated.timing(flipAnimation, {
                toValue: 0.9,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
            Animated.timing(flipAnimation, {
                toValue: 1,
                duration: 100,
                easing: Easing.ease,
                useNativeDriver: true,
            }),
        ]).start();
    }

    const flipStyle = {
        transform: [{ scale: flipAnimation }],
    };

    function onToggleFacing() {
        animateFlip();
        toggleFacing();
    }


    return (
        videoUri ? 
        (<View className = "flex flex-row w-full h-[20%] items-center justify-between px-9">
            <Pressable onPress={retakeVideo} className = " py-2 px-4 flex items-center justify-center rounded-[30px] bg-zinc-500">
                <Text className = "text-white font-semibold">Retake</Text>
            </Pressable>
            <Pressable onPress={uploadVideo} className = "py-2 px-4 flex items-center justify-center rounded-[30px] bg-zinc-500">
                <Text className = "text-white font-semibold">Upload Video</Text>
            </Pressable>
        </View>)
        :
        (<View className="flex flex-row w-full h-[20%] items-center justify-between px-10">
            {mediaLibraryPermission?.granted && firstVideoUri ?
                <Pressable onPress={pickVideo}>
                    {firstVideoUri && <Image source={{ uri: firstVideoUri }} className="w-11 h-11 rounded-xl" />}
                </Pressable>
                : <Pressable onPress={pickVideo} className="w-11 h-11 rounded-xl bg-[#D9D9D9]" />}
            <Pressable onPress={toggleRecording}>
                <View className="w-[72px] h-[72px] bg-black border-[3px] border-white rounded-full flex justify-center items-center">
                    <Animated.View style={animateButtonStyle} />
                </View>
            </Pressable>
            <Pressable onPress={onToggleFacing} className="w-11 h-11 flex items-center justify-center rounded-full bg-[#1C1C1C]">
                <Animated.View style={[{ width: 20, height: 20 }, flipStyle]}>
                    <Image source={require('../../../assets/images/flipCameraIcon.svg')} className="w-full h-full" />
                </Animated.View>
            </Pressable>
        </View>)
    );
}
