import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "./firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";

export async function criarUsuario({ email, senha, tipo }) {
  let retorno = new Object();

  try {
    const credenciais = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = credenciais.user.uid;

    console.log(credenciais);

    await setDoc(doc(db, "usuarios", uid), {
      tipo,
      criadoEm: new Date(),
    });
    retorno.id = uid;
    retorno.email = email;
    retorno.senha = senha;
    retorno.tipo = tipo;
  } catch (error) {
    console.error(`${error.code} = ${error.message}`);
    retorno.erro = error.message;
  }
  return retorno;
}

export async function loginUsuario(email, senha) {
  let retorno = new Object();
  await signInWithEmailAndPassword(auth, email, senha)
    .then(async (credenciais) => {
      const uid = credenciais.user.uid;
      retorno.id = uid;
      retorno.email = email;
      retorno.senha = senha;

      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        retorno.tipo = docSnap.data().tipo;
        console.log(retorno.tipo);
      } else {
        retorno.tipo = "desconhecido";
      }
    })
    .catch((error) => {
      console.log(`${error.code} = ${error.message}`);
      retorno.erro = "Login Inválido";
    });
  return retorno;
}
