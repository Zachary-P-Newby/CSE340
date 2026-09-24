import {getAllCategories, getCategoryById, getCategoriesByServiceProjectId, updateCategoryAssignments} from '../models/categories.js';
import { getProjectDetails, getProjectsByCategory } from '../models/projects.js';


//Define controller function
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const ID = req.params.id;
    
    const category = await getCategoryById(ID);

    if (category == null){
        return res.status(404).render('errors/404', {
    title: 'Page Not Found'
  });
    }else{

    const title = category.category_name;
    const projects = await getProjectsByCategory(ID);

    res.render('category', {title, category, projects});};
}


const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    
    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);


    const title = "Assign Cateogries to Project";

    res.render("assign-categories", {title, projectId, projectDetails, categories, assignedCategories: assignedCategories || []});
};


const processAssignCategoriesForm = async (req, res) => {
    // Extract form data from req.body
    const projectId = req.params.id;
    const selectedCategoryIds = req.body.categoryIds || [];
    const assignedCategories = await getCategoriesByServiceProjectId(projectId);

    const cateogryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];

    try {
        await updateCategoryAssignments(projectId, cateogryIdsArray, assignedCategories);
        req.flash('success', 'Cateogories assigned successfully');
        res.redirect(`/project/${projectId}`);
    }
    catch (error) {
        console.error('There was an error assigning categories.', error);
        req.flash('error', 'There was an error assigning categories.');
        res.redirect(`/project/${projectId}`);
    }
}

export {showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm};