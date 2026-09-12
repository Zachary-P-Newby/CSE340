create table organizations (
id SERIAL PRIMARY KEY,
name VARCHAR(150) UNIQUE NOT NULL,
description text NOT NULL,
contact_email VARCHAR(255) NOT NULL,
logo_filename VARCHAR(255) NOT NULL
);



CREATE TABLE categories (
category_id SERIAL PRIMARY KEY,
category_name VARCHAR(30) UNIQUE NOT NULL,
description text NOT NULL
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organizations(id),
	organization_name VARCHAR(150) NOT NULL REFERENCES organizations(name),
    title VARCHAR(25) NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    project_date DATE NOT NULL
);


CREATE TABLE project_has_category(
project_id INT REFERENCES projects(project_id) NOT NULL,
category_id INT REFERENCES categories(category_id) NOT NULL,
CONSTRAINT project_category_pk PRIMARY KEY (project_id, category_id)
);

INSERT INTO organizations (name, description, contact_email, logo_filename)
VALUES 
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.','contact@greenharvest.org','greenharvest-logo.png'),
('UnityServe Volunteers',  'A volunteer coordination group supporting local charities and service initiatives.','hello@unityserve.org','unityserve-logo.png');


INSERT INTO categories (category_name, description)
VALUES
('Donation Drive','Collect charity donations and give them to the needy.'),
('Education','Educational opportunities and teaching people practical skills.'),
('Maintenance', 'Cleaning, Repair, or Organization'),
('Construction and Assembly','Building structures or assembling objects.'),
('Fundraiser', 'Raise funds to donate to a cause.'),
('Gardening and Agricultural', 'Service projects that involve yards, gardens, and farms.'),
('Food Preperation and Service', 'Cooking and serving food to the needy.');

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

INSERT INTO project_has_category (project_id, category_id)
VALUES
(1,1),
(2,2),
(3,3),
(3,4),
(4,3),
(4,4),
(5,1),
(5,2),
(5,5),
(6,4),
(7,6),
(8,2),
(8,6),
(9,6),
(10,5),
(10,6),
(11,3),
(11,6),
(12,7),
(13,1),
(14,1),
(15,1);

