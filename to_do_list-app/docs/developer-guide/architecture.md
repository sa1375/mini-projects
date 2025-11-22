# Application Architecture

## Overview
The To-Do List App follows a modern client-server architecture with a clear separation of concerns:

## Frontend Architecture
- **Framework**: React with Vite
- **State Management**: React Context API
- **UI Components**: Material-UI (MUI) + Tailwind CSS
- **HTTP Client**: Axios
- **Key Features**:
  - Component-based architecture
  - Responsive design
  - Token-based authentication handling
  - Real-time validation

## Backend Architecture
- **Framework**: Django + Django REST Framework
- **Authentication**: JWT (Simple JWT)
- **Database**: PostgreSQL
- **Key Features**:
  - RESTful API design
  - Token-based authentication
  - Database migrations
  - API versioning

## Data Flow
1. Client requests -> API Gateway
2. JWT Authentication
3. Backend Processing
4. Database Operations
5. Response Handling

## Security Measures
- JWT token encryption
- Password hashing
- CORS protection
- Environment variable protection