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

const createProject = async (title, description, location, project_date, organization_id) =>{
    const query =`
    INSERT INTO projects 
    (title, description, location, project_date, organization_id) VALUES
    ($1, $2, $3, $4, $5)
    returning project_id`;
    const queryParams = [title, description, location, project_date, parseInt(organization_id)];
    
    queryParams.forEach(param =>{
        console.log(param);
        console.log(Object.prototype.toString.call(param));
    });



    //returns the project ID
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
};


const updateProject = async (projectId, title, description, location, project_date, organization_id) => {
    const query = `
      UPDATE projects
      SET
      title = $2, description = $3, location = $4, project_date  = $5, organization_id = $6
      WHERE project_id = $1
      RETURNING project_id
    `;

    const queryParams = [projectId, title, description, location, project_date, organization_id];
    const result = await db.query(query, queryParams);

    if (result.rows.length === 0) {
        throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Updated project with ID:', projectId);
    }

    return result.rows[0].project_id;
};

// Export the model functions
export { getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails, getProjectsByCategory, createProject, updateProject};