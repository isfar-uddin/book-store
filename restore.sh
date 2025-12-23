#!/bin/bash

# Configuration
BACKUP_DIR="./backups"
CONTAINER_NAME="book-store-postgres-1"
DB_USER="postgres"
DB_NAME="book-store"

# Check if backup file was provided, otherwise use latest
if [ -z "$1" ]; then
    echo "No backup file specified. Using latest backup..."
    BACKUP_FILE=$(ls -t ${BACKUP_DIR}/backup_*.sql.gz 2>/dev/null | head -1)
    
    if [ -z "${BACKUP_FILE}" ]; then
        echo "Error: No backup files found in ${BACKUP_DIR}"
        echo ""
        echo "Usage: ./restore.sh [backup_file.sql.gz]"
        exit 1
    fi
    
    echo "Latest backup: ${BACKUP_FILE}"
else
    BACKUP_FILE=$1
    
    # Check if file exists
    if [ ! -f "${BACKUP_FILE}" ]; then
        echo "Error: Backup file '${BACKUP_FILE}' not found!"
        exit 1
    fi
fi

# Confirm before restoring
echo "⚠️  WARNING: This will replace all data in database '${DB_NAME}'"
echo "Backup file: ${BACKUP_FILE}"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

# Restore from gzipped backup
echo "Restoring database from: ${BACKUP_FILE}"
gunzip -c ${BACKUP_FILE} | docker exec -i ${CONTAINER_NAME} psql -U ${DB_USER} -d ${DB_NAME}

if [ $? -eq 0 ]; then
    echo "✅ Database restored successfully!"
else
    echo "❌ Restore failed!"
    exit 1
fi