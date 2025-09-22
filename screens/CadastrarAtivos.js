import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { adicionarAtivo, listarAtivos } from "../infra/equipamentos";

export default function InserirAtivos({ onAtualizar }) {
  const [id, setId] = useState(0);
  const [item, setItem] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [serial, setSerial] = useState("");
  const [notaFiscal, setNotaFiscal] = useState("");
  const [valor, setValor] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [dataEmissao, setDataEmissao] = useState("");
  const [setor, setSetor] = useState("");
  const [usuario, setUsuario] = useState("");
  

  useEffect(() => {
    async function buscarUltimoId() {
      try {
        const ativos = await listarAtivos();
        if (ativos.length > 0) {
          const ultimoId = Math.max(...ativos.map((a) => Number(a.id)));
          setId(ultimoId);
        }
      } catch (error) {
        console.error("Erro ao buscar últimos ativos:", error);
      }
    }
    buscarUltimoId();
  }, []);

  const handleSubmit = async () => {
    if (
      !item ||
      !fabricante ||
      !modelo ||
      !serial ||
      !notaFiscal ||
      !valor ||
      !fornecedor ||
      !dataEmissao ||
      !setor ||
      !usuario
    ) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const novoId = id + 1;

    try {
      await adicionarAtivo({
        id: novoId,
        item,
        fabricante,
        modelo,
        serial,
        notaFiscal,
        valor: Number(valor),
        fornecedor,
        dataEmissao,
        setor,
        usuario,
      });

      Alert.alert("Sucesso", "Equipamento adicionado com sucesso!");
      setId(novoId);
      setItem("");
      setFabricante("");
      setModelo("");
      setSerial("");
      setNotaFiscal("");
      setValor("");
      setFornecedor("");
      setDataEmissao("");
      setSetor("");
      setUsuario("");

      if (onAtualizar) onAtualizar();
    } catch (error) {
      console.error("Erro ao adicionar ativo:", error);
      Alert.alert("Erro", "Não foi possível adicionar o equipamento.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ID (automático): {id + 1}</Text>

      <TextInput style={styles.input} placeholder="Item" value={item} onChangeText={setItem} />
      <TextInput style={styles.input} placeholder="Fabricante" value={fabricante} onChangeText={setFabricante} />
      <TextInput style={styles.input} placeholder="Modelo" value={modelo} onChangeText={setModelo} />
      <TextInput style={styles.input} placeholder="Serial" value={serial} onChangeText={setSerial} />
      <TextInput style={styles.input} placeholder="Nota Fiscal" value={notaFiscal} onChangeText={setNotaFiscal} />
      <TextInput style={styles.input} placeholder="Valor" value={valor} onChangeText={setValor} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="Fornecedor" value={fornecedor} onChangeText={setFornecedor} />
      <TextInput style={styles.input} placeholder="Data de emissão" value={dataEmissao} onChangeText={setDataEmissao} />
      <TextInput style={styles.input} placeholder="Setor" value={setor} onChangeText={setSetor} />
      <TextInput style={styles.input} placeholder="Usuário" value={usuario} onChangeText={setUsuario} />


      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
