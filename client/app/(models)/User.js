import mongoose, { Schema } from "mongoose";

await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/data-approval-app-nextjs");
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    fullName: String,
    email: String,
    password: String,
    userRole: String
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
