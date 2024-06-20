import mongoose from "mongoose";

export default async function dbconnect() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.MONGO_DB_NAME!,
    });
    connection.connection.on("connected", () => {
      console.log("Connected to database");
    });
    connection.connection.on("error", (error) => {
      console.log("Error connecting to database");
      console.log(error);
    });
  } catch (error: any) {
    console.log("Error connecting to database");
    console.log(error);
  }
}
