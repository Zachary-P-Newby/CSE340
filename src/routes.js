import express from 'express';

import { showHomePage } from "./controllers/index.js";
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation } from "./controllers/organizations.js";
import { showProjectsPage, showProjectDetailsPage } from "./controllers/projects.js";
import { showCategoriesPage, showCategoryDetailsPage } from "./controllers/categories.js";
import { showTestErrorPage } from "./controllers/errors.js";

const router = express.Router();

/**
  * Routes
  * define a route handler for GET requests to root URL ("/")
  * req = requests to app
  * res = responses to requests
  */

router.get('/',showHomePage);
router.get('/organizations',showOrganizationsPage);
router.get('/projects',showProjectsPage);
router.get('/categories',showCategoriesPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/category/:id', showCategoryDetailsPage);

// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);

// error handling routes
router.get('/test-error',showTestErrorPage);

export default router