import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { loginUsuario } from "../infra/usuarios";
import { useAuth } from "../context/AuthContext";

export default function TelaLogin() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagemLogin, setMensagemLogin] = useState("");

  const { login } = useAuth();

  async function handleLoginUsuario() {
    let usuario = await loginUsuario(email, senha);
    if (usuario?.id) {
      login(usuario.tipo); 
    } else {
      setMensagemLogin("Erro no login");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}  accessibilityRole="header" accessibilityLabel="Tela de login. Informe email e senha para entrar.">Entrar com usuário</Text>

      <Text accessibilityRole="text" >Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        autoCapitalize="none"
        accessible={true}
        accessibilityLabel="Campo de email"
        accessibilityHint="Digite seu endereço de email"
      />

      <Text  accessibilityRole="text">Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
         accessible={true}
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite sua senha de acesso"
        
      />

      <TouchableOpacity style={styles.button} onPress={handleLoginUsuario}  
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Botão de login"
        accessibilityHint="Toca para entrar no sistema">
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {mensagemLogin ? <Text style={styles.error}>{mensagemLogin}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 10, borderRadius: 5 },
  button: { backgroundColor: "#2563EB", padding: 12, borderRadius: 5 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  title: { fontSize: 20, marginBottom: 20, textAlign: "center" },
  error: { color: "red", marginTop: 10, textAlign: "center" },
});
