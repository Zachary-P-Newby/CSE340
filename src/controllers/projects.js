import { createProject, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByServiceProjectId } from '../models/categories.js';
import { getAllOrganizations} from '../models/organizations.js';
import { formatDate } from '../utilities.mjs';
import {body, validationResult} from 'express-validator';



const NUMBER_OF_UPCOMING_PROJECTS = 5;


const projectValidation = [

    body('title')
        .trim()
        .notEmpty()
        .withMessage('Project Title Required')
        .isLength({min:5, max:200})
        .withMessage("Title must be between 5 and 200 characters long."),

    body('description')
        .trim()
        .notEmpty()
        .withMessage("A description is required")
        .isLength({min:1, max:1000})
        .withMessage("Description must be between 1 and 1,000 characters long.")
        ,
    body('location')
        .trim()
        .notEmpty()
        .withMessage(`A location must be provided, if not done in person, "remote" or "online" will suffice.`)
        .isLength({min:10, max:200})
        .withMessage("Location must be between 10 and 200 characters long."),
    body('date')
        .notEmpty()
        .withMessage('A date for the project is required')
        .isISO8601()
        .withMessage('Date must be a valid date format'),
    body("organization_id")
        .notEmpty()
        .withMessage('An organizer for the project is required')
        .isInt()
        .withMessage("A valid organization id is rquired")
];



//Define controller function
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    projects.forEach(project => {
        project.project_date = formatDate(project.project_date);
    });
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects});
};

const showProjectDetailsPage = async (req, res) => {
    const ID = req.params.id;
    const projectDetails = await getProjectDetails(ID);

    if (projectDetails == null){
        return res.status(404).render('errors/404', {
    title: 'Page Not Found'
  });
    }else{
        const formattedDate = formatDate(projectDetails.project_date);
    const organizations = await getAllOrganizations();
    const title = projectDetails.title;
    const categories = await getCategoriesByServiceProjectId(ID);
    res.render('project', { title, projectDetails, organizations, formattedDate, categories });
    }

    
};


const showNewProjectForm = async (req, res) => {

    const organizations = await getAllOrganizations();
    const title = 'Create New Project'
    res.render('new-project', {title, organizations});
};

const processNewProjectForm = async (req, res) => {
    
    //if errors are found in the validation results
    const results = validationResult(req);
    if (results.isEmpty() == false) {
        // Validation failed - loop through errors
        results.array().forEach((error) => {
            req.flash('error', error.msg);
        });
    
        // Redirect back to the new projectform
        return res.redirect('/new-project');
    }
    else{
        // Extract form data from req.body
        const {title, description, location, date, organization_id} = req.body;

        try {
            await createProject(title, description, location, date, organization_id);
            req.flash('success', 'Project created successfully');
            res.redirect(`/projects`);
        }
        catch (error) {
            console.error('Error creating new project:', error);
            req.flash('error', 'There was an error creating the service project.');
            res.redirect('/new-project');
        }
    }

};

export {showProjectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation};