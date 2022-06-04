module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      username: String,
      gender: String,
      hobby: Array,
      age: Number,
      date: Date,
      taskname: String,
      status: String,
    },
    { timestamps: true }
  );
  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const ToDo = mongoose.model("todos", schema);
  return ToDo;
};
