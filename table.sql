CREATE TABLE entity (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name_entity VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE user (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE user_entity (
    id_user BIGINT NOT NULL,
    id_entity BIGINT NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_user, id_entity),
    FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (id_entity) REFERENCES entity(id) ON DELETE CASCADE
);


-- Entités (par ex. départements ou projets)
INSERT INTO entity (name_entity, description) VALUES
('Ressources Humaines', 'Gère le recrutement, la formation et la gestion du personnel'),
('Informatique', 'Département responsable des systèmes et du développement logiciel'),
('Marketing', 'Équipe en charge de la communication et de la stratégie de marque'),
('Finance', 'S’occupe de la comptabilité et du contrôle budgétaire'),
('Projet ManaTalent', 'Application interne pour la gestion des talents');

-- Utilisateurs
INSERT INTO user (username, email, password) VALUES
('jdoe', 'jdoe@example.com', 'hashed_password_123'),
('asmith', 'asmith@example.com', 'hashed_password_456'),
('mdupont', 'mdupont@example.com', 'hashed_password_789'),
('lrami', 'lrami@example.com', 'hashed_password_abc'),
('nking', 'nking@example.com', 'hashed_password_xyz');

-- Assignations utilisateur <-> entité
INSERT INTO user_entity (id_user, id_entity) VALUES
(1, 2), -- John Doe -> Informatique
(1, 5), -- John Doe -> Projet ManaTalent
(2, 1), -- Alice Smith -> Ressources Humaines
(3, 3), -- Marie Dupont -> Marketing
(4, 4), -- Luc Rami -> Finance
(5, 2), -- Nathan King -> Informatique
(5, 5); -- Nathan King -> Projet ManaTalent


