# 📦 Database Infrastructure

Production-ready Docker setup for:

-   PostgreSQL
-   MongoDB
-   Redis

------------------------------------------------------------------------

# 🚀 Tech Stack

-   PostgreSQL 15 (Alpine)
-   MongoDB 7
-   Redis 7 (AOF enabled)
-   Docker Compose v3.9

------------------------------------------------------------------------

# 📁 Project Structure

    .
    ├── docker-compose.yml
    ├── .env.production
    ├── postgres/
    │   └── init.sql
    ├── mongo/
    │   └── init.js
    └── redis/

------------------------------------------------------------------------

# ⚙️ Environment Variables (.env.production)

    # PostgreSQL
    POSTGRES_USER=admin
    POSTGRES_PASSWORD=strongpassword
    POSTGRES_DB=appdb

    # MongoDB
    MONGO_USER=root
    MONGO_PASSWORD=strongpassword
    MONGO_DB=appdb

    # Redis
    REDIS_PASSWORD=strongredispass

------------------------------------------------------------------------

# 🐘 PostgreSQL Connection Strings

## Inside Docker Network

postgresql://admin:strongpassword@postgres:5432/appdb

## From Localhost (Host Machine)

postgresql://admin:strongpassword@localhost:5432/appdb

## From Server Public IP

postgresql://admin:strongpassword@YOUR_SERVER_IP:5432/appdb

------------------------------------------------------------------------

# 🍃 MongoDB Connection Strings

## Inside Docker Network

mongodb://root:strongpassword@mongodb:27017/appdb?authSource=admin

## From Localhost

mongodb://root:strongpassword@localhost:27017/appdb?authSource=admin

## From Server Public IP

mongodb://root:strongpassword@YOUR_SERVER_IP:27017/appdb?authSource=admin

------------------------------------------------------------------------

# ⚡ Redis Connection Strings

## Inside Docker Network

redis://:strongredispass@redis:6379

## From Localhost

redis://:strongredispass@localhost:6379

## From Server Public IP

redis://:strongredispass@YOUR_SERVER_IP:6379

------------------------------------------------------------------------

# ▶️ Run Services

docker compose --env-file .env.production up -d

Stop services:

docker compose down

------------------------------------------------------------------------

# 🧠 Important Notes

-   Inside Docker use service names: postgres, mongodb, redis
-   From host machine use localhost
-   From remote server use your public IP
-   Do NOT expose database ports publicly in real production
-   Always use strong passwords
-   Configure backups

------------------------------------------------------------------------

# 🏗 Architecture Overview

Backend App ↓ Docker Network ↓ Postgres \| MongoDB \| Redis
# assesment-platform-db
