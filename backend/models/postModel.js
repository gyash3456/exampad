const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const PostSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

PostSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = this.title.split(" ").join("-");
  }
  next();
});

PostSchema.plugin(uniqueValidator);
module.exports = model("Post", PostSchema);
