import { getAllOrganizations } from '../models/organizations.js';
import { getAllProjects } from '../models/projects.js';

//Define controller function
const showProjectsPage = async (req, res) => {
    const projects = await getAllProjects();
    const organizations = await getAllOrganizations();
    const title = 'Service Projects';
    res.render('projects', { title, projects, organizations });
};

export {showProjectsPage};