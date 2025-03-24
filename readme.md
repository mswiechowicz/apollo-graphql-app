# Apollo GraphQL App with docker

## Rename .env file
``` mv ./backend/.env.example ./backend/.env ```

## Start project
``` docker compose up ```

### Frontend is on http://localhost or http://localhost:3000 (without nginx)
### Backend is on http://localhost:4000
### Adminer is on http://localhost:8080 (if enabled in docker-compose file)

___
### Clean all things on docker
``` docker compose down -v ```

### If you have backend error with sequelize (Can occur on win/linux)
``` rm ./backend/bun.lockb```


### Create user
```js
mutation Mutation($input: CreateUserInput) {
  createUser(input: $input) {
    id
    username
    password
    email
    privilege
    active
    createdAt
    updatedAt
  }
}

example variables:
{
  "input": {
    "email": "user@gmail.com",
    "password": "1234",
    "privilege": "user",
    "username": "user",
    "active": true
  }
}

```
### Login user
```js
mutation Mutation($input: LoginInput) {
  login(input: $input) {
    token
  }
}

{
  "input": {
    "email": "user@gmail.com",
    "password": "1234",
  }
}
```

### Example query

Add header `Authorization` with `Bearer {token}` given from login mutation


```js
query Query {
  users {
    id
    username
    password
    email
    privilege
    active
    createdAt
    updatedAt
  }
}
```

