import db from './db.js';

const getAllCategories = async () => {
    const query = `
    SELECT
    category_id, 
    category_name, 
    category_description 
    FROM public.categories`;

    const result = await db.query(query);

    return result.rows;
};

const getCategoryById = async (id) =>{
    const query =`
    SELECT
    category_id, 
    category_name, 
    category_description 
    FROM public.categories
    WHERE category_id = $1;`;

    const queryParams = [id]
    const result = await db.query(query, queryParams);
    
    //if the length of rows is greater than 0 return the first row, otherwise return null
      return result.rows.length > 0 ? result.rows[0] : null;
};

const getCategoriesByServiceProjectId = async(project_id) =>{
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

const assignCategoryToProject = async (projectId, categoryId) =>{
    const query = "INSERT INTO project_has_category (project_id, category_id) VALUES ($1, $2);";

    const queryParams = [projectId, categoryId];
    await db.query(query,queryParams);
}

const updateCategoryAssignments = async (projectId, categoryIds) =>{
    //remove all categories for this projectId
    const cleaningQuery = "DELETE FROM project_has_category WHERE project_id = $1";
    const cleaningQueryParams = [projectId];
    await db.query(cleaningQuery, cleaningQueryParams);

    //assign new categories
    categoryIds.forEach(id => {
        assignCategoryToProject(projectId, id);
    });
};

const createCategory = async (category_name, category_description)=> {
    const query = "INSERT INTO categories (category_id, category_name, category_description) VALUES (default, $1, $2) RETURNING category_id";
    const queryParams = [category_name, category_description];

    const result = await db.query(query,queryParams);
    return result.rows[0].category_id;
};

const updateCategory = async (category_id, category_name, category_description) =>{
    const query = "UPDATE categories SET category_name = $2, category_description = $3 WHERE category_id = $1";
    const queryParams = [category_id, category_name, category_description];

    await db.query(query,queryParams);
}


export { getAllCategories, getCategoryById, getCategoriesByServiceProjectId , updateCategoryAssignments, createCategory, updateCategory};
