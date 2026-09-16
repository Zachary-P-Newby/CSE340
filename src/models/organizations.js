import db from './db.js'

const getAllOrganizations = async() => {
    const query = `
        SELECT
        organization_id,
        organization_name,
        description,
        contact_email,
        logo_filename
      FROM public.organizations;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getOrganizationDetails = async (organizationId) => {
      const query = `
      SELECT
        organization_id,
        organization_name,
        description,
        contact_email,
        logo_filename
      FROM public.organizations
      WHERE organization_id = $1;
    `;

      const queryParams = [organizationId];
      //the queryParams will be passed in at $1 once it parameterizes the organizationID
      const result = await db.query(query, queryParams);

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

// Export the model functions
export { getAllOrganizations, getOrganizationDetails };