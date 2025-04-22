// const mongo = require("mongodb");

// const MongoClient = mongo.MongoClient;

// const MONGO_URL = 
// "mongodb+srv://aamirjamil25999:completecoding@airbnbcluster.czqnybe.mongodb.net/?retryWrites=true&w=majority&appName=Airbnbcluster";
  
// let _db;

// const mongoConnect = (callback) => {
//   MongoClient.connect(MONGO_URL)
//     .then((client) => {
//       console.log(client);
//       callback(client);
//       _db = client.db('myairbnb')
//     })
//     .catch((error) => {
//       console.log("error is coming from db", error);
//     });
// };

// const getDB = () => {
//   if(!_db){
//     throw new Error("No database found");
//   }
//   return _db;
// }


// exports.mongoConnect = mongoConnect;
// exports.getDB = getDB;
