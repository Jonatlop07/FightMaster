# FightMaster Documentation

## Setup and Running

To avoid all the overhead of setting up a database locally, I use a docker container where
I deploy the DB. 
- First, clone the repository.
You should have npm or nvm(which includes npm), Docker and Docker Compose on your machine, and run the following command to setup the app:

`docker compose up db -d`

*The docker compose config file automatically takes the required env variables from the respective file in the
path `<project-root>/env/db`.*

After you have deployed the db, I suggest you two options:

1) Deploy locally
   - Make sure you have the following dependency installed: `npm i -g @nestjs/cli
     `. Run the NestJS server on your local network interface. Install the dependency `npm install -g dotenv-cli` 
   to take the env 
   variables of the server (from the file `<project-root>/app/local.env`) and then run `npm run start`
   - From here, you can go to `http://localhost:3001/api` to check the documentation
   of the endpoints of the API.
1) Deploy in a Docker container
    - Run `docker compose up app`. The container will run in its network on the port 3001
   and expose it to the same port in localhost. Remember to check the
      API doc on `http://localhost:3001/api`.

The following is the EDR of the Database:

![edr](./assets/EDRFightMaster.png)

The script of the database can be found in the file `<project-root>/fight_master_db.sql`. 

## App Internal Architecture
