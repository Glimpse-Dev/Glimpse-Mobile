import { CameraView, CameraType, FlashMode } from 'expo-camera';
import React,  {useState} from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { Image } from 'expo-image';
import { ViewPromptButton } from '../ViewPromptButton';

type cameraProps = {
    cameraRef: React.RefObject<CameraView>,
    facing: CameraType,
    flash: FlashMode,
    zoom: number,
    updateZoom: (zoom: number) => void,
    photoUri: string | null,
    prompt: string,
}

export default function Camera({ cameraRef, facing, flash, zoom, updateZoom, photoUri, prompt }: cameraProps) {

    const [viewPromptOpen, setViewPromptOpen] = useState(false);

    function handleViewPrompt(){
        setViewPromptOpen(!viewPromptOpen);
    }

    return (
        <View style={styles.container}>
                <CameraView
                    ref={cameraRef}
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
                <View className = "pl-6 pb-8">
                    <ViewPromptButton viewPromptOpen={viewPromptOpen} handleViewPrompt={handleViewPrompt}/>
                </View>
            </View>
 
            {photoUri && (
                <Image
                    source={{ uri: photoUri }}
                    style={styles.image}
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
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    },
});


