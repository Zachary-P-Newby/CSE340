import db from './db.js';

const getAllCategories = async () => {
    const query = `
    SELECT
    category_id, 
    category_name, 
    description 
    FROM public.categories`;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (id) =>{
    const query =`
    SELECT
    category_id, 
    category_name, 
    description 
    FROM public.categories
    WHERE category_id = $1;`;

    const queryParams = [id]
    const result = await db.query(query, queryParams);
    
    //if the length of rows is greater than 0 return the first row, otherwise return null
      return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByProject = async(project_id) =>{
    const query =`
    SELECT 
    categories.category_id,
    categories.category_name
    
    FROM project_has_category
    INNER JOIN categories ON project_has_category.category_id = categories.category_id
    WHERE project_has_category.project_id = $1;
    `;

    const queryParams = [project_id]
    const result = await db.query(query, queryParams);
    

    return result.rows;
};




export { getAllCategories, getCategoryById, getCategoriesByProject};
