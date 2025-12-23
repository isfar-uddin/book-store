#!/bin/bash

# Configuration
BACKUP_DIR="./backups"
CONTAINER_NAME="book-store-postgres-1"
DB_USER="postgres"
DB_NAME="book-store"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/backup_${TIMESTAMP}.sql"

# Create backup directory if it doesn't exist
mkdir -p ${BACKUP_DIR}

# Create backup
echo "Creating backup: ${BACKUP_FILE}"
docker exec ${CONTAINER_NAME} pg_dump -U ${DB_USER} -d ${DB_NAME} > ${BACKUP_FILE}

# Compress the backup
gzip ${BACKUP_FILE}

echo "Backup completed: ${BACKUP_FILE}.gz"

# Optional: Keep only last 7 backups
find ${BACKUP_DIR} -name "backup_*.sql.gz" -type f -mtime +7 -delete
echo "Old backups cleaned up (kept last 7 days)"