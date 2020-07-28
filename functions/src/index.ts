import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://game-of-year-firebase.firebaseio.com"
});

const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("¡Hola registros!", {structuredData: true});
    response.json({
        mensaje: "¡Hola desde Firebase!"
    });
});  

export const getGOTY = functions.https.onRequest(async(request, response) => {
    functions.logger.info("¡Hola registros!", {structuredData: true});
    // response.json({
    //     mensaje: "¡Hola desde Firebase!"
    // });

    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map(docs => docs.data());

    response.json(juegos); 

});  

// Declarar Express y Cors
const app = express();
app.use(cors({origin: true}));

app.get('/goty', async(req, res) => {
    const gotyRef = db.collection('goty');
    const docsSnap = await gotyRef.get();
    const juegos = docsSnap.docs.map(docs => docs.data());

    res.json(juegos);
});

app.post('/goty/:id', async(req, res) => {
    const id = req.params.id;
    const gameRef = db.collection('goty').doc(id);
    const gameSnap = await gameRef.get();

    if(!gameSnap.exists){
        res.status(404).json({
            ok: false, mensaje: 'No esiste un juego con el ID ' + id
        });
    }else{
        const juegoAntes = gameSnap.data() || { votos: 0 };
        await gameRef.update({votos: juegoAntes.votos +1});

        res.json({
            ok: true, mensaje: `Gracias por tu voto al juego ${juegoAntes.name}`
        });
    }
}); 

export const apiGoty = functions.https.onRequest(app);