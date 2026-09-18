import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.projects;
    `;

    const result = await db.query(query);

    return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
            project_id,
            organization_id,
            title,
            description,
            location,
            project_date
        FROM public.projects
        WHERE organization_id = $1
        ORDER BY project_date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (numberOfprojects) => {

    const query = `SELECT
    p.project_id,
    p.title,
    p.description,
    p.project_date,
    p.location,
    p.organization_id,
    o.organization_name AS organization_name
    FROM projects p
    JOIN organizations o
    ON p.organization_id = o.organization_id
    WHERE p.project_date >= CURRENT_DATE
    ORDER BY p.project_date 
    ASC LIMIT $1;`;

    const queryParams = [numberOfprojects];
    const result = await db.query(query, queryParams);

    return result.rows;
};

const getProjectDetails = async (id) => {
    const query = `
        SELECT
            p.project_id,
            p.title,
            p.description,
            p.project_date,
            p.location,
            p.organization_id,
            o.organization_name AS organization_name
            FROM projects p
            JOIN organizations o
            ON p.organization_id = o.organization_id
            WHERE p.project_id = $1`;
      
    const queryParams = [id];
    const result = await db.query(query, queryParams);
    
    //if the length of rows is greater than 0 return the first row, otherwise return null
      return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategory = async(category_id) =>{
    const query =`
    SELECT 
    p.project_id,
    p.title
    
    
    FROM project_has_category phc
    INNER JOIN projects p
    ON phc.project_id = p.project_id
    WHERE phc.category_id = $1;
    `;

    const queryParams = [category_id]
    const result = await db.query(query, queryParams);
    return result.rows;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategory};