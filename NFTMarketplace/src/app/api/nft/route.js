import { NextResponse } from 'next/server';
import clientPromise from '../../lib/db';
import mongoose from 'mongoose';
import { FormData } from '@/app/lib/model/formData';


async function connectToDB() {
    if (!mongoose.connections[0].readyState) {
     const connectionSrt = process.env.MONGODB_URI;
      await mongoose.connect(connectionSrt);
      console.log("Connected to MongoDB");
    }
  }
export async function GET(){
    await connectToDB();
    console.log("connected");
   const data = await FormData.find();
  console.log("data" ,data);
  return NextResponse.json({ result: data });

}
// export async function POST(req) {
//   try {
//     const client = await clientPromise;
//     const db = client.db('yourDatabaseName');

//     // Parse the request body
//     const nftData = await req.json();

//     // Insert NFT data into the 'nfts' collection
//     const collection = db.collection('nfts');
//     await collection.insertOne(nftData);

//     return new Response(JSON.stringify({ success: true, message: 'NFT added successfully' }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, message: 'Error saving NFT' }), {
//       status: 500,
//     });
//   }
// }
