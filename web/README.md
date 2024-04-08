# MyDiary

![version](https://img.shields.io/badge/version-v1.0.2--alpha-blue)

MyDiary is an intuitive fully open-source web application developed with Golang and Nextjs, for users who want a free and minimalistic alternative to keep their notes organized.
With a user-friendly interface, MyDiary allows you to effortlessly jot down and save your thoughts, ideas, and important information.

This is the NextJS repository in which the backend of the application is coded.
Other repos related to the project:

- [Central docker repository](https://github.com/UPSxACE/my-diary)
- [Golang API repository](https://github.com/UPSxACE/my-diary-api)

## Table of Contents

- [Development Prerequisites](#development-prerequisites)
- [Installation and Setup](#installation-and-setup)

## Development Prerequisites

Ensure you have the following tools and dependencies installed on your system before diving into MyDiary NextJs development:

- node
- yarn

## Installation and Setup

### Clone repository

```bash
git clone https://github.com/UPSxACE/my-diary-web.git && cd my-diary-web
```

### Install node dependencies

```bash
yarn install
```

### Create .env.local file at the root of the project

```env
NEXT_PUBLIC_URL=<URL USED FOR THE WEB APP>
NEXT_PUBLIC_COOKIE_DOMAIN=<DOMAIN VALUE USED FOR THE SESSION COOKIE>
NEXT_PUBLIC_API_BASEURL=<URL USED FOR THE API APP>
NEXT_SERVER_API_BASEURL=http://api:1323
NEXT_SERVER_JWT_SECRET=<JWT SECRET KEY>
NEXT_BUILD_STANDALONE=false
```

### Run app in development mode

```
yarn run dev
```

### Build a production build

```
yarn run build
```

### Run the production build

```
yarn run start
```
