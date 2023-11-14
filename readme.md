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
