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
  projectValidation,
  showEditProjectForm,
  processEditProjectForm } from "./controllers/projects.js";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showCreateCategoryForm,
  showEditCategoryForm,
  processNewCategoryForm,
  processEditCategoryForm,
  categoryValidation } from "./controllers/categories.js";
import { showTestErrorPage } from "./controllers/errors.js";

const router = express.Router();

/**
  * Routes
  * define a route handler for GET requests to root URL ("/")
  * req = requests to app
  * res = responses to requests
  */

//ROUTES
//home
router.get('/',showHomePage);


//organization routes
//GET routes
router.get('/organizations',showOrganizationsPage);
router.get('/new-organization', showNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);
// POST routes
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm)

//projects
//GET routes
router.get('/projects',showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', showNewProjectForm);
router.get('/edit-project/:id', showEditProjectForm);
// POST routes
router.post('/new-project',projectValidation, processNewProjectForm);
router.post('/edit-project/:id',projectValidation, processEditProjectForm);

//categories
//GET routes
router.get('/categories',showCategoriesPage);
router.get('/assign-categories/:id', showAssignCategoriesForm);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', showCreateCategoryForm);
router.get('/edit-category/:id', showEditCategoryForm);

// POST routes
router.post('/assign-categories/:id', processAssignCategoriesForm);
router.post('/new-category', categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', categoryValidation, processEditCategoryForm);

// Routes to handle the assign categories to project form


// error handling routes
router.get('/test-error',showTestErrorPage);

export default router