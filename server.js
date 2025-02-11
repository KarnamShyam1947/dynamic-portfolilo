const cors = require("cors");
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const bcrypt = require("bcryptjs");

const User = require("./models/userModel");

require('dotenv').config({path: __dirname + '/.env'})

const verifyToken = require('./middleware/authMiddleware');
const UploadRouter = require("./routes/uploadRouter");
const ProjectRouter = require("./routes/ProjectRouter");
const certificateRouter = require("./routes/certificateRoutes");
const educationRouter = require("./routes/educationRoutes");
const publicationRouter = require("./routes/publicationRoutes");
const skillRouter = require("./routes/skillRoutes");
const authRouter = require("./routes/authRoutes");

const app = express();

const PORT = process.env.PORT;
const DB_URI = process.env.MONGODB_URI;

app.use(express.static('public'));
app.use(cookieParser());    
app.use(express.json());
// app.use(cors({
//     origin: 'http://127.0.0.1:3000', // Adjust this to match your frontend's URL
//     credentials: true, // Allow cookies to be sent
//   }));

app.use(cors({
    credentials: true
}))

app.get('/health', async (req, resp) => {
    return resp
            .status(200)
            .json({
                "status" : "ok"
            })
});

app.use('/admin', verifyToken);
app.use('/api/auth', authRouter);
app.use('/api/uploads', UploadRouter);
app.use('/api/projects', ProjectRouter);
app.use('/api/certificates', certificateRouter);
app.use('/api/education', educationRouter);
app.use('/api/publications', publicationRouter);
app.use('/api/skills', skillRouter);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin/add-project', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/add-project.html'));
});

app.get('/admin/certificate', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/certificate.html'));
});

app.get('/admin/education', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/education.html'));
});

app.get('/admin/publication', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/publication.html'));
});

app.get('/admin/skill', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin/skill.html'));
});

app.get('/admin/change-password', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth/change-password.html'));
});

app.get('/auth/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'auth/login.html'));
});

const initializeDefaultAdmin = async () => {
    const defaultAdminUsername = 'admin';
    const defaultAdminPassword = 'admin123'; // Change this to a more secure password in production

    const existingAdmin = await User.findOne({ username: defaultAdminUsername });

    if (!existingAdmin) {
        // const hashedPassword = await bcrypt.hash(defaultAdminPassword, 10);
        const admin = new User({
            username: defaultAdminUsername,
            password: defaultAdminPassword
        });

        await admin.save();
        console.log('Default admin user created');
    } else {
        console.log('Admin user already exists');
    }
};

console.log("Trying to establish connection with mongodb....");
mongoose.connect(DB_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');

        initializeDefaultAdmin();

        app.listen(
            PORT, 
            () => {
                console.log(`Server is running on : http://127.0.0.1:${PORT}.........`)
            }
        );
    }).catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });
    
