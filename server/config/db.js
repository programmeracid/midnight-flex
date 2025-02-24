import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';


export const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URI);
        // const client = new MongoClient(process.env.MONGO_URI, {
        //     serverApi: {
        //       version: ServerApiVersion.v1,
        //       strict: true,
        //       deprecationErrors: true,
        //     }
        //   });
        // await client.connect();
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected`);
    }
    catch (error){
        console.log(`Error : ${error.message}`);
        process.exit(1); //1 - exit with failure
    }
}