# MEAN-Login-Template

A simple MEAN stack template with user registration and authentication.

## backend server

`cd ./backend`


#### install dependencies

```
npm install
```

#### create a config.js

```
follow config.example.js template
```

#### run in dev mode

```
npm run devstart
```

#### run

```
npm start
```

#### using the api

##### register user

requires username password and repeatPassword

```
/users/register
```

##### login user

requires username and password.
returns token

```
/users/login
```

##### user info

requires token

```
/users/me
```

## frontend server

`cd ./frontend`

#### install dependencies

```
npm install
```

#### start the server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.