# Employee-Manager-Cafe

# Instructions

## For local

At server folder, create and .env file and Add your MongoDB URI string to it

```
// sample URI
MONGO_URI=mongodb+srv://<your_name>:fdfdsfdfffc@cluster0.u8mkw.mongodb.net/<db_name>?retryWrites=true&w=majority
```

To start up both the front(http://localhost:3000/employee/list) & backend(localhost:5000) together.
The front end is configured to start up at http://localhost:3000/employee/list

```
cd server
npm start
```

To start either front React or backend Express only

```
cd server
npm run server

cd client
npm run client
```

## Navigation Guide on localhost:500

![navigation](/server/public/navigation.jpg)

## For Docker

At root directory, key the following commands. It will start mongoDB first, followed by Express and then React.
For front end, visit http://localhost:3000/employee/list. For backend, to change
"proxy": "http://express-server-employee-cafe:5000" in package.json

```
docker-compose build
docker-compose up
```

![dockerBuild](/server/public/docker.jpg)
![dockerUp](/server/public/dockerUp.jpg)

# FrontEnd

- ReactJS
- Redux Toolkit
- Reudx Saga
- Aggrid
- Formik, yup

![aggrid](/server/public/aggrid.jpg)
![delete](/server/public/delete.jpg)
![formik](/server/public/formik.jpg)
![editPage](/server/public/editpage.jpg)

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

### MVP

- Homepage, AddPage, EditPage
- Display Data on Aggrid Table
- CRUD function with slice & saga

# Backend

- Express, MongoDB
- Node, nodemon, mongoose
- concurrently, randomstring, uuid

### MVP

- Data Transformation, Design & Retrieval
- Create a GET API with endpoint: /drinks?type=<type>
- Create an GET endpoint: /cafes?location=<location>
- Create an GET endpoint: /cafes/employees
- Create a POST endpoint: /cafe
- Create a POST endpoint: /cafe/employee

## POST endpoint: /cafe

![createCafe](/server/public/createCafeOnly.jpg)

## POST endpoint: /cafe/employee

![createCafeEmployee](/server/public/createCafeEmployee.jpg)
![checkEmployee](/server/public/checkEmployeeCafe.jpg)

# Future Improvement & Reflections

- Cafe employee count should be updated based on actual number of employees created
- First time using Aggrid & formik & saga, not so familiar
