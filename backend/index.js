
const express=require('express')
const path = require('path')
const mongoose = require('mongoose');
const multer = require('multer');
const cors=require('cors');
const app=express();
const bodyParser = require('body-parser');
const port=5000;
const Image=require('./models/schema');
const User=require('./models/user');
const session = require('express-session');
const MongoStore = require('connect-mongo'); 
app.use(session({
    secret: 'your-secret-key', // Replace with a strong secret
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Only create sessions when there's something to save
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/mydatabase', // Your MongoDB URL
        collectionName: 'sessions' // Collection to store sessions
    }),
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 24 * 60 * 60 * 1000 // Session cookie expiry time (24 hours)
    }
}));
 app.use(cors({
    origin: 'http://localhost:3000', // Your React app's origin
    credentials: true // Allow credentials to be sent (cookies, authorization headers, etc.)
}));

/*import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import bodyParser from 'body-parser';
 // Note the .js extension
import User from './models/user.js'; 
const port = 3000
const app=express
*/
mongoose.connect('mongodb://localhost:27017/mydatabase');

app.use('/', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

const storage=multer.memoryStorage();
const upload=multer({storage:storage});
app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/upload.html'));
});
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/signup.html'));
});

app.use('/',require(path.join(__dirname,'routes/app.js')));
app.use('/about',require(path.join(__dirname,'/routes/app.js')));


app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }
        const n = new Image({
            data: req.file.buffer,
            contentType: req.file.mimetype,
            userId: req.session.userId 
        });
        await n.save();
        res.send('Picture submitted successfully');
    
    } catch (error) {
        res.status(500).send('An error occurred.');
    }
});
app.post('/signup',async(req,res)=>{
    const { username, password, email, phoneNumber } = req.body;
    const a=new User(
        { username, password, email, phoneNumber } 

    )
    await a.save();
    res.send('no error');
});
app.post('/', async (req, res) => {
    try {
        const { username,password } = req.body;
        console.log('Received login request with:', { username, password });
        const user= await User.findOne({ username ,password});

        if (user) {
            req.session.userId = user._id;
            console.log('User logged in, session ID:', req.session.userId);
            res.send('logged in');
        } else {
            res.send('please signup');
            console.log("ERROR")
        }
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
    }
});

app.use((req, res, next) => {
  //  console.log('User ID:', req.session.userId);
    next();
});

app.get('/history', async (req, res) => {
  //  console.log('Session data:', req.session);
    
    // Check if the userId exists in the session
    if (!req.session.userId) {
        return res.status(401).json({ message: 'no user logged in' });
    }

    try {
        const user = await User.findOne({ _id: req.session.userId });

        if (user) {
            const image = await Image.findOne({ userId: user._id });
            const userProfile = {
                _id: user._id,
                username: user.username,
                email: user.email,
                image: image ? `data:${image.contentType};base64,${image.data.toString('base64')}` : null
                 // Set image if it exists
            };
          //  console.log(image); 

            res.json(userProfile); // Send user data as JSON
        } else {
            res.status(401).json({ message: 'no user logged in' }); // User not found
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle unexpected errors
    }
});


    app.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                return res.status(500).send('Failed to log out');
            }
            res.redirect('/login'); // Redirect to login or home page
        });
    });
    
app.listen(port,()=>{
    console.log('app at http://localhost:${port}');
})

