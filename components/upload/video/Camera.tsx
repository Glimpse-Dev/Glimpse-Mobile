import { CameraView, CameraType, FlashMode } from 'expo-camera';
import React,  {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { ViewPromptButton } from '../ViewPromptButton';
import {VideoView, useVideoPlayer, VideoPlayer} from 'expo-video';

type cameraProps = {
    cameraRef: React.RefObject<CameraView>,
    facing: CameraType,
    flash: FlashMode,
    zoom: number,
    videoUri: string | null,
    prompt: string,
    isRecording: boolean,
    timer: number,
}

export default function Camera({ cameraRef, facing, flash, zoom, videoUri, prompt, isRecording, timer }: cameraProps) {
    const videoViewRef = useRef<VideoView>(null);
    const [viewPromptOpen, setViewPromptOpen] = useState(false);
    const player = useVideoPlayer(videoUri);
        
    function handleViewPrompt(){
        setViewPromptOpen(!viewPromptOpen);
    }

    function formatTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    return (
        <View style={styles.container}>
                <CameraView
                    ref={cameraRef}
                    mode='video'
                    facing={facing}
                    flash={flash}
                    zoom={zoom}
                    onCameraReady={() => console.log('Camera ready')}
                    style={[styles.camera, { opacity: viewPromptOpen ? 0.6 : 1 }]}>

                </CameraView>

            <View className = {`w-full h-full flex flex-col ${viewPromptOpen ? "justify-between " : "justify-end "}`}>
            {viewPromptOpen && (
                <View className = "items-center px-6 pt-16">
                    <Text className = "text-4xl text-white">{prompt}</Text>
                </View>
            )}
                <View className = "px-6 pb-8 flex flex-row justify-between">
                    <ViewPromptButton viewPromptOpen={viewPromptOpen} handleViewPrompt={handleViewPrompt}/>
                    {isRecording && 
                    (<View className = "px-1 py-2 bg-white rounded-[30px] w-[22%] justify-center items-center">
                        <Text className = " text-base font-semibold">{formatTime(timer)}</Text>
                    </View>)}
                </View>
            </View>
            {videoUri && (
                <VideoView
                    ref={videoViewRef}
                    player={player}
                    nativeControls
                    style={styles.video}
                    contentFit = 'cover'
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '66%',
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
    },
    camera: {
        width: '100%',
        height: '99.5%',
        position: 'absolute',
        zIndex: 0,
    },
    video: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
});


