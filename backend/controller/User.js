import User from "../model/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
console.log(firstName, lastName, email, password)
 
if (!email || !password || !firstName || !lastName) {
    throw Error("All fields musst filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ error: "Password is not strong Enough" });
  }

  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
console.log(newUser)
    await newUser.save();
    //token
    const token = createToken(newUser._id);

    // res.status(201).json(newUser, token )
    res.status(201).json({ newUser, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Incorrect email" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    
    const token = createToken(user._id);
    res.status(201).json({ email, token });
    // console.log(email)

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
