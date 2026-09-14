import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT project_id, organization_id, title, description, location, project_date FROM public.projects
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };