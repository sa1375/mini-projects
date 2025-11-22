# API Reference

## Authentication Endpoints

### POST /api/auth/login/
Login endpoint to obtain JWT tokens.
```json
{
    "username": "string",
    "password": "string"
}

### POST /api/auth/refresh/
Refresh JWT token endpoint.
{
    "refresh": "string"
}
## Task Endpoints

### GET /api/tasks/
Get all tasks for authenticated user.

### POST /api/tasks/
Create a new task.

{
    "title": "string",
    "description": "string",
    "due_date": "datetime",
    "priority": "enum(HIGH,MEDIUM,LOW)",
    "completed": "boolean"
}

### PUT /api/tasks/{id}/
Update existing task.

### DELETE /api/tasks/{id}/
Delete task.
```