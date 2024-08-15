import { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    // Define your schema fields and their types
    name: { type: String, required: true },
    email: { type: String, default: "defaultValue", lowercase: true },
    location: {
      type: { type: String, enum: ["Point"], required: true },
      coordinates: { type: [Number], required: true },
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

userSchema.methods.sayHi = function () {
  console.log(`Hi, My name is ${this.name}`);
};

userSchema.statics.findByName = function (name) {
  //userModel.findByName("Name")
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.query.byName = function (name) {
  // userModel.find().byName("Name")  ||  userModel.where().byName("Name")
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.virtual("namedEmail").get(function () {
  // on find query it returns field namedEmail in given format but it doesn't save it in DB
  return `${this.name} <${this.email}>`;
});

userSchema.pre("save", function (next) {
  //middleware run before save operation
  // perform operations
  this.updatedAt = Date.now();
  next(); //call the next method to move ctrl to next middleware
});

userSchema.post("save", function (doc, next) {
  //middleware run after save operation
  // perform operations
  doc.sayHi();
  next(); //call the next method to move ctrl to next middleware
});
const userModel = model("users", userSchema);
// export { userModel };
export default userModel;
// const userModel = mongoose.model("users", userSchema);
