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
import { 
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  requireLogin,
  showDashboard,
  requireRole,
  showRegisteredUsers } from './controllers/users.js';

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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.get('/organization/:id', showOrganizationDetailsPage);
// POST routes
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm)

//projects
//GET routes
router.get('/projects',showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
// POST routes
router.post('/new-project',requireRole('admin'), projectValidation, processNewProjectForm);
router.post('/edit-project/:id',requireRole('admin'), projectValidation, processEditProjectForm);

//categories
//GET routes
router.get('/categories',showCategoriesPage);
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/new-category', requireRole('admin'), showCreateCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);

// POST routes
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

//user registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

//user login routes
router.get('/login', showLoginForm);
router.post('/login',processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

//registered-users
router.get("/registered-users", requireRole('admin'),showRegisteredUsers);

// error handling routes
router.get('/test-error',showTestErrorPage);

export default router