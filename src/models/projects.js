import db from './db.js';

const getAllProjects = async () => {
    const query = `
        SELECT
            p.id,
            p.organization_id,
            o.name AS organization_name,
            p.title,
            p.description,
            p.location,
            p.project_date
        FROM public.projects AS p
        JOIN public.organizations AS o
            ON p.organization_id = o.id
        ORDER BY p.project_date;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllProjects };