const mongoose = require("mongoose");
const mongoURI =
  process.env.MONGODB_URI || process.env.mongooseURI || "mongodb://127.0.0.1:27017/meta_buddy";

const connectToMongo = () => {
  try {
    // Connect to MongoDB using mongoose.connect method. Pass the MongoDB URI and options object.
    mongoose.connect(
      mongoURI,

      { useUnifiedTopology: true },
      mongoose.set("strictQuery", false)
    );
    console.log("Connected to DB");
  } catch (error) {
    console.log("[DATABASE]", error);
  }
};
module.exports = connectToMongo;
