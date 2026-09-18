import {getAllCategories, getCategoryById, getCategoriesByProject} from '../models/categories.js';
import { getProjectsByCategory } from '../models/projects.js';


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
        const title = 'Page Not Found';
        res.render('./errors/404', {title});
    }else{

    const title = category.category_name;
    const projects = await getProjectsByCategory(ID);

    res.render('category', {title, category, projects});};
}

export {showCategoriesPage, showCategoryDetailsPage};