create table organizations (
id SERIAL PRIMARY KEY,
name VARCHAR(150) UNIQUE NOT NULL,
description text NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers',  'A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id),
	organization_name VARCHAR(150) NOT NULL REFERENCES organizations(name),
    title VARCHAR(25) NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    project_date DATE NOT NULL
);

INSERT INTO projects (
    organization_id,
    organization_name,
    title,
    description,
    location,
    project_date
)
SELECT
    o.id,
    p.organization_name,
    p.title,
    p.description,
    p.location,
    p.project_date
FROM (
    VALUES
        (
            'BrightFuture Builders',
            'School Supply Drive',
            'Collect and distribute school supplies to local students.',
            'Central Community Center',
            DATE '2026-09-20'
        ),
        (
            'BrightFuture Builders',
            'Youth Skills Workshop',
            'Teach practical skills and career preparation to young people.',
            'BrightFuture Learning Hub',
            DATE '2026-10-04'
        ),
        (
            'BrightFuture Builders',
            'Park Equipment Repair',
            'Repair benches, signs, and playground equipment in the park.',
            'Riverside Park',
            DATE '2026-10-18'
        ),
        (
            'BrightFuture Builders',
            'Senior Home Repairs',
            'Complete minor repairs and safety improvements for seniors.',
            'Northside Neighborhood',
            DATE '2026-11-01'
        ),
        (
            'BrightFuture Builders',
            'Winter Shelter Support',
            'Prepare supplies and facilities for the winter shelter program.',
            'Hope Street Shelter',
            DATE '2026-11-15'
        ),
        (
            'GreenHarvest Growers',
            'Community Garden Setup',
            'Prepare garden beds and plant vegetables for the community.',
            'Westside Community Garden',
            DATE '2026-09-27'
        ),
        (
            'GreenHarvest Growers',
            'Food Bank Harvest',
            'Harvest and deliver fresh produce to the local food bank.',
            'GreenHarvest Farm',
            DATE '2026-10-11'
        ),
        (
            'GreenHarvest Growers',
            'Compost Workshop',
            'Teach residents how to create and maintain home compost systems.',
            'Maple Recreation Center',
            DATE '2026-10-25'
        ),
        (
            'GreenHarvest Growers',
            'Tree Planting Day',
            'Plant native trees to improve shade and local biodiversity.',
            'Eastview Park',
            DATE '2026-11-08'
        ),
        (
            'GreenHarvest Growers',
            'Harvest Celebration',
            'Celebrate the growing season with food, education, and activities.',
            'Farmers Market Plaza',
            DATE '2026-11-22'
        ),
        (
            'UnityServe Volunteers',
            'Neighborhood Cleanup',
            'Remove litter and improve public spaces across the neighborhood.',
            'Oak Street District',
            DATE '2026-09-21'
        ),
        (
            'UnityServe Volunteers',
            'Meal Service Project',
            'Prepare and serve meals for families in need.',
            'UnityServe Kitchen',
            DATE '2026-10-05'
        ),
        (
            'UnityServe Volunteers',
            'Clothing Donation Drive',
            'Collect and organize clothing donations for local families.',
            'UnityServe Community Hall',
            DATE '2026-10-19'
        ),
        (
            'UnityServe Volunteers',
            'Blood Donation Event',
            'Coordinate a community blood donation event with local clinics.',
            'UnityServe Community Hall',
            DATE '2026-11-02'
        ),
        (
            'UnityServe Volunteers',
            'Holiday Gift Program',
            'Collect and distribute holiday gifts to children in need.',
            'Downtown Service Center',
            DATE '2026-12-06'
        )
) AS p(
    organization_name,
    title,
    description,
    location,
    project_date
)
JOIN organizations AS o
    ON o.name = p.organization_name;