import React from "react";
import {Text, Image, StyleSheet, ScrollView } from "react-native";

export default function Dashboard() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      <Text style={styles.subtitle}>Gráfico de Vendas</Text>
      <Image
        source={require("../assets/graficoPizza.png")}
        style={styles.grafico}
        accessibilityLabel="Gráfico em formato de pizza exibindo quantidade de itens por tipo"
      />

      <Text style={styles.subtitle}>Gráfico de Usuários</Text>
      <Image
        source={require("../assets/cartaoTotal.png")}
        style={styles.grafico}
        accessibilityLabel="Gráfico mostrando soma dos valores gastos com equipamentos"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 10,
  },
  grafico: {
    width: 320,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 10,
  },
});
