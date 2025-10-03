import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, RefreshControl } from "react-native";

import { Table, Row, Rows } from "react-native-table-component";
import { Button } from "react-native-paper";
import { listarAtivos } from "../infra/equipamentos";


export default function Home({navigation}) {
  const [ativos, setAtivos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const carregar = async () => {
      const dados = await listarAtivos();
      const ordenados = dados.sort((a, b) => a.id - b.id);
      setAtivos(ordenados);
    };
    carregar();
  }, []);

  const deletarAtivo = async (id) => {
    const ok = await deletarAtivo(id); 
    if (ok) {
      setAtivos((prev) => prev.filter((ativo) => ativo.id !== id)); 
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      console.log("Dados atualizados!");
      setRefreshing(false);
    }, 2000);
  };

    const tableHead = [
    "ID",
    "Item",
    "Fabricante",
    "Modelo",
    "Serial",
    "Nota Fiscal",
    "Data Emissão",
    "Valor",
    "Fornecedor",
    "Setor",
    "Usuário",
    "Ações",
  ];

  const widthArr = [
    60, 120, 120, 120, 120, 120,
    120, 80, 120, 120, 120, 200
  ]; 

  const tableData = ativos.map((item) => [
    item.id,
    item.item,
    item.fabricante,
    item.modelo,
    item.serial,
    item.notaFiscal,
    item.dataEmissao,
    item.valor,
    item.fornecedor,
    item.setor,
    item.usuario,
    
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
      <Button
        mode="contained"
        compact
        buttonColor="red"
        onPress={() => deletarAtivo(item.id)}
      >
        Excluir
      </Button>
      <Button
        mode="contained"
        compact
        onPress={() =>
          navigation.navigate("AtualizarAtivos", { id: item.id })
        }
      >
        Editar
      </Button>
      <Button
        mode="contained"
        compact
        onPress={() => navigation.navigate("UsarCamera")}
      >
        Câmera
      </Button>
    </View>,
  ]);
  

  return (
    <View style={styles.container}>
    <ScrollView
      horizontal
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
       <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#ccc" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.textHead}
            />
            <Rows
              data={tableData}
              widthArr={widthArr}
              textStyle={styles.text}
            />
          </Table>
        </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: 
  { flex: 1, 
    padding: 10, 
    backgroundColor: "#fff" },
  head: 
  { height: 40, 
    backgroundColor: "#f1f8ff" },
  textHead:
   { margin: 6, 
    fontWeight: "bold" },
  text: 
  { margin: 6 },
});
