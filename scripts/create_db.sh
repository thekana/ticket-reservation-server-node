#!/bin/bash
docker exec -i test_ts_postgres psql -U postgres -c "drop database if exists test" && \
docker exec -i test_ts_postgres psql -U postgres -c "create database test"