import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { criarUsuario } from "../infra/usuarios"; 
import { regexEmail } from "../infra/Regex";

export default function CadastrarUsuarios({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [tipo, setTipo] = useState("");
  const [erros, setErros] = useState({});

  const validarCampos = () => {
    const novosErros = {};

    if (!email) {
      novosErros.email = "O campo email é obrigatório";
    } else if (email.length > 50) {
      novosErros.email = "O campo email só pode ter até 50 caracteres";
    } else if (!regexEmail.test(email)) {
      novosErros.email = "O campo email é inválido";
    }

    if (!senha) {
      novosErros.senha = "O campo senha é obrigatório";
    } else if (senha.length < 6) {
      novosErros.senha = "A senha deve ter pelo menos 6 caracteres";
    }

    if (!confirmaSenha) {
      novosErros.confirmaSenha = "Confirme a senha";
    } else if (senha !== confirmaSenha) {
      novosErros.confirmaSenha = "As senhas não coincidem!";
    }

    if (!tipo) {
      novosErros.tipo = "Selecione um tipo";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const submeterDados = async () => {
    if (!validarCampos()) return;

    const resultado = await criarUsuario({ email, senha, tipo });

    if (resultado.erro) {
      Alert.alert("Erro", resultado.erro);
    } else {
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      setEmail("");
      setSenha("");
      setConfirmaSenha("");
      setTipo("");
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {erros.email && <Text style={styles.erro}>{erros.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirme a senha"
        secureTextEntry
        value={confirmaSenha}
        onChangeText={setConfirmaSenha}
      />
      {erros.confirmaSenha && (
        <Text style={styles.erro}>{erros.confirmaSenha}</Text>
      )}

      <Text style={styles.label}>Tipo de usuário</Text>
      <Picker selectedValue={tipo} onValueChange={(value) => setTipo(value)}>
        <Picker.Item label="Selecione..." value="" />
        <Picker.Item label="Operador" value="operador" />
        <Picker.Item label="Administrador" value="admin" />
      </Picker>
      {erros.tipo && <Text style={styles.erro}>{erros.tipo}</Text>}

      <Button title="Cadastrar" onPress={submeterDados} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  erro: {
    color: "red",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
  },
});
