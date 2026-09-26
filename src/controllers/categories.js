import {getAllCategories, getCategoryById, getCategoriesByServiceProjectId, updateCategoryAssignments, createCategory, updateCategory} from '../models/categories.js';
import { getProjectDetails, getProjectsByCategory } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

const categoryValidation = [
    body('category_name')
        .trim()
        .notEmpty()
        .withMessage('Category name is required')
        .isLength({ min: 3, max: 100 })
        .withMessage('Category name must be between 3 and 100 characters'),
    body('category_description')
        .trim()
        .notEmpty()
        .withMessage('Category description is required')
        .isLength({ min: 3, max: 1000 })
        .withMessage('Category description must be between 3 and 1000 characters'),
];


//Define controller function
const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const category_id = req.params.id;
    
    const category = await getCategoryById(category_id);

    if (category == null){
        return res.status(404).render('errors/404', {
    title: 'Page Not Found'
  });
    }else{

    const title = category.category_name;
    const projects = await getProjectsByCategory(category_id);

    res.render('category', {title, category, projects, category_id});};
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
        req.flash('success', 'Categories assigned successfully');
        res.redirect(`/project/${projectId}`);
    }
    catch (error) {
        console.error('There was an error assigning categories.', error);
        req.flash('error', 'There was an error assigning categories.');
        res.redirect(`/project/${projectId}`);
    }
}

const showCreateCategoryForm = async (req, res) => {
    const title = 'Add New Category';

    res.render('new-category', { title });
}

const showEditCategoryForm = async (req, res) => {
    const title = 'Edit Category';
    const category_id = req.params.id;
    const category = await getCategoryById(category_id);
    res.render('edit-category', { title, category_id, category});
}

const processNewCategoryForm = async (req, res) => {
    const results = validationResult(req);
    if (results.isEmpty() == false){
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });

        return res.redirect("/new-category");
    }
    
    // Extract form data from req.body
    const category_name = req.body.category_name;
    const category_description = req.body.category_description;

    try {
        const category_id = await createCategory(category_name, category_description);
        req.flash("success", "Category successfully created");
        res.redirect(`/category/${category_id}`)
    }
    catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error',"There was an error creating a new category.");
        res.redirect("/new-category");
    }
}


const processEditCategoryForm = async (req, res) => {
    // Extract form data from req.body
    const results = validationResult(req);
    if (results.isEmpty() == false){
        results.array().forEach((error) => {
            req.flash("error", error.msg);
        });

        return res.redirect("/edit-category");
    }
    
    const category_id = req.params.id;

    // Extract form data from req.body
    const category_name = req.body.category_name;
    const category_description = req.body.category_description;

    try {
        await updateCategory(category_id,category_name, category_description);
        req.flash("success", "Category successfully edited.");
        res.redirect(`/category/${category_id}`);
    }
    catch (error) {
        console.error('Error creating new category:', error);
        req.flash('error',"There was an error creating a new category.");
        res.redirect(`/edit-category/${category_id}`);
    }
}

export {showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showCreateCategoryForm, showEditCategoryForm, processNewCategoryForm, processEditCategoryForm, categoryValidation};