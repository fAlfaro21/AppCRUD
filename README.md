# AppCRUD
CRUD application (Create, Read, Update and Delete)

This application was developed with the following elements:
- MongoDB
- Express
- Node.js

and
- MongoDB Compass (console)
- Postman

This project does not work with Frontend, the purpose of this exercies was to do all testing via Postman.

You should run npm install and install the following dependencies: node, express, nodemon, dotenv and mongodb.
Start the server: $nodemon serverApp.js

For connecting MongoDB, MongoClient method was used.  
The DB and collection was created in MongoDB (console).
Every endpoint is connected to MongoDB by using Express.

First endpoint GET/quotes, it will return the complete content of the database. It will also accept optional query params that allow receiving the request for a single document filtering by the "name" field.

Second endpoint POST/create, it will create new content in the database. It will receive by body request a "name" field and a "quote" field. In this endpoint it will generate an "id" to store along with the previous data. 

Third endpoint PUT/modify/:id, will search for the document to update by the received id and will update it with the information received by body.

Fourth endpoint DELETE/delete/:id, it will search for the received id of a document and delete.

