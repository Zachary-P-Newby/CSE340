import bcrypt from 'bcrypt';
import { createUser, authenticateUser, getAllRegisteredUsers } from '../models/users.js';

const showUserRegistrationForm = async (req, res) =>{
    const title = 'Add new user';
    res.render('register', {title});

}

const processUserRegistrationForm = async(req, res) => {

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

const showLoginForm = async (req, res)=>{
    const title = "Login";
    res.render("login", {title})
}

const processLoginForm= async (req, res)=>{

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

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user;
    }

    req.flash('success', 'Logout successful!');
    res.redirect('/login');
};


const requireLogin = async (req, res, next) =>{
    if(req.session && req.session.user){
        next();
    } else{
        req.flash('error', 'You must login to access that page.');
        res.redirect('/login');
    }
}

const showDashboard = async (req, res) =>{
    const {name, email} = req.session.user;
    const title = "Dashboard";
    res.render("dashboard", {title, name, email});
}

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) =>{

    return (req, res, next)=> {
        if(req.session.user){
            if(req.session.user.role_name == role){
                next();
            }
            else{
                req.flash("error", "You do not have sufficent privileges to access that page.");
            return res.redirect("/");
            }
        }
        else{
            req.flash("error", "You must be logged in to access that page.");
            return res.redirect("/login");
        }
    }
} 

const showRegisteredUsers = async (req, res) =>{
    const title = "Registered Users";
    const regUsers = await getAllRegisteredUsers();

    res.render("registered-users", {title, regUsers});
};

export {showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showRegisteredUsers}
