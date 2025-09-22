import { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, ScrollView, RefreshControl } from "react-native";
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

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.id}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.item}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.fabricante}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.modelo}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.serial}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.notaFiscal}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.dataEmissao}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.valor}</Text>
      <Text style={[styles.cell, { flex: 2 }]}>{item.fornecedor}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.setor}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>{item.usuario}</Text>
      <View style={[styles.cell, { flex: 1, flexDirection: "row"  }]}>
        <Button title="Excluir" onPress={() => deletarAtivo(item.id)} />
            <View style={{ width: 10 }} />
        <Button title="Editar"  onPress={() => navigation.navigate("AtualizarAtivos", { id: item.id })}/>
      </View>
    </View>
  );

  return (
    <ScrollView horizontal  refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Ativos</Text>

    
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, { flex: 1, fontWeight: "bold" }]}>ID</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Item</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Fabricante</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Modelo</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Serial</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Nota Fiscal</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Data de Emissão</Text>
            <Text style={[styles.cell, { flex: 1, fontWeight: "bold" }]}>Valor</Text>
            <Text style={[styles.cell, { flex: 2, fontWeight: "bold" }]}>Fornecedor</Text>
            <Text style={[styles.cell, { flex: 1, fontWeight: "bold" }]}>Setor</Text>
            <Text style={[styles.cell, { flex: 1, fontWeight: "bold" }]}>Usuario</Text>
            <Text style={[styles.cell, { flex: 1, fontWeight: "bold" }]}>Ações</Text>
      </View>

      {ativos.length === 0 ? (
        <Text>Nenhum ativo cadastrado.</Text>
      ) : (
        <FlatList
          data={ativos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
  },
  cell: {
    paddingHorizontal: 5,
  },
  header: {
    backgroundColor: "#ddd",
    borderBottomWidth: 2,
  },
});
