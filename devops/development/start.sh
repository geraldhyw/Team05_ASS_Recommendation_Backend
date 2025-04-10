#!/bin/bash
set -e

export NODE_ENV=development
export DB_HOST=localhost
export DB_PORT=3306
export DB_USER=root
export DB_PASSWORD=root123
export DB_NAME=mysqldb

node server.js