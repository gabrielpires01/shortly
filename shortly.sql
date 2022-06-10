CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL);

CREATE TABLE sessions (id SERIAL PRIMARY KEY, token TEXT NOT NULL, "userId" INT NOT NULL REFERENCES users(id));

CREATE TABLE urls (id SERIAL PRIMARY KEY, "userId" INT NOT NULL REFERENCES users(id), url TEXT NOT NULL, "shortenUrl" TEXT NOT NULL, "createdAt" TIMESTAMP DEFAULT NOW(), visits INT NOT NULL DEFAULT 0);