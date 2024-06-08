import mongoose, { Schema, Document } from "mongoose";

export interface userInterface extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  verifyToken: string | undefined;
  verifyTokenExpiry: Date | undefined;
}

const userSchema: Schema<userInterface> = new Schema({
  fullname: {
    type: String,
    required: [true, "Enter Fullname"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
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
  verifyToken: String,
  verifyTokenExpiry: Date,
  isVerified: {
    type: Boolean,
    default: false,
  }
});

const User =
  (mongoose.models.User as mongoose.Model<userInterface>) ||
  mongoose.model<userInterface>("User", userSchema);

export default User;
