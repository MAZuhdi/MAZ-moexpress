module.exports = (mongoose) => {
  const schema = mongoose.Schema(
    {
      title: String,
      body: String,
      published: Boolean,
    },
    { timestamps: true }
  );

  //convert field _id menjadi id
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  // const singular (Post), model plural (posts)
  const Post = mongoose.model("posts", schema);
  return Post;
};
