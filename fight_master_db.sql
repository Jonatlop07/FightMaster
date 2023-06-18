BEGIN;

CREATE SCHEMA IF NOT EXISTS fight_master_db;
SET search_path TO fight_master_db;

CREATE TABLE IF NOT EXISTS fight_master_db.user (
    id SERIAL PRIMARY KEY,
    email VARCHAR(125) NOT NULL,
    password TEXT NOT NULL,
    accessToken TEXT
);

CREATE TABLE IF NOT EXISTS fight_master_db.fighterStats (
    id SERIAL PRIMARY KEY,
    wins INT CHECK (wins >= 0),
    losses INT CHECK (losses >= 0),
    knockouts INT CHECK (knockouts >= 0),
    submissions INT CHECK (submissions >= 0)
);

CREATE TABLE IF NOT EXISTS fight_master_db.fighter (
    id SERIAL PRIMARY KEY,
    fighterStatsId INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    weightClass VARCHAR(255) NOT NULL,
    nationality VARCHAR(255) NOT NULL,
    team VARCHAR(255) NOT NULL,
    FOREIGN KEY (fighterStatsId) REFERENCES fight_master_db.fighterStats (id)
);

CREATE TABLE IF NOT EXISTS fight_master_db.event (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    date DATE
);

CREATE TABLE IF NOT EXISTS fight_master_db.fight (
    id SERIAL PRIMARY KEY,
    eventId INT,
    fighter1Id INT,
    fighter2Id INT,
    winnerId INT,
    FOREIGN KEY (eventId) REFERENCES fight_master_db.event (id),
    FOREIGN KEY (fighter1Id) REFERENCES fight_master_db.fighter (id),
    FOREIGN KEY (fighter2Id) REFERENCES fight_master_db.fighter (id),
    FOREIGN KEY (winnerId) REFERENCES fight_master_db.fighter (id)
);

CREATE TABLE IF NOT EXISTS fight_master_db.ranking (
    id SERIAL PRIMARY KEY,
    weightClass VARCHAR(255),
    rank INT,
    fighterId INT,
    FOREIGN KEY (fighterId) REFERENCES fight_master_db.fighter (id)
);

COMMIT;
