create table organizations (
organization_id SERIAL PRIMARY KEY,
organization_name VARCHAR(150) NOT NULL,
organization_description text NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
)