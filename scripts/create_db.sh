#!/bin/bash
docker exec -i ticket_postgres psql -U postgres -c "drop database if exists ticket" && \
docker exec -i ticket_postgres psql -U postgres -c "create database ticket"