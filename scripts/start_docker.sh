#!/bin/bash
docker run -d --rm -p 5432:5432 -e POSTGRES_PASSWORD=postgres --name test_ts_postgres postgres:12-alpine