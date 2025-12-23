#!/bin/bash
# Quick backup to GitHub

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${TIMESTAMP}.sql.gz"

# Backup and compress
docker exec book-store-postgres-1 pg_dump -U postgres -d book-store --clean --if-exists | gzip > ../book-store-backups/${BACKUP_FILE}

# Push to GitHub
cd ../book-store-backups
git add ${BACKUP_FILE}
git commit -m "Backup ${TIMESTAMP}"

# Cleanup: Keep only last 7 backups
echo "🧹 Cleaning up old backups..."
ls -t backup_*.sql.gz | tail -n +8 | xargs -r rm

# Commit deletions if any files were removed
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "Cleanup: Keep last 7 backups"
fi

# Push all changes
git push origin main

echo "✅ Backup uploaded to GitHub!"
echo "📦 Keeping 7 most recent backups"