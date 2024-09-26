# SC2006

This application allows users to search for properties based on schools in the locality, mainly for couples and family planners.

## Project Structure

```
project_root/
├── backend/
│   └── requirements.txt
├── frontend/
├── .env
└── docker-compose.yml
```

## Prerequisites

- Docker and Docker Compose
- Git

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create a `.env` file in the project root with the following content:
   ```
   DB_NAME=your_project_db_name
   DB_USER=your_db_username
   DB_PASSWORD=your_secure_password
   DB_HOST=db
   DB_PORT=5432
   ```
   Replace the placeholders with your actual database credentials.

3. Build and start the Docker containers:
   ```bash
   docker compose up --build -d
   ```

4. Once the containers are running, apply database migrations:
   ```bash
   docker compose exec backend python manage.py migrate
   ```

5. Create a superuser for the Django admin:
   ```bash
   docker compose exec backend python manage.py createsuperuser
   ```
   Follow the prompts to create the superuser.

## Running the Application

- The backend API will be available at `http://localhost:8000`
- The Django admin interface will be at `http://localhost:8000/admin`
- The frontend will be available at `http://localhost:3000` 

## Development Workflow

### For most code changes:
Your changes will be reflected immediately. The Django development server will auto-reload.

### If you've changed your Dockerfile, requirements.txt, or docker-compose.yml:
```bash
docker compose up --build -d
```

### If you've made model changes:
```bash
docker compose exec backend python manage.py makemigrations
docker compose exec backend python manage.py migrate
```

### If you've changed environment variables:
```bash
docker compose down
docker compose up
```
