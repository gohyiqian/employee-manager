import mongoose from "mongoose";
const Schema = mongoose.Schema;
import randomstring from "randomstring";

export const customedIdentifier = () => {
  let result = "";
  let random = randomstring.generate({
    length: 7,
    charset: "alphanumeric",
  });
  result = "UI" + random;
  return result;
};

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minlength: 3,
      maxlength: 20,
    },
    days_worked: {
      type: Number,
      default: 0,
      required: [true, "Please provide number of days worked"],
    },
    cafe: {
      type: String,
      required: [true, "Please provide name of cafe employee is under"],
      minlength: 6,
      maxlength: 20,
      ref: "Cafe",
    },
    _id: {
      type: String,
      default: customedIdentifier(),
      required: [true, "Please provide UIXXXXXXX"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
