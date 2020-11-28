import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  favs: {
    type: [Number],
    default: []
  },
  allowPlus18: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", userSchema);

export default User;