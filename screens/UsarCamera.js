import React, { useState, useRef } from "react";
import {Text, View, Button, Image, StyleSheet} from "react-native";
import {CameraView, useCameraPermissions } from "expo-camera";


export default function UsarCamera() {

  const [photoUri, setPhotoUri] =useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);


  const takePhoto = async () => {
    if(cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  }


  if(!permission){
    return ( 
    <View>
      <Text> Permissão da câmera...</Text>
      </View>
    )
  }

   if(!permission.granted){
    return (
    <View>
      <Text> Necessário permissão da câmera.</Text> 
      <Button title="Conceder permissao" onPress={requestPermission}/> 
      </View>
    )
  }



  return (
     <View style={styles.container}>
      {
      !photoUri ? 
      (
         <>
          <CameraView style={styles.camera} facing="front" ref={cameraRef} />
          <View style={styles.buttonCamera}> 
            <Button title="Tirar Foto" onPress={takePhoto} />
           </View>
        </>
        
      ) : (
        <>
          <Image source={{ uri: photoUri }} style={styles.preview} />
          <Button title="Tirar outra" onPress={() => setPhotoUri(null)} />
        </>
        
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    
  },
  camera: {
    flex: 1,
  },
  buttonCamera: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 50,
    padding: 10,
  },
    previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  preview: {
    width: 300,
    height: 400,
    borderRadius: 12,
    marginBottom: 20,
  },

});
