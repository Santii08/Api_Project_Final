/*require("dotenv").config()

const{initializeApp, applicationDefault}=require("firebase-admin/app")
const { getFirestore } = require("firebase-admin/firestore")
require("firebase-admin/firestore")
initializeApp({
    credential: applicationDefault()
})
const db = getFirestore()
module.exports= {
    db
}*/

const admin = require("firebase-admin");

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://proyectfinal-b86ae-default-rtdb.firebaseio.com/",
});

const db = admin.firestore();

module.exports = { db };
