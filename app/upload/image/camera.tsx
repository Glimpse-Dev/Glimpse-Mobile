import { CameraView, CameraType, useCameraPermissions, FlashMode } from 'expo-camera';
import React, { useState, useRef } from 'react';
import { Text, View, Pressable, Platform} from 'react-native';
import { supabase } from '../../../lib/supabase';
import Camera  from '../../../components/upload/image/Camera';
import TopRow from '../../../components/upload/image/TopRow';
import BottomRow from '../../../components/upload/image/BottomRow';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { decode } from 'base64-arraybuffer';
import { useMediaLibraryPermissions, launchImageLibraryAsync } from 'expo-image-picker';

export default function Page() {
    const cameraRef = useRef<CameraView>(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions();
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const [zoom, setZoom] = useState<number>(0);
    const [lastZoom, setLastZoom] = useState<number>(0);
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [photoBase64, setPhotoBase64] = useState<string | null | undefined>(null);
    const currentDate = new Date();
    const currentDateIso = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T00:00:00`;

    if (!cameraPermission) {
        //Change to loading state
        return <View />
    }

    async function requestPermission() {
        requestCameraPermission();
        requestMediaLibraryPermission();
    }

    if (!cameraPermission.granted) {
        return (
            <View className =  "w-full h-full flex justify-center items-center gap-y-10">
                <Text>We need your permission to use the Camera!</Text>
                <Pressable onPress={requestPermission} className = "bg-black px-3 py-2 rounded-2xl">
                    <Text className = " text-white font-medium">Request permission</Text>
                </Pressable>
            </View>
        );
    }

    function toggleFacing() {
        setFacing(facing === 'back' ? 'front' : 'back');
    }

    function toggleFlash() {
        setFlash(flash === 'off' ? 'on' : 'off');
    }

    async function takePicture() {
        const photo = await cameraRef.current?.takePictureAsync({ base64: true });
        setPhotoUri(photo ? photo.uri : null);
        setPhotoBase64(photo ? photo.base64! : null);
    }

    async function pickImage() {
        const result = await launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            base64: true,
        })
        if (result.canceled) {
            return;
        }
        const image = result.assets[0];
        setPhotoUri(image.uri);
        setPhotoBase64(image.base64);
    }

    function retakePicture() {
        setPhotoUri(null);
    }

    async function uploadPhoto() {
        if (!photoBase64) return;
        const fileName = `${new Date().getTime()}.jpg`; // Ensure unique file name later on once authentication is implemented since multiple users could upload at the same time
        const { data, error } = await supabase.storage
            .from('Images')
            .upload(`public/${fileName}`, decode(photoBase64), { contentType: 'image/jpg', upsert: false });
    
        if (error) {
            console.error('Error uploading image:', error.message);
            return;
        }
        console.log('Image uploaded successfully:', data);
        router.back();
    }

    function updateZoom(zoom: number) {
        setZoom(Math.max(0, Math.min(zoom, 0.07)));
    }

    const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
        const velocity = e.velocity / 20;
        const outFactor = lastZoom * (Platform.OS === 'ios' ? 40 : 15);

        let newZoom =
            velocity > 0
            ? zoom + e.scale * velocity * (Platform.OS === 'ios' ? 0.01 : 25)
            : zoom - (e.scale * (outFactor || 1)) * Math.abs(velocity) * (Platform.OS === 'ios' ? 0.02 : 50);


      updateZoom(newZoom);
    })
    .onEnd(() => {
        setLastZoom(zoom);
    });

    return (
        <SafeAreaView className="w-full h-full flex flex-col justify-center items-center bg-black">
            <TopRow 
                startTime={currentDateIso} 
                duration = {86400} 
                flash = {flash} 
                toggleFlash={toggleFlash}
            />
            <GestureDetector gesture={pinchGesture}>
            <Camera 
                cameraRef={cameraRef} 
                facing={facing} 
                flash={flash} 
                zoom={zoom} 
                updateZoom = {updateZoom} 
                photoUri={photoUri} 
                prompt="Take a picture of something that makes you happy."
            />
            </GestureDetector>
            <BottomRow 
                takePicture={takePicture} 
                toggleFacing={toggleFacing} 
                photoUri={photoUri} 
                uploadPhoto={uploadPhoto} 
                retakePicture={retakePicture}
                mediaLibraryPermission={mediaLibraryPermission}
                pickImage={pickImage}
            />
        </SafeAreaView>
    );
}