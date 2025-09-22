import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const equipamentosRef = collection(db, "ativos1");


export const adicionarAtivo = async (dados) => {
  return await addDoc(equipamentosRef, dados);
};


export const listarAtivos = async () => {
  const snapshot = await getDocs(equipamentosRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const deletarAtivo = async (id) => {
  try {
    const ativoRef = doc(db, "ativos1", id);
    await deleteDoc(ativoRef);
    console.log(`Ativo ${id} deletado com sucesso`);
    return true;
  } catch (error) {
    console.error("Erro ao deletar ativo:", error);
    return false;
  }
};
export const editarAtivo = async (id, novosDados) => {
  try {
    const ativoRef = doc(db, "ativos1", id);
    await updateDoc(ativoRef, novosDados);
    console.log(`Ativo ${id} atualizado com sucesso`);
    return true;
  } catch (error) {
    console.error("Erro ao editar ativo:", error);
    return false;
  }
};
