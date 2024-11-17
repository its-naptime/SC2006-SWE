# KickStart 🏠

A comprehensive platform helping young families in Singapore make informed housing decisions by integrating HDB property searches with nearby educational institutions.

<p align="center">
    <a href="#features">Features</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#api-routes">API Routes</a> •
    <a href="#setup-instructions">Setup</a> •
    <a href="#key-components">Components</a> •
    <a href="#tech-stack">Tech Stack</a> •
</p>
## Features

- 🔍 Advanced Property Search
  - Filter HDBs by price, area, and location
  - View detailed property information
  - Integration with PropertyGuru listings

- 📚 Educational Institution Integration
  - Search nearby schools and preschools
  - View school information and programs
  - Filter by school types and CCAs

- 🗺️ Interactive Map Features
  - Property and school location visualization
  - Distance calculation
  - Nearby amenities display

- 👤 User Features
  - Secure authentication system
  - Save favorite properties
  - Personalized search history

## Project Structure
```
project_root/
├── backend/
│   ├── api/                 # API endpoint definitions
│   ├── backend/             # Core backend configuration
│   ├── catalogue/           # Property and school catalogues
│   ├── database/           # Database models and configurations
│   ├── search/             # Search functionality
│   ├── .env                # Environment variables
│   ├── Dockerfile          # Backend container configuration
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
├── frontend/
    ├── src/
    │   ├── app/            # Main application components
    │   ├── components/     # Reusable UI components
    │   │   ├── DetailContent.js
    │   │   ├── DetailModal.js
    │   │   ├── Filters.js
    │   │   ├── Form.js
    │   │   ├── Layout.js
    │   │   ├── LoadingIndicator.js
    │   │   ├── Map.js
    │   │   ├── ProtectedRoute.js
    │   │   └── SearchResults.js
    │   ├── fonts/          # Custom fonts
    │   └── public/         # Static assets
    ├── .next/              # Next.js build directory
    └── node_modules/       # JavaScript dependencies
```

## API Routes

### Authentication & User Management
```
POST    /api/user/register/                # User registration
POST    /api/token/                        # Obtain JWT token
POST    /api/token/refresh/                # Refresh JWT token
POST    /api/user/password-reset/          # Request password reset
POST    /api/user/password-reset-confirm/  # Confirm password reset
GET     /api/user/profile/                 # Get user profile
```

### Search
```
GET     /api/search/                       # General search functionality
GET     /api/search/nearby/                # Search nearby locations
```

### Database Operations
```
# HDB Data
GET     /api/hdb_data/                     # List all HDB data
GET     /api/hdb_data/<int:pk>/           # Get specific HDB details

# School Information
GET     /api/school_info/                  # List all school information
GET     /api/school_info/<int:pk>/        # Get specific school details

# School CCA
GET     /api/school_cca/                   # List all school CCAs
GET     /api/school_cca/<int:pk>/         # Get specific CCA details

# Preschool Information
GET     /api/preschool_centre/             # List all preschool centers
GET     /api/preschool_centre/<int:pk>/   # Get specific preschool details
GET     /api/preschool_charges/            # List all preschool charges
GET     /api/preschool_charges/<int:pk>/  # Get specific charge details
```

### System
```
GET     /api/health/                       # Health check endpoint
```

## Setup Instructions

### Prerequisites
- Node.js 20+
- Python 3.11+
- Docker and Docker Compose

### Backend Setup
1. Navigate to the backend directory:
```bash
cd backend
```

2. Create and activate a virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # For Unix
# or
.venv\Scripts\activate     # For Windows
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
Create a `.env` file in the backend directory with:
```env
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_password
GOOGLE_MAPS_API_KEY=your_api_key
```

5. Run migrations:
```bash
python manage.py migrate
```

### Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Docker Setup
Run the entire application using Docker:
```bash
docker compose up --build
```

## Key Components

### Frontend Components
- `DetailContent.js`: Property and school detailed information display
- `DetailModal.js`: Modal window for detailed views
- `Filters.js`: Search filter implementation
- `Map.js`: Google Maps integration
- `SearchResults.js`: Search results display
- `ProtectedRoute.js`: Authentication route protection

### Backend Modules
- `api/`: REST API endpoints
- `catalogue/`: Property and school data management
- `database/`: Data models and database operations
- `search/`: Search functionality and filters

## Tech Stack

### Frontend
- Next.js/React
- Tailwind CSS
- Google Maps API Integration

### Backend
- Django
- PostgreSQL
- REST Framework

### External APIs
- Google Maps API (for location services)
- PropertyGuru API (for property listings)
- Government Data APIs:
  - HDB Dataset
  - MOE School Directory
  - ECDA Preschool Directory
