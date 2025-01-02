import mongoose, { Schema } from "mongoose";


const schemaData = new Schema(
  {
    name: { type: String, required: true },
    num: { type: Number, required: true },
    email: { type: String, required: true },
    hcode: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.models.signup || mongoose.model("signup", schemaData);
export default userModel