import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";
import { listarAtivos, editarAtivo } from "../infra/equipamentos";

export default function AtualizarAtivos({ route, navigation }) {
  
  const { id } = route.params;
  console.log("ID recebido:", id);

  const [item, setItem] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [valor, setValor] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [setor, setSetor] = useState("");
  const [usuario, setUsuario] = useState("");

  useEffect(() => {
    async function carregarAtivo() {
      const ativos = await listarAtivos();
      const ativo = ativos.find((a) => a.id === id);
      console.log("Ativo carregado:", ativo);
      if (ativo) {
        setItem(ativo.item || "");
        setFabricante(ativo.fabricante || "");
        setModelo(ativo.modelo || "");
        setSerial(ativo.serial || "");
        setNotaFiscal(ativo.notaFiscal || "");
        setValor(ativo.valor || "");
        setDataEmissao(ativo.dataEmissao || "");
        setFornecedor(ativo.fornecedor || "");
        setSetor(ativo.setor || "");
        setUsuario(ativo.usuario || "");
      }
    }
    carregarAtivo();
  }, [id]);

  async function handleSalvar() {
    try {
      const novosDados = {
        item,
        fabricante,
        modelo,
        serial,
        notaFiscal,
        valor,
        dataEmissao,
        fornecedor,
        setor,
        usuario,
      };
      await editarAtivo(id, novosDados);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao salvar ativo:", error);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Ativo</Text>

      <Text>ID:</Text>
      <TextInput style={styles.input} value={id} editable={false} />

      <Text>Item:</Text>
      <TextInput
        style={styles.input}
        value={item}
        onChangeText={setItem}
      />

      <Text>Fabricante:</Text>
      <TextInput
        style={styles.input}
        value={fabricante}
        onChangeText={setFabricante}
      />

      <Text>Modelo:</Text>
      <TextInput
        style={styles.input}
        value={modelo}
        onChangeText={setModelo}
      />

      <Text>Serial:</Text>
      <TextInput
        style={styles.input}
        value={serial}
        onChangeText={setSerial}
      />

      <Text>Nota Fiscal:</Text>
      <TextInput
        style={styles.input}
        value={notaFiscal}
        onChangeText={setNotaFiscal}
      />

      <Text>Valor:</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
      />

      <Text>Data de Emissão:</Text>
      <TextInput
        style={styles.input}
        value={dataEmissao}
        onChangeText={setDataEmissao}
      />

      <Text>Fornecedor:</Text>
      <TextInput
        style={styles.input}
        value={fornecedor}
        onChangeText={setFornecedor}
      />

      <View style={styles.botoes}>
        <Button title="Voltar" onPress={() => navigation.navigate("Home")} />
        <View style={{ width: 10 }} />
        <Button title="Salvar" onPress={handleSalvar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
  },
  botoes: {
    flexDirection: "row",
    marginTop: 20,
  },
});
