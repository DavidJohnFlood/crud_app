# CRUD APP Submission
## Running
In your linux terminal run the following from the base project directory:

    docker-compose up

[Crud App Client](http://localhost:3000/)\
Then Ctrl+Click the link above:

## Running without docker-compose

Start a Postgres Container with an 'inventory' database.

    docker run --rm -e POSTGRES_PASSWORD=password -e POSTGRES_DB=inventory -it -p 5432:5432 postgres

From the ./server directory, install dependencies and use ```npm run seedStart``` to migrate and seed the database and start the server.

    npm install
    npm run seedStart

From the ./client directory, install dependencies and use ```npm start``` to start the client.

    npm install
    npm start

[Crud App Client](http://localhost:3000/)\
Then Ctrl+Click the link above:

## Configuration
This application runs on the following ports by default:\
```Client: 3000          Server: 8080          Database: 5432```

## Seeded Data
Database restores and seeds on startup with some grocery store data.

We have the following inventory managers:

Emily Johnson: Grocery Department\
```username: manager1```\
```password: password```\
Benjamin Thompson: Produce Department\
```username: manager2```\
```password: password```\
Sophia Roberts: Dairy Department\
```username: manager3```\
```password: password```\
Ethan Anderson: Bakery Department\
```username: manager4```\
```password: password```
# Enjoy