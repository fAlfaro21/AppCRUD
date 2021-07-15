//--1-------------------- Importar dependencias
const express = require('express');
const dotenv = require ('dotenv').config();
const {MongoClient} = require ('mongodb');

//--2--------------------- Configuración inicial
const server = express();
const listenPort = process.env.HTTP_PORT || 8080;

//Json support para que express pueda gestionar los ficheros JSON
server.use(express.urlencoded({extended: true}));
server.use(express.json());

const urlDBMongo = process.env.DB_HOST;
const optionsMongo = {useNewUrlParser: true, useUnifiedTopology: true};

server.post('/postQuotes',(req,responseHttp) => {    
    MongoClient.connect(urlDBMongo, optionsMongo, function (err, db){
        if (err) throw err; //si esto sucede se sale. Invoca un try/catch (para controlar excepciones)
        let database = db.db("myCrudDb");
        let myQuote = req.body;

        database.collection("myQuotesCollection").insertOne(myQuote, function(err, resDB) {
            if (err) throw err;
            db.close();
            responseHttp.send(JSON.stringify({message: "POST ok"}));
        });
    });
});

server.get('/getQuotes',(req,responseHttp) => {    
    MongoClient.connect(urlDBMongo, optionsMongo, function (err, db){
        if (err) throw err; //si esto sucede se sale. Invoca un try/catch (para controlar excepciones)
        
        let database = db.db("myCrudDb");
        let myQuote = req.body;

        database.collection("myQuotesCollection").findOne({}, function(err, resDB) {
            if (err) throw err;
            db.close();
            responseHttp.send(JSON.stringify({message: "ok"}));
        });
    });
});

server.put('/putQuotes/:name',(req,responseHttp) => {    
    MongoClient.connect(urlDBMongo, optionsMongo, function (err, db){
        if (err) throw err; //si esto sucede se sale. Invoca un try/catch  (para controlar excepciones)
        let database = db.db("myCrudDb");
        let myQuote = req.body;
        let myquery = {name: req.params.name}
        let newvalues = { $set: myQuote};
        console.log(newvalues);

        database.collection("myQuotesCollection").updateOne(myquery, newvalues, function(err, resDB) {
            if (err) throw err;
            db.close();
            responseHttp.send(JSON.stringify({message: "ok"}));
        });
    });
});

server.delete('/deleteQuotes',(req,responseHttp) => {    
    MongoClient.connect(urlDBMongo, optionsMongo, function (err, db){
        if (err) throw err;
        let database = db.db("myCrudDb");
        let myQuote = req.body;

        database.collection("myQuotesCollection").deleteOne(myQuote, function(err, resDB) {
            if (err) throw err;
            db.close();
            responseHttp.send(JSON.stringify({message: "ok"}));
        });
    });
});

server.listen(listenPort,
    () => console.log(`Server started listening on http://localhost:${listenPort}`)
  );