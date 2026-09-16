//Import requried libraries
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import router from './src/routes.js';



//Enviorment Varibles

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//create express application
const app = express();

/**
  * Configure Express middleware
  */

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

//Middleware to log all incoming requests
app.use((req, res, next) =>{
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next(); // pass control to the next middleware or route
});

//Middleware to make NODE_ENV availible to all templates
app.use((rq,res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
})



//use the imported router tp handle routes
app.use(router);



// Catch-all route for 404 errors
app.use((req,res,next) => {
  //No route matching the request was found
  //create a new 404 error
  const err = new Error('Page Not Found');
  err.status = 404;
  //send it off to the global error handler
  next(err);
});

//global error handler
app.use((err, req, res, next) =>{
  //log error details for debugging
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);

  //determine status and template
  //if the error has a status use tha, otherwise set 500
  const status = err.status || 500;
  //set template to be either 404 or 500 to match the status
  const template = status === 404 ? '404' : '500';

  //prepate data for the template
  const context = {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: err.message,
    stack: err.stack
  };

  //render the appropiate error template
  res.status(status).render(`errors/${template}`, context);
});






//Start the server and listen for requests on port 3000
//when the server is started log message to console indicating it is running and provide URL where it can be accessed
app.listen(PORT, async () => {
  try {
    await testConnection();
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);


  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
});