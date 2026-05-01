import { Users } from "./models/user.model.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;  

const router = express.Router();

//Registering new user
router.post("api/auth/signup", async (req, res) => {
    try {
        const { name, email, password, role } = req.body||{};
        const hashed = await bcrypt.hash(password.trim(), 10);
        const user = await Users.create(
            { name: name.trim(), email: email.trim(), password: hashed, role }
        );
        res.status(201).json({ message: "User created", userId: user._id });
    }
    catch (error) {
        res.status(400).json({ message: error.message }); 
    }
});

//Logging in user
router.post("/api/auht/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email: email.trim() });
        if (!user) return res.status(404).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password.trim(), user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password" });
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "6h" });
        res.json({ token, role: user.role, name: user.name });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Updating user information
// PUT /api/auth/update/:id
router.put("/update/:id", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const updateFields = {};

    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);

    const updated = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User updated", user: { name: updated.name, email: updated.email } });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;