-- name: ListUser :many
SELECT * FROM "user" ORDER BY id ASC;
-- name: CreateUser :one
INSERT INTO "user"(username, password, email, avatar_url, full_name, created_at, role_id)
VALUES($1, $2, $3, $4, $5, NOW(), $6)
RETURNING id;
-- name: GetUserAuthByUsername :one
SELECT "user".id, username, password, role_id, can_all FROM "user" 
INNER JOIN role ON "user".role_id = role.id
WHERE LOWER(username) = LOWER($1) AND deleted = false;
-- name: GetUserProfileById :one
SELECT "user".id, username, email, avatar_url, full_name, skip_tutorials FROM "user" 
WHERE "user".id = $1 AND deleted = false;