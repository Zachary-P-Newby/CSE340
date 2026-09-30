import bcrypt from 'bcrypt';
import { createUser, authenticateUser } from '../models/users.js';
import {body, validationResult} from 'express-validator';

export const showUserRegistrationForm = async (req, res) =>{
    const title = 'Add new user';
    res.render('register', {title});

}

export const processUserRegistrationForm = async(req, res) => {

    /*const errors = validationResult(req);
    if (errors.isEmpty() == false){
        errors.array.forEach(error => {
            console.log(error);
            req.flash('error', error.msg);
        });
    }
    else{
        
        
    }*/

    const {name, email, password} = req.body;


    try{
        //hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        console.log(password_hash);
        const userID = await createUser(name, email, password_hash);
        req.flash('success',"Registration successful! Please log in.");
        res.redirect("/");
    }
    catch(error){
        console.error("Error occured registering user: ",error);
        req.flash('error', "An error occurred during registration. Please try again.");
        res.redirect('/register');
    }
    
};

export const showLoginForm = async (req, res)=>{
    const title = "Login";
    res.render("login", {title})
}

export const processLoginForm= async (req, res)=>{

    const {email, password} = req.body;

    const user = await authenticateUser(email,password);

    if (user != null){
        req.session.user = user;

        req.flash("success", "Login was successful.");
        console.log("Login was successful. user: ",user);
        res.redirect("/dashboard");
    } else{
        req.flash("error", "Login failed");
        console.log("Login was a failure.");
        res.redirect("/login");
    }
}
export const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};


export const requireLogin = async (req, res, next) =>{
    if(req.session && req.session.user){
        next();
    } else{
        req.flash('error', 'You must login to access that page.');
        res.redirect('/login');
    }
}

export const showDashboard = async (req, res) =>{
    const {name, email} = req.session.user;
    const title = "Dashboard";
    res.render("dashboard", {title, name, email});
}