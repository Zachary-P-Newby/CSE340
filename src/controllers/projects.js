import { getAllOrganizations } from '../models/organizations.js';
import { getAllProjects, getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import { getCategoriesByProject } from '../models/categories.js';
import { formatDate } from '../utilities.mjs';


const NUMBER_OF_UPCOMING_PROJECTS = 5;



//Define controller function
const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    projects.forEach(project => {
        project.project_date = formatDate(project.project_date);
    });
    const organizations = await getAllOrganizations();
    const title = 'Upcoming Service Projects';
    res.render('projects', { title, projects, organizations });
};

const showProjectDetailsPage = async (req, res) => {
    const ID = req.params.id;
    const projectDetails = await getProjectDetails(ID);

    if (projectDetails == null){
        const title = 'Page Not Found';
        res.render('./errors/404', {title});
    }else{
        const formattedDate = formatDate(projectDetails.project_date);
    const organizations = await getAllOrganizations();
    const title = projectDetails.title;
    const categories = await getCategoriesByProject(ID);
    res.render('project', { title, projectDetails, organizations, formattedDate, categories });
    }

    
};

export {showProjectsPage, showProjectDetailsPage};