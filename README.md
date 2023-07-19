# CRUD APP Submission
## Running
In your linux terminal run this from the base project directory:

    docker-compose up -d


[Crud App Client](http://localhost:3000/)
Then Ctrl+Click the link above:

## Configuration
This application runs on the following ports by default:
```Client: 3000          Server: 8080          Database: 5432```

To Change these defaults, edit the docker-compose.yaml file as needed.

All containers remove themselves by default.
If you want to data to be persistant, remove the #s below in docker-compose.yaml
```# volumes:```
```#   - ./my_data_directory:/var/lib/postgresql/data```

Note: If you store this data a folder will be created in the project directory.
it can only be deleted with superuser privleges.

    sudo rm -r my_data_directory

## Seeded Data
This app is seeded with some grocery store data.
We have the following inventory managers:

Emily Johnson: Grocery Department
```username: manager1```
```password: password```

Benjamin Thompson: Produce Department
```username: manager2```
```password: password```

Sophia Roberts: Dairy Department
```username: manager3```
```password: password```

Ethan Anderson: Bakery Department
```username: manager4```
```password: password```

# Enjoy
