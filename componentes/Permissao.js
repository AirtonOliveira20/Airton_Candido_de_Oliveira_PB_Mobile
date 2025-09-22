import { PermissionsAndroid, Alert } from "react-native";

async function pedirPermissaoCamera() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permissão para usar a câmera",
        message: "Este app precisa acessar sua câmera para tirar fotos.",
        buttonNeutral: "Perguntar depois",
        buttonNegative: "Cancelar",
        buttonPositive: "OK"
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    Alert.alert("Erro", "Não foi possível pedir a permissão da câmera.");
    return false;
  }
}

export default pedirPermissaoCamera;
