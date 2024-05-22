import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect() {
  console.log(connection);
  if (connection.isConnected) {
    console.log("Already connected to MongoDb");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDb connected!");
  } catch (error: any) {
    console.log("MongoDb connection Failed", error);
    process.exit(1);
  }
}

export default dbConnect;
