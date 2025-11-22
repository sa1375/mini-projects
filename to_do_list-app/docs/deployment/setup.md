# Deployment Guide

## Production Requirements
- Linux server (Ubuntu 20.04+ recommended)
- PostgreSQL 13+
- Python 3.11+
- Node.js 18+
- Nginx
- SSL certificate

## Environment Setup
1. System Updates
```bash
sudo apt update && sudo apt upgrade
```
2.Install Dependencies
```bash
sudo apt install python3-pip nodejs npm postgresql nginx
```
3.Database Setup
```bash
sudo -u postgres createdb todolist_db
```

## Backend Deployment
1. Clone repository
2. Set up virtual environment
3. Install requirements
4. Configure environment variables
5. Run migrations
6. Set up Gunicorn
7. Configure Nginx

## Frontend Deployment
1. nstall dependencies
2. Build production bundle
3. Configure Nginx for static files

## SSL Configuration
1. Install Certbot
2. Obtain SSL certificate
3. Configure Nginx for HTTPS

