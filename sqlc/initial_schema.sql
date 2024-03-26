-- public."role" definition

-- Drop table

-- DROP TABLE public."role";

CREATE TABLE public."role" (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	"name" varchar(62) NULL,
	can_all bool DEFAULT false NOT NULL,
	CONSTRAINT role_pk PRIMARY KEY (id)
);
COMMENT ON TABLE public."role" IS 'Table to store the different roles of the app and it''s permissions';


-- public."user" definition

-- Drop table

-- DROP TABLE public."user";

CREATE TABLE public."user" (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	role_id int4 NOT NULL,
	username varchar(62) NOT NULL,
	"password" varchar(254) NOT NULL,
	email varchar(254) NOT NULL,
	avatar_url varchar(254) NULL,
	full_name varchar(254) NULL,
	skip_tutorials bool DEFAULT false NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NULL,
	deleted_at timestamp NULL,
	CONSTRAINT user_pk PRIMARY KEY (id),
	CONSTRAINT user_unique UNIQUE (username),
	CONSTRAINT user_unique_1 UNIQUE (email),
	CONSTRAINT user_role_fk FOREIGN KEY (role_id) REFERENCES public."role"(id)
);
COMMENT ON TABLE public."user" IS 'Table to store user accounts';


-- public.user_tutorial definition

-- Drop table

-- DROP TABLE public.user_tutorial;

CREATE TABLE public.user_tutorial (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	user_id int4 NOT NULL,
	welcome bool DEFAULT false NOT NULL,
	CONSTRAINT user_tutorial_pk PRIMARY KEY (id),
	CONSTRAINT user_tutorial_unique UNIQUE (user_id),
	CONSTRAINT user_tutorial_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id)
);
COMMENT ON TABLE public.user_tutorial IS 'Table that stores whether or not an user has completed certain tutorials';


-- public.note definition

-- Drop table

-- DROP TABLE public.note;

CREATE TABLE public.note (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	author_id int4 NOT NULL,
	title varchar(254) NOT NULL,
	"content" varchar(131070) NOT NULL,
	content_raw varchar(131070) NOT NULL,
	"views" int4 DEFAULT 0 NOT NULL,
	deleted bool DEFAULT false NOT NULL,
	lastread_at timestamp NULL,
	created_at timestamp NOT NULL,
	updated_at timestamp NULL,
	deleted_at timestamp NULL,
	CONSTRAINT note_pk PRIMARY KEY (id),
	CONSTRAINT note_user_fk FOREIGN KEY (author_id) REFERENCES public."user"(id)
);
COMMENT ON TABLE public.note IS 'Table to store user''s notes';


-- public.note_change definition

-- Drop table

-- DROP TABLE public.note_change;

CREATE TABLE public.note_change (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	note_id int4 NOT NULL,
	title varchar(254) NULL,
	"content" varchar(131070) NULL,
	valid_until timestamp NOT NULL,
	CONSTRAINT note_change_pk PRIMARY KEY (id),
	CONSTRAINT note_change_note_fk FOREIGN KEY (note_id) REFERENCES public.note(id)
);
COMMENT ON TABLE public.note_change IS 'Table that stores the previous versions of the user''s notes and when they got changed';


-- public.revoked_sessions definition

-- Drop table

-- DROP TABLE public.revoked_sessions;

CREATE TABLE public.revoked_sessions (
	id int4 GENERATED ALWAYS AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START 1 CACHE 1 NO CYCLE) NOT NULL,
	user_id int4 NOT NULL,
	revoked_at timestamp NOT NULL,
	CONSTRAINT revoked_sessions_pk PRIMARY KEY (id),
	CONSTRAINT revoked_sessions_user_fk FOREIGN KEY (user_id) REFERENCES public."user"(id)
);
COMMENT ON TABLE public.revoked_sessions IS 'Table that backs up revoked sessions';

-- public.migrations definition

-- Drop table

-- DROP TABLE public.migrations;

CREATE TABLE public.migrations (
	id int4 GENERATED ALWAYS AS IDENTITY NOT NULL,
	code int4 NOT NULL,
	applied_at timestamp NOT NULL,
	CONSTRAINT migrations_pk PRIMARY KEY (id)
);