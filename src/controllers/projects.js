import { getAllOrganizations } from '../models/organizations.js';
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { formatDate } from '../utilities.mjs';


const NUMBER_OF_UPCOMING_PROJECTS = 5;



//Define controller function
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const organizations = await getAllOrganizations();
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects, organizations });
};

const showProjectDetailsPage = async (req, res) => {
    const ID = req.params.id;
    const projectDetails = await getProjectDetails(ID);
    const formattedDate = formatDate(projectDetails.project_date);
    const organizations = await getAllOrganizations();
    const title = projectDetails.title;
    res.render('project', { title, projectDetails, organizations, formattedDate });
};

export {showProjectsPage, showProjectDetailsPage};