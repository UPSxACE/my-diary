-- name: FindOneMigration :one
SELECT * FROM migrations WHERE code = $1
ORDER BY applied_at DESC;

-- name: RegisterMigration :exec
INSERT INTO migrations(code, applied_at) VALUES ($1, $2);