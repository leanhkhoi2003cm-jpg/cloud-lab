const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const Student = require("../models/Student");

app.use(express.json());
app.use(cors());
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend đang hoạt động!"
    });
});
app.get("/api/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
app.post("/api/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.put("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
app.delete("/api/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Không tìm thấy sinh viên" });
        }

        res.json({
            message: "Xóa sinh viên thành công",
            student: student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas connected successfully");

        app.listen(PORT, () => {
            console.log(`Server đang chạy tại port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });
    