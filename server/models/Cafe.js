import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const cafeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      unique: true,
    },
    employees: {
      type: Number,
      default: 2,
      required: [true, "Please provide number of employees"],
    },
    logo: {
      data: Buffer,
      contentType: String,
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    _id: {
      type: String,
      default: uuidv4(),
      required: [true, "Please provide uuid"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cafe", cafeSchema);
