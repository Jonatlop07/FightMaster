BEGIN;

CREATE SCHEMA IF NOT EXISTS fight_master_db;
SET search_path TO fight_master_db;

CREATE TABLE IF NOT EXISTS fight_master_db.user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(125) NOT NULL,
    password TEXT NOT NULL,
    accessToken TEXT
);

CREATE TABLE IF NOT EXISTS fight_master_db.fighter (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    weightClass VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    team VARCHAR(255) NOT NULL,
    CONSTRAINT chk_weightClass CHECK (weightClass IN (
            'straw',
            'fly',
            'bantam',
            'feather',
            'light',
            'super light',
            'welter',
            'super welter',
            'middle',
            'super middle',
            'light heavy',
            'cruiser',
            'heavy',
            'super heavy'
        )
    )
);

CREATE TABLE IF NOT EXISTS fight_master_db.event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS fight_master_db.fight (
    id SERIAL PRIMARY KEY,
    eventId INT NOT NULL,
    fighter1Id INT NOT NULL,
    fighter2Id INT NOT NULL,
    winnerId INT,
    winMethod VARCHAR(255),
    FOREIGN KEY (eventId) REFERENCES fight_master_db.event (id),
    FOREIGN KEY (fighter1Id) REFERENCES fight_master_db.fighter (id),
    FOREIGN KEY (fighter2Id) REFERENCES fight_master_db.fighter (id),
    FOREIGN KEY (winnerId) REFERENCES fight_master_db.fighter (id),
    CONSTRAINT chk_winMethod CHECK (winMethod IN (
            'knockout',
            'techKnockout',
            'submission',
            'by decision'
        )
    )
);

CREATE TABLE IF NOT EXISTS fight_master_db.ranking (
    id SERIAL PRIMARY KEY,
    weightClass VARCHAR(255) NOT NULL,
    rank INT NOT NULL,
    fighterId INT NOT NULL,
    FOREIGN KEY (fighterId) REFERENCES fight_master_db.fighter (id),
    CONSTRAINT chk_weightClass CHECK (weightClass IN (
            'straw',
            'fly',
            'bantam',
            'feather',
            'light',
            'super light',
            'welter',
            'super welter',
            'middle',
            'super middle',
            'light heavy',
            'cruiser',
            'heavy',
            'super heavy'
        )
    )
);

COMMIT;
