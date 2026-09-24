import express from 'express';

import { showHomePage } from "./controllers/index.js";
import { 
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm } from "./controllers/organizations.js";
import { 
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation } from "./controllers/projects.js";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm } from "./controllers/categories.js";
import { showTestErrorPage } from "./controllers/errors.js";

const router = express.Router();

/**
  * Routes
  * define a route handler for GET requests to root URL ("/")
  * req = requests to app
  * res = responses to requests
  */

//GET routes
router.get('/',showHomePage);
router.get('/organizations',showOrganizationsPage);
router.get('/projects',showProjectsPage);
router.get('/categories',showCategoriesPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm)
router.get('/organization/:id', showOrganizationDetailsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.get('/category/:id', showCategoryDetailsPage);

// POST routes
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm)
router.post('/new-project',projectValidation, processNewProjectForm);

// Routes to handle the assign categories to project form
router.get('/assign-categories/:id', showAssignCategoriesForm);
router.post('/assign-categories/:id', processAssignCategoriesForm);

// error handling routes
router.get('/test-error',showTestErrorPage);

export default router