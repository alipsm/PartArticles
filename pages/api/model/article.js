import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
  },
  uuid: String,
  createAt: { type: Date, default: Date.now },
});
mongoose.deleteModel("Article");
module.exports =
  mongoose.models.Article || mongoose.model("Article", TodoSchema);
