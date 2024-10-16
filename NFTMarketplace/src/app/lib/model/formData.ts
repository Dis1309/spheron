import mongoose from "mongoose";

const FormDataModel = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    royalties: { type: Number, required: true },
    category: { type: String, required: true },
    additionalInfo: { type: String },
});

export const FormData = mongoose.models.data || mongoose.model("data",  FormDataModel);