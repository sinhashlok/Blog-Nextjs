import mongoose, { Schema, Document } from "mongoose";

export interface userInterface extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
}

const userSchema: Schema<userInterface> = new Schema({
  fullname: {
    type: String,
    required: [true, "Enter Fullname"],
  },
  email: {
    type: String,
    required: [true, "Enter Email address"],
    unique: true,
    match: [/.+\@.+\..+/, "Please use a valid Email Address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: String,
  verifyCodeExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const User =
  (mongoose.models.User as mongoose.Model<userInterface>) ||
  mongoose.model<userInterface>("user", userSchema);

export default User;
