import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Password =
  mongoose.models.Password || mongoose.model("Password", passwordSchema);
export default Password;
