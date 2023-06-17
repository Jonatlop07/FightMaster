CREATE SCHEMA IF NOT EXISTS fight_master_db;
SET search_path TO fight_master_db;

CREATE TABLE IF NOT EXISTS fight_master_db.user
(
    id		                    UUID PRIMARY KEY NOT NULL,
    email	                    VARCHAR(125) NOT NULL,
    password                    TEXT NOT NULL,
    access_token                TEXT
);
