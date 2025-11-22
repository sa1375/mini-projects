# Online Course Platform (Microservices Architecture)

## Project Goals

- Build a scalable and maintainable online course sales platform.
- Use microservices architecture for flexibility and future growth.
- Ensure the project is production-ready, testable, and easy to deploy.

## Team Members

1. Saeed – Full-stack developer focused on backend (Django + Postgres) and API design.
2. Amin – Frontend specialist focused on Next.js, Tailwind, and dynamic UI pages.
3. Nima – DevOps and QA; managed CI/CD, Docker, unit testing, and code reviews.

## Services (Preliminary List)

- **Backend:** Django + DRF for API implementation.
- **Frontend:** Next.js (React) for the user interface.
- **Database:** PostgreSQL in a separate container.
- **Reverse Proxy:** NGINX (to be added).

## Directory Structure

```
online-course-platform/
├── docker-compose.yml
├── README.md
│
├── backend/      # Django backend
│   └── Dockerfile
│
├── frontend/     # Next.js frontend
│   └── Dockerfile
│
├── nginx/        # Reverse proxy (future)
│   └── nginx.conf
│
└── db/           # DB volume and init scripts
    └── init.sql
```

## Prestart with Docker

To start the project for development:

```bash
docker-compose up --build
```
