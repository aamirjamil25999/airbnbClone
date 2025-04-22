// // Core Modules
// // const fs = require("fs");
// // const path = require("path");
// // const rootDir = require("../utils/pathUtil");
// // const Favourite = require("./favourite");

// const { ObjectId } = require("mongodb");
// const { getDB } = require("../utils/databasemongodb");

// // const homeDataPath = path.join(rootDir, "data", "homes.json");

// // const db = require("../utils/database");
// const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
// const Favourite = require("./favourite");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number, required: true },
  photoUrl: String,
  description: String,
});



// homeSchema.pre('findOneAndDelete', async function (next) {
//   const homeId = this.getQuery()._id;

//   console.log("🔥 HOOK TRIGGERED FOR HOME ID:", homeId);

//   try {
//     const result = await Favourite.deleteMany({
//       houseId: homeId // ✅ This is the actual FIX!
//     });

//     console.log("🧹 Deleted from favourites:", result.deletedCount);
//   } catch (err) {
//     console.log("❌ Error deleting favourites:", err);
//   }

//   next();
// });


module.exports = mongoose.model("Home", homeSchema);

// module.exports = class Home {
//   constructor(houseName, price, location, rating, photoUrl,description,_id) {
//     this.houseName = houseName;
//     this.price = price;
//     this.location = location;
//     this.rating = rating;
//     this.photoUrl = photoUrl;
//     this.description = description;
//     if(_id){
//       this._id = _id;
//     }

//   }

//   save() {

//     const updateFields = {
//       houseName: this.houseName,
//       price: this.price,
//       location: this.location,
//       rating: this.rating,
//       photoUrl: this.photoUrl,
//       description: this.description
//     }

//     const db = getDB()

//     if(this._id){
//       return db.collection("homes").updateOne(
//         { _id: new ObjectId(String(this._id)) },
//         { $set: updateFields }
//       );

//     }else{
//       return db.collection("homes").insertOne(this)

//     }

//   }

//     // return db.execute('INSERT INTO homes (houseName, price, location, rating, photoUrl, description) VALUES (?,?,?,?,?,?)',[ // MY Sql related
//     //   this.houseName,this.price,this.location,this.rating,this.photoUrl,this.description
//     // ])    // MY Sql related

//     // this code related to fs module now changing in the DB
//     // Home.fetchAll((registeredHomes) => {
//     //   if (this.id) { // edit home case
//     //     registeredHomes = registeredHomes.map(home =>
//     //       home.id === this.id ? this : home);
//     //   } else { // add home case
//     //     this.id = Math.random().toString();   t
//     //     registeredHomes.push(this);
//     //   }
//     //   fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
//     //     console.log("File Writing Concluded", error);
//     //   });
//     // });

//   static fetchAll(callback) {

//     const db = getDB();
//     return db.collection('homes').find().toArray()
//     //  return db.execute('SELECT * FROM homes')  // MY Sql related
//   }

//     //   .then(([rows, fields]) => {
//     //     console.log("Getting from ", rows);  // db related code.
//     //   })
//     //   .catch((error) => {
//     //     console.log("Error: ", error);
//     //   });

//     // fs.readFile(homeDataPath, (err, data) => {
//     //   callback(!err ? JSON.parse(data) : []);     fs module related code now changing in the DB
//     // });

//   static findById(homeId) {
//     // console.log("Function Called ✅");
//     // console.log("Received homeId:", homeId);
//     const db = getDB();
//     return db.collection('homes').find({_id:new ObjectId(String(homeId)) }).next()

//     // return db.execute('SELECT * FROM homes WHERE id = ?', [homeId]) // MY Sql related
//     // this.fetchAll(homes => {
//     //   const homeFound = homes.find(home => home.id === homeId);   fs module related code now changing in the DB
//     //   callback(homeFound);
//     // })
//   }

//   static deleteById(homeId) {

//     const db = getDB();
//     return db.collection('homes').deleteOne({_id:new ObjectId(String(homeId)) })
//     // return db.execute('DELETE FROM homes WHERE id = ?', [homeId])  // MY Sql related
//     //   this.fetchAll(homes => {
//     //     homes = homes.filter(home => home.id !== homeId);
//     //     fs.writeFile(homeDataPath, JSON.stringify(homes), error => {   fs module related code now changing in the DB
//     //       Favourite.deleteById(homeId, callback);
//     //     });
//     //   })
//     // }
//   }

//   update(id) {
//   //   return db.execute(
//   //     'UPDATE homes SET houseName = ?, price = ?, location = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?',
//   //     [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, id]
//   //   );
//       // MY Sql related
//   }
// }

// // module.exports = Home;
