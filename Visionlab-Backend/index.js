const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FormDataModel = require('./models/FormData');

const app = express();
app.use(express.json());
app.use(cors());



mongoose.connect('mongodb://127.0.0.1:27017/Data');

app.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const existingUser = await FormDataModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Already registered" });
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await FormDataModel.create({
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
const JWT_SECRET = "your_secret_key";
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await FormDataModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "No records found!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Success", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    req.user = decoded;
    next();
  });
};

app.get('/user-role', verifyToken, (req, res) => {
  res.json({ role: req.user.role });
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});


