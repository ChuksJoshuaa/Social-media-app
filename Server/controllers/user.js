import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "ok", msg: "Please provide email and password" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ msg: "User does not exist" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      res.status(400).json({ status: "ok", msg: "Invalid Credentials" });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, comfirmPassword, firstName, lastName, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    const existingPhone = await User.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (existingPhone) {
      return res.status(400).json({ msg: "User already exists" });
    }

    if (password !== comfirmPassword) {
      return res.status(400).json({ msg: "Password does not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      mobile: phoneNumber,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_LIFETIME }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
};
