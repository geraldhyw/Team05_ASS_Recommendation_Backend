#!/bin/bash
set -e

export NODE_ENV=test
export DB_HOST=localhost
export DB_PORT=3307
export DB_USER=root
export DB_PASSWORD=root123
export DB_NAME=mysqldb

jest --runInBand --detectOpenHandles
