import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
});

const TagsSchema = new Schema({
  tag: { type: String, unique: true },
});

const ContentSchema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true },
  description: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tags" }],
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

const LinkSchema = new Schema({
  hash: { type: String, unique: true, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const UserModel = model("User", UserSchema);
export const ContentModel = model("Content", ContentSchema);
export const LinkModel = model("Link", LinkSchema);
export const TagsModel = model("Tags", TagsSchema);
