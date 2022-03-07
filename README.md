# Employee-Manager

# Instructions

## For local

To start up both the front(PORT:3000) & backend(PORT:5000).

```
cd server
npm start
```

To start either front React or backend Express only

```
npm run server
npm run client
```

## For Docker

```
docker-compose build
docker-compose up
```

## FrontEnd

- ReactJS
- Redux Toolkit
- Reudx Saga
- Aggrid

### createSlice - for reducers & actions

a function that accepts:

- an initial state,
- an object of regular reducer functions
- a slice name
- extraReducers
  and automatically generates action creators and action types that correspond to the regular reducers and state

### Saga

a generator function that helps to organise side effects for easier management. The side effects can be:

- HTTP requests
- access browser storage
- executing I/O operations

## MVP

- Homepage
