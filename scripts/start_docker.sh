#!/bin/bash
docker run -d --rm -p 5432:5432 -e POSTGRES_PASSWORD=postgres --name ticket_postgres postgres:12-alpine