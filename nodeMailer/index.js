require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


app.get("/sendemail", async (req, res) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: [
                process.env.EMAIL_USER,
                "venugopal.burli@masaischool.com"
            ],
            subject: "Test Mail from NEM Student",
            text: "This is a testing Mail sent by NEM student, no need to reply.",
        });

        res.send("Email sent successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to send email");
    }
});


app.listen(3000, () => console.log("Server running on port 3000"));
