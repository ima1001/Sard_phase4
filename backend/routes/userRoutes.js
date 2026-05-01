const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;  
const express = require("express");
const router = express.Router();
const Users = require("../models/user.model.js");

//Registering new user
router.post("/register", async (req, res) => {
    
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
    /*    
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const existing = users.find((u) => u.email === email);
    if (existing) {
        return res.status(400).json({ error: "User already exists" });
    }
    const hash = await bcrypt.hash(password, 10);
    users.push({ name, email, passwordHash: hash, role });
    return res.status(201).json({ message: "User registered!" });
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error during register" });
*/
});

//Logging in user
router.post("/login", async (req, res) => {
    /*
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
    */
    const { email, password } = req.body || {};
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await Users.findOne({ email: email.trim() });
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password.trim(), user.password);
    if (!match) {
        return res.status(400).json({ error: "Wrong password" });
    }
    const token = jwt.sign(
        { email },
        JWT_SECRET,
        { expiresIn: "3h" }
    );
    return res.json({ token });
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login" });
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