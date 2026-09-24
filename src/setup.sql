DROP TABLE project_has_category;
DROP TABLE categories;
DROP TABLE projects;
DROP TABLE organizations;


create table organizations (
organization_id SERIAL PRIMARY KEY,
organization_name VARCHAR(150) UNIQUE NOT NULL,
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
	organization_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    project_date DATE NOT NULL,

	CONSTRAINT project_organizer
	FOREIGN KEY (organization_id) REFERENCES organizations(organization_id)
);


CREATE TABLE project_has_category(
project_id INT NOT NULL,
category_id INT NOT NULL,
FOREIGN KEY (project_id) REFERENCES projects(project_id),
FOREIGN KEY (category_id) REFERENCES categories(category_id),
CONSTRAINT project_category_pk PRIMARY KEY (project_id, category_id)
);

INSERT INTO organizations (organization_name, description, contact_email, logo_filename)
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
    title,
    description,
    location,
    project_date
)
    VALUES
        (
            1,
            'School Supply Drive',
            'Collect and distribute school supplies to local students.',
            'Central Community Center',
            DATE '2026-09-20'
        ),
        (
			1,
            'Youth Skills Workshop',
            'Teach practical skills and career preparation to young people.',
            'BrightFuture Learning Hub',
            DATE '2026-10-04'
        ),
        (
			1,
            'Park Equipment Repair',
            'Repair benches, signs, and playground equipment in the park.',
            'Riverside Park',
            DATE '2026-10-18'
        ),
        (
            1,
            'Senior Home Repairs',
            'Complete minor repairs and safety improvements for seniors.',
            'Northside Neighborhood',
            DATE '2026-11-01'
        ),
        (
            1,
            'Winter Shelter Support',
            'Prepare supplies and facilities for the winter shelter program.',
            'Hope Street Shelter',
            DATE '2026-11-15'
        ),
        (
            2,
            'Community Garden Setup',
            'Prepare garden beds and plant vegetables for the community.',
            'Westside Community Garden',
            DATE '2026-09-27'
        ),
        (
            2,
            'Food Bank Harvest',
            'Harvest and deliver fresh produce to the local food bank.',
            'GreenHarvest Farm',
            DATE '2026-10-11'
        ),
        (
            2,
            'Compost Workshop',
            'Teach residents how to create and maintain home compost systems.',
            'Maple Recreation Center',
            DATE '2026-10-25'
        ),
        (
            2,
            'Tree Planting Day',
            'Plant native trees to improve shade and local biodiversity.',
            'Eastview Park',
            DATE '2026-11-08'
        ),
        (
            2,
            'Harvest Celebration',
            'Celebrate the growing season with food, education, and activities.',
            'Farmers Market Plaza',
            DATE '2026-11-22'
        ),
        (
            3,
            'Neighborhood Cleanup',
            'Remove litter and improve public spaces across the neighborhood.',
            'Oak Street District',
            DATE '2026-09-21'
        ),
        (
            3,
            'Meal Service Project',
            'Prepare and serve meals for families in need.',
            'UnityServe Kitchen',
            DATE '2026-10-05'
        ),
        (
            3,
            'Clothing Donation Drive',
            'Collect and organize clothing donations for local families.',
            'UnityServe Community Hall',
            DATE '2026-10-19'
        ),
        (
            3,
            'Blood Donation Event',
            'Coordinate a community blood donation event with local clinics.',
            'UnityServe Community Hall',
            DATE '2026-11-02'
        ),
        (
            3,
            'Holiday Gift Program',
            'Collect and distribute holiday gifts to children in need.',
            'Downtown Service Center',
            DATE '2026-12-06'
        );

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

