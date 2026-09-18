import { getAllOrganizations, getOrganizationDetails } from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';

//Define controller function
const showOrganizationsPage = async (req, res)=>{
    const organizations = await getAllOrganizations();
    const title = 'Our Partner Organizations';
    res.render('organizations', { title, organizations });
}

const showOrganizationDetailsPage = async (req, res) => {
    const organizationId = req.params.id;

    const organizationDetails = await getOrganizationDetails(organizationId);
    const projects = await getProjectsByOrganizationId(organizationId);
    const title = 'Organization Details';

    //if the organization does not exist the getOrganizationDetails will return 'null'
    //if so, do nothing to trigger 404 error
    if (organizationDetails == null){
        res.render('./errors/404', {title});
    }
    else{
        res.render('organization', {title, organizationDetails, projects});
    }

    
};

// Export any controller functions
export { showOrganizationsPage, showOrganizationDetailsPage };