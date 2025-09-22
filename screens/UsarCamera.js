import React, { useState, useEffect } from "react";
import { View, Button, Image, StyleSheet, Alert} from "react-native";
import { Camera} from "expo-camera";


export default function UsarCamera() {
   const [hasPermission, setHasPermission] = useState(null);
  const [foto, setFoto] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState("back");

 useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const tirarFoto = async () => {
    if (cameraRef) {
      const data = await cameraRef.takePictureAsync();
      setFoto(data.uri);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    Alert.alert("Acesso negado");
    return <View />;
  }


  return (
     <View style={styles.container}>
      <Camera type={type} style={styles.camera}  ref={ref => setCameraRef(ref)}/>
      <Button title="Tirar Foto" onPress={tirarFoto} />
      {foto && <Image source={{ uri: foto }} style={styles.imagem} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { 
    flex: 1, 
    justifyContent: "center",
     alignItems: "center" },
  imagem: 
  { 
    width: 250, 
    height: 250, 
    marginTop: 20,
    borderRadius: 10 },
});
