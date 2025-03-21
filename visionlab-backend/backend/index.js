const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/Data');

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            FormDataModel.create(req.body)
            .then(log_reg_form => res.json(log_reg_form))
            .catch(err => res.json(err))
        }
    })
    
})

app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    FormDataModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})

app.listen(3001, () => {
    console.log("Server listining on port:3001");

});








// const cors = require('cors');
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt'); // Import bcrypt
// const FormDataModel = require('./models/FormData');

// const app = express();
// app.use(express.json());
// app.use(cors());

// mongoose.connect('mongodb://127.0.0.1:27017/Data');

// // Registration Route (Hash Password)
// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, role} = req.body;

//         // Check if the user already exists
//         const existingUser = await FormDataModel.findOne({ email });
//         if (existingUser) {
//             return res.json("Already registered");
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Save user to database
//         const newUser = await FormDataModel.create({
//             name,
//             email,
//             password: hashedPassword, // Store hashed password
//             role,
//         });

//         res.json(newUser);
//     } catch (error) {
//         res.status(500).json({ error: "Error registering user" });
//     }
// });

// // Login Route (Compare Hashed Password)
// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Find user by email
//         const user = await FormDataModel.findOne({ email });

//         if (!user) {
//             return res.json("No records found!");
//         }

//         console.log(user.password);

//         // Compare entered password with hashed password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.json("Wrong password");
//         }

//         // Send user data on successful login
//         res.json({ message: "Success", user });
//     } catch (error) {
//         res.status(500).json({ error: "Error logging in" });
//     }
// });

// // Fetch User Data Route
// app.get('/user/:email', async (req, res) => {
//     try {
//         const user = await FormDataModel.findOne({ email: req.params.email });

//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// app.listen(3001, () => {
//     console.log("Server listening on port: 3001");
// });
