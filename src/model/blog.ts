import mongoose, { Schema, Document } from "mongoose";

export interface blogInterface extends Document {
  userId: Schema.Types.ObjectId;
  title: string;
  content: string;
  coverImgURL: string | null;
  createdBy: string;
  createdAt: Date;
}

const blogSchema: Schema<blogInterface> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  coverImgURL: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Blog =
  (mongoose.models.Blog as mongoose.Model<blogInterface>) ||
  mongoose.model<blogInterface>("Blog", blogSchema);

export default Blog;
