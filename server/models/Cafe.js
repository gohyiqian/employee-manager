import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { v4 as uuidv4 } from "uuid";

const cafeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 10,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      minlength: 10,
      maxlength: 30,
      unique: true,
    },
    employees: {
      type: Number,
      default: 0,
    },
    // Buffer data type allows us to store our image as data in the form of arrays
    // logo: {
    //   data: Buffer,
    //   contentType: String,
    // },
    logo: {
      type: String,
      default: "image.png",
    },
    location: {
      type: String,
      required: [true, "Please provide location"],
    },
    id: {
      type: String,
      default: uuidv4(),
    },
  },
  { timestamps: true }
);

export default mongoose.model("Cafe", cafeSchema);
