# ChatGpt UI App

App with React Material UI client with Okta integration. 
Python/JS experimental scripts

## Features

- Added chat history with local postgresdb

## Requirements

- Node JS
- Python
- OpenAI key
- postgresdb

## Setup

1. Clone the repository

2. Update .env file for client with following okta creds:

```
REACT_APP_CLIENT_ID=
REACT_APP_ISSUER="https://<domain>/oauth2/default"
REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK="false"
```

3. Install client dependencies

```
cd client
npm install
```



## Usage

1. Start the client

```
cd client
npm start
```
2. Local potsgresdb

```
Install postgresdb locally. to store chat history
```
3. Start the server

```
cd python-server
python server.py
```

- Check if your client application run on port 3000 with the development environment configuration, so in your browser just go to http://localhost:3000

- Check if your server application run on port 4000


