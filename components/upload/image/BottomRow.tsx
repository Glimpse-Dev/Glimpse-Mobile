import React, { useState, useRef, useEffect} from 'react';
import { Animated, Easing, View, Text, Pressable, LayoutAnimation, UIManager, Platform } from 'react-native';
import { Image } from 'expo-image';
import { getAssetsAsync } from 'expo-media-library';
import { MediaLibraryPermissionResponse} from 'expo-image-picker';

type BottomRowProps = {
    takePicture: () => void,
    toggleFacing: () => void,
    photoUri: string | null,
    uploadPhoto: () => void,
    retakePicture: () => void,
    mediaLibraryPermission: MediaLibraryPermissionResponse | null,
    pickImage : () => void,
}

export default function BottomRow({takePicture, toggleFacing, photoUri, uploadPhoto, retakePicture, mediaLibraryPermission, pickImage}: BottomRowProps) {
    const [borderWidth, setBorderWidth] = useState(3);
    const flipAnimation = useRef(new Animated.Value(1)).current;
    // const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions();
    const [firstPhotoUri, setFirstPhotoUri] = useState<string | null>(null);

    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    useEffect(() => {
        if (mediaLibraryPermission?.granted) {
            fetchFirstPhoto();
        } 
    }, [mediaLibraryPermission]);

    async function fetchFirstPhoto() {
        const assets = await getAssetsAsync({ 
            first: 1,
            sortBy: ['creationTime'],
        });
        if (assets.assets.length > 0){
            setFirstPhotoUri(assets.assets[0].uri);
        } else {
            setFirstPhotoUri(null);
        }
        
    }

    function animateButton() {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setBorderWidth(4);
        setTimeout(() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setBorderWidth(3); 
        }, 100);
    }

    const borderStyle = {
        borderWidth: borderWidth,
    };

    async function onTakePicture() {
        animateButton();
        takePicture();
    }

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

    return(
        photoUri ? 
        (<View className = "flex flex-row w-full h-[20%] items-center justify-between px-9">
            <Pressable onPress={retakePicture} className = " py-2 px-4 flex items-center justify-center rounded-[30px] bg-zinc-500">
                <Text className = "text-white font-semibold">Retake</Text>
            </Pressable>
            <Pressable onPress={uploadPhoto} className = "py-2 px-4 flex items-center justify-center rounded-[30px] bg-zinc-500">
                <Text className = "text-white font-semibold">Upload Image</Text>
            </Pressable>
        </View>) 
        : 
        (<View className="flex flex-row w-full h-[20%] items-center justify-between px-10">
                {mediaLibraryPermission?.granted && firstPhotoUri? 
                <Pressable onPress={pickImage}>
                    {firstPhotoUri && <Image source={{ uri: firstPhotoUri }} className="w-11 h-11 rounded-xl" /> }
                </Pressable>
                : <Pressable onPress={pickImage} className=" w-11 h-11 rounded-xl bg-[#D9D9D9]" />}
                <Pressable onPress={onTakePicture}>
                    <View className=" w-[72px] h-[72px] bg-white rounded-full flex justify-center items-center">
                        <View style={[{ width: 66, height: 66, backgroundColor: 'white', borderRadius: 100 }, borderStyle]} />
                    </View>
                </Pressable>
                <Pressable onPress={onToggleFacing} className = "w-11 h-11 flex items-center justify-center rounded-full bg-[#1C1C1C]">
                    <Animated.View style={[{width: 20, height: 20},flipStyle]}>
                        <Image source={require('../../../assets/images/flipCameraIcon.svg')} className = "w-full h-full"/>
                    </Animated.View>
                </Pressable>
        </View>)
    )
}