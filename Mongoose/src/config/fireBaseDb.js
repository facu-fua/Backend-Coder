import admin from "firebase-admin";
import fs from "fs";
import pkg from 'firebase-admin';
const { database } = pkg

const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKeyCoder.json", "utf-8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://backendcoder-3d3dc.firebaseio.com"
});

console.log("Conexion a firebase exitosa!")

const db = admin.firestore();
