# FightMaster Documentation

## Setup and Running

To avoid all the overhead of setting up a database locally, I use a docker container where
I deploy the DB. 
- First, clone the repository.
You should have npm or nvm(which includes npm), Docker and Docker Compose on your machine, and run the following command to setup the app:

`docker compose up db -d`

*The docker compose config file automatically takes the required env variables from the respective file in the
path `/env/db`.*

After you have deployed the db, I suggest you two options:

- Run the NestJS server on your local network interface. You just have to install
a global dependency

`npm install -g dotenv-cli`

to take the env variables of the server and then run 

`npm run start`
