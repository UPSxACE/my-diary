# MyDiary

![version](https://img.shields.io/badge/version-v1.0.2--alpha-blue)

MyDiary is an intuitive fully open-source web application developed with Golang and Nextjs, for users who want a free and minimalistic alternative to keep their notes organized.
With a user-friendly interface, MyDiary allows you to effortlessly jot down and save your thoughts, ideas, and important information.

This is the central repository that connects two other using git subtrees, to bundle them up in a single docker compose container with <u>**Traefik**</u> reverse proxy and <u>**Postgres**</u> database.
If you don't want to use docker, you can also deploy the separate parts of the app on your own way. Check the original repos for guidance:

- [NextJS repository](https://github.com/UPSxACE/my-diary-web)
- [Golang API repository](https://github.com/UPSxACE/my-diary-api)

## Table of Contents

- [Features](#features)
- [Development Prerequisites](#development-prerequisites)
- [Installation and Setup](#installation-and-setup)

## Features

- **Intuitive Interface:** Simple, clean, fast. Designed to be as straight-forward and minimalistic as possible.
- **Format Notes:** With our WYSIWYG editor, you can structure your notes beyond simple boring text! Add titles, quotes, horizontal rule, italic text...
- **Code Blocks:** Support for more than 10 different programming languages.
- **Free Forever:** The project is fully open source, and you will never be prompted to pay for anything. Clone the project and run an instance yourself, or use our [public](https://diary.acehq.net) instance.

## Development Prerequisites

Ensure you have the following tools and dependencies installed on your system before diving into MyDiary development:

- Docker

## Installation and Setup

### Clone repository

```bash
git clone https://github.com/UPSxACE/my-diary.git && cd my-diary
```

### Create .env file

```env
# POSTGRES
POSTGRES_USER=<POSTGRES USERNAME>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_DB=<DATABASE NAME>
POSTGRES_HOST=postgres_db
# TRAEFIK
WEB_HOSTNAME=<DOMAIN USED FOR THE WEB APP>
API_HOSTNAME=<DOMAIN USED FOR THE API APP>
CERTRESOLVER=<"staging" OR "production">
ACME_EMAIL=<EMAIL THAT WILL BE USED IN SSL CERTIFICATES>
# NEXTJS
NEXT_PUBLIC_URL=<URL USED FOR THE WEB APP>
NEXT_PUBLIC_COOKIE_DOMAIN=<DOMAIN VALUE USED FOR THE SESSION COOKIE>
NEXT_PUBLIC_API_BASEURL=<URL USED FOR THE API APP>
NEXT_SERVER_API_BASEURL=http://api:1323
NEXT_SERVER_JWT_SECRET=<JWT SECRET KEY>
NEXT_BUILD_STANDALONE=true
# API
CORS_ORIGIN_1=<URL USED FOR THE WEB APP>
CORS_ORIGIN_2=<URL USED FOR THE API APP>
COOKIE_DOMAIN=<DOMAIN VALUE USED FOR THE SESSION COOKIE>
POSTGRES_USERNAME=<POSTGRES USERNAME>
POSTGRES_PASSWORD=<POSTGRES PASSWORD>
POSTGRES_HOST=postgres_db:5432
POSTGRES_DATABASE=<DATABASE NAME>
JWT_SECRET=<JWT SECRET KEY>
```

### Create traefik network

```bash
docker network create traefik_network
```

### Build production compose container

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml build
```

### Run container

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```
