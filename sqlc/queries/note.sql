-- name: CountNotes :one
SELECT COUNT(*) FROM note WHERE author_id = $1 AND deleted = false;

-- name: GetNoteById :one
SELECT sqlc.embed(u), sqlc.embed(n) FROM note n
INNER JOIN "user" u ON u.id = n.author_id
WHERE n.id = $1 AND n.deleted = false;

-- name: ListNotes :many
SELECT id, author_id, title, content, content_raw, views, lastread_at, created_at FROM note
WHERE author_id = $1 AND deleted = false
    AND (CASE WHEN @cursor_crt_asc::bool THEN (created_at, note.id) >= ($2, sqlc.arg('CursorID')::int) ELSE TRUE END)
    AND (CASE WHEN @cursor_crt_desc::bool THEN (created_at, note.id) <= ($2, sqlc.arg('CursorID')::int) ELSE TRUE END)
    AND (CASE WHEN @cursor_title_asc::bool THEN (title, note.id) >= ($3, sqlc.arg('CursorID')::int) ELSE TRUE END)
    AND (CASE WHEN @cursor_title_desc::bool THEN (title, note.id) <= ($3, sqlc.arg('CursorID')::int) ELSE TRUE END)
    AND (CASE WHEN @search::bool THEN
        (LOWER(title) LIKE LOWER(CONCAT('%', sqlc.arg('SearchValue')::text, '%')))
        OR
        (LOWER(content_raw) LIKE LOWER(CONCAT('%', sqlc.arg('SearchValue')::text, '%')))
        ELSE TRUE END)
ORDER BY
    CASE WHEN @order_crt_asc::bool THEN created_at END ASC,
    CASE WHEN @order_crt_desc::bool THEN created_at END DESC,
    CASE WHEN @order_title_asc::bool THEN title END ASC,
    CASE WHEN @order_title_desc::bool THEN title END DESC,
    CASE WHEN @order_crt_asc::bool THEN id END ASC,
    CASE WHEN @order_crt_desc::bool THEN id END DESC,
    CASE WHEN @order_title_asc::bool THEN id END ASC,
    CASE WHEN @order_title_desc::bool THEN id END DESC
LIMIT $4;

-- name: CreateNote :one
INSERT INTO note(author_id, title, "content", content_raw, created_at)
VALUES($1, $2, $3, $4, NOW())
RETURNING id;

-- name: UpdateNote :exec
UPDATE note SET
title = $1,
"content" = $2,
content_raw = $3,
updated_at = NOW()
WHERE id = $4 AND deleted = false;

-- name: DeleteNote :exec
UPDATE note SET
deleted = true,
deleted_at = NOW()
WHERE id = $1 AND deleted = false;