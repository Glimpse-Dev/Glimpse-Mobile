import { CameraView, CameraType, useCameraPermissions, FlashMode, useMicrophonePermissions } from 'expo-camera';
import React, { useState, useRef, useEffect } from 'react';
import { Text, View, Pressable, Platform} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useMediaLibraryPermissions, launchImageLibraryAsync, MediaTypeOptions } from 'expo-image-picker';
import { decode } from 'base64-arraybuffer';
import { readAsStringAsync } from 'expo-file-system';
import TopRow from '../../../components/upload/TopRow';
import BottomRow from '../../../components/upload/video/BottomRow';
import Camera from '../../../components/upload/video/Camera';

export default function Page() {
    const cameraRef = useRef<CameraView>(null);
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [mediaLibraryPermission, requestMediaLibraryPermission] = useMediaLibraryPermissions();
    const [useMicrophonePermission, requestMicrophonePermission] = useMicrophonePermissions();
    const [isRecording, setIsRecording] = useState(false);
    const [videoUri, setVideoUri] = useState<string | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [flash, setFlash] = useState<FlashMode>('off');
    const [zoom, setZoom] = useState<number>(0);
    const [lastZoom, setLastZoom] = useState<number>(0);
    const [timer, setTimer] = useState<number>(60)
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const currentDate = new Date();
    const currentDateIso = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}T00:00:00`;

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current!);
                        setIsRecording(false);
                        return 60;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                setTimer(60);
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRecording]);


    if (!cameraPermission || !mediaLibraryPermission || !useMicrophonePermission) {
        //Change to loading state
        return <View />
    }

    async function requestPermission() {
        requestCameraPermission();
        requestMediaLibraryPermission();
        requestMicrophonePermission();
    }

    if (!cameraPermission.granted || !mediaLibraryPermission.granted || !useMicrophonePermission.granted) {
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

    async function toggleRecording() {
        if (isRecording) {
            cameraRef.current?.stopRecording();
            setIsRecording(false);
        } else {
            setIsRecording(true);
            const response = await cameraRef.current?.recordAsync({
                maxDuration: 60,
                maxFileSize: 70000000
            });
            setVideoUri(response!.uri);
        }
    }

    function retakeVideo() {
        setIsRecording(false);
        setVideoUri(null);
        setTimer(60);
    }

    async function pickVideo() {
        const result = await launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Videos,
            allowsEditing: true,
            quality: 1,
        });
        if (result.canceled) {
            return;
        }
        const video = result.assets[0];
        setVideoUri(video.uri);
        
    }
    
    async function uploadVideo() {
        if (!videoUri) return;
        const base64 = await readAsStringAsync(videoUri, { encoding: 'base64' });
        const filePath = `${new Date().getTime()}.mp4`;
        const { data, error } = await supabase.storage
            .from('Videos')
            .upload(`public/${filePath}`, decode(base64), { contentType: 'video/mp4', upsert: false });
        if (error) {
            console.error('Error uploading video:', error.message);
            return;
        }
        console.log('Video uploaded successfully:', data);
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
                    videoUri={videoUri}
                    prompt="Record a video of something that makes you happy."
                    isRecording={isRecording}
                    timer={timer}
                />
            </GestureDetector>
            <BottomRow
                isRecording={isRecording}
                toggleRecording={toggleRecording}
                toggleFacing={toggleFacing}
                videoUri={videoUri}
                uploadVideo={uploadVideo}    
                retakeVideo={retakeVideo}
                mediaLibraryPermission={mediaLibraryPermission}
                pickVideo={pickVideo}
            />
            
        </SafeAreaView>
    );
}