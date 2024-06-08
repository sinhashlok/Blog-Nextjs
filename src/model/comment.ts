import mongoose, { Schema, Document } from "mongoose";

export interface commentInterface extends Document {
  userId: Schema.Types.ObjectId;
  blogId: Schema.Types.ObjectId;
  content: string;
  createdBy: string;
  createdAt: Date;
}

const commentSchema: Schema<commentInterface> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  blogId: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Comment =
  (mongoose.models.Comment as mongoose.Model<commentInterface>) ||
  mongoose.model<commentInterface>("Comment", commentSchema);

export default Comment;
