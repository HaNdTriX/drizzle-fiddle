CREATE TABLE accounts (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`provider` text,
	`provider_account_id` text,
	`type` text,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`scope` text,
	`token_type` text,
	`id_token` text,
	`session_state` text,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

CREATE TABLE pages (
	`id` integer PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`cover_photo` blob,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`author_id` integer NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL,
	FOREIGN KEY (`author_id`) REFERENCES users(`id`)
);

CREATE TABLE sessions (
	`id` integer PRIMARY KEY NOT NULL,
	`session_token` text NOT NULL,
	`user_id` integer NOT NULL,
	`expires` integer NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);

CREATE TABLE users (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`email` text NOT NULL,
	`email_verified` integer,
	`image` text,
	`role` text DEFAULT ('user') NOT NULL,
	`created_at` integer DEFAULT current_timestamp NOT NULL,
	`updated_at` integer DEFAULT current_timestamp NOT NULL
);

CREATE TABLE verification_tokens (
	`id` integer PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);

CREATE INDEX unique_index ON accounts (`provider`,`provider_account_id`);
CREATE UNIQUE INDEX slug ON pages (`slug`);
CREATE INDEX session_token ON sessions (`session_token`);
CREATE UNIQUE INDEX email ON users (`email`);
CREATE INDEX unique_index ON verification_tokens (`identifier`,`token`);