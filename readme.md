# Assessment Platform DB

The database layer for an assessment platform: PostgreSQL, MongoDB and Redis, run together with Docker Compose.

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)

## Overview

This repo holds only infrastructure. A single `docker-compose.yml` starts the three datastores a backend needs on one shared bridge network. Each one has a persistent volume, a health check and a small init script.

## Features

- **PostgreSQL 15 (Alpine)**: runs `postgres/init.sql` on first start. The script enables the `uuid-ossp` extension and creates a `health_check` table.
- **MongoDB 7**: runs `mongo/init.js` on first start. The script creates a `health_check` collection and inserts one status document.
- **Redis 7 (Alpine)**: password-protected, with AOF persistence (`--appendonly yes`).
- Named volumes (`postgres_data`, `mongo_data`, `redis_data`), so data survives container restarts.
- Health checks: `pg_isready` for Postgres, `mongosh` ping for Mongo, `redis-cli ping` for Redis.
- `restart: always` on every service.

## Tech Stack

| Service | Image | Container | Port |
|---------|-------|-----------|------|
| PostgreSQL | `postgres:15-alpine` | `postgres_db` | 5432 |
| MongoDB | `mongo:7` | `mongo_db` | 27017 |
| Redis | `redis:7-alpine` | `redis_cache` | 6379 |

## Project Structure

```
.
├── docker-compose.yml   # All three services, volumes and the db_network bridge
├── postgres/
│   └── init.sql         # uuid-ossp extension + health_check table
└── mongo/
    └── init.js          # health_check collection + seed document
```

## Getting Started

### Prerequisites

- Docker with the Docker Compose plugin

### Environment Variables

Create a `.env` file next to `docker-compose.yml` that sets these variables:

| Variable | Used by |
|----------|---------|
| `POSTGRES_USER` | PostgreSQL |
| `POSTGRES_PASSWORD` | PostgreSQL |
| `POSTGRES_DB` | PostgreSQL |
| `MONGO_USER` | MongoDB root user |
| `MONGO_PASSWORD` | MongoDB root password |
| `MONGO_DB` | MongoDB initial database |
| `REDIS_PASSWORD` | Redis `requirepass` |

### Run

```bash
docker compose up -d      # start all services
docker compose ps         # check health status
docker compose down       # stop
```

### Connection Strings

Inside the Compose network, use the service names (`postgres`, `mongodb`, `redis`). From the host machine, use `localhost`.

```
postgresql://<POSTGRES_USER>:<POSTGRES_PASSWORD>@localhost:5432/<POSTGRES_DB>
mongodb://<MONGO_USER>:<MONGO_PASSWORD>@localhost:27017/<MONGO_DB>?authSource=admin
redis://:<REDIS_PASSWORD>@localhost:6379
```

## Notes

- All three ports are published on the host. In production, remove or firewall these port mappings so the databases are not publicly reachable.
- Use strong passwords, keep `.env` out of version control, and set up backups for the volumes.

## Author

**Aryan Bhandari**: [GitHub](https://github.com/aryanbha123)
