//Import requried libraries
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';

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

/**
  * Routes
  */
app.get('/', (req, res) => {
    const title = "Home";
    res.render("home", { title });
});

app.get('/organizations', async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
});

app.get('/projects', (req, res) => {
    const title = 'Service Projects';
    res.render('projects', { title });
});

app.get('/categories', (req, res) => {
    const title = 'Categories';
    res.render('categories', { title });
});

//define a route handler for GET requests to root URL ("/")
//req = requests to app
//res = responses to requests
app.get("/", (req, res) => {
    //the response to send back to the client
    res.send("Hello from Express!");
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