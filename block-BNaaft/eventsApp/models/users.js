const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number },
  },
  { timestamps: true }
);

// hashed password at the time of registeration

userSchema.pre("save", async function (next) {
  try {
    if (this.password && this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10); // new hashed password updated
    }
    next();
  } catch (err) {
    next(err);
  }
});

// genration web token

// userSchema.methods.jwtSign = async function () {
//   var payload = { email: this.email, password: this.password };
//   try {
//     var Token = await jwt.sign(payload, process.env.SECRET);
//     return Token;
//   } catch (err) {
//     return err;
//   }
// };

var User = mongoose.model("User", userSchema);

// User.pre("save",(req,res,next)=>{

// })

module.exports = User;
