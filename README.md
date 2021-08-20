# Welcome to a basic express-react-gql project

### _An attempt to create a React-GraphQL repository with a basic implementation of CRUD like operation_

In this repository I will try to implement graphQL's side of CRUD operation with basic search functionality using Node(Express), React, GraphQL, MongoDB.

## Technology Stack

As I have mentioned above, this repository is built on top of express.js and react.js with GraphQL API. In the implementation detail, I also used some other supporting technologies as well.

#### Client side

-   [React] - A javascript library for building user interfaces
-   [React-Bootstrap] - A react library of reusable components. The version used here is built on bootstrap 5.
-   [graphql-request] - A graphql client supporting Node and browser
-   [react-chartjs-2] - React wrapper for chart.js

#### Server side

-   [Node.js] - event driven I/O for the backend server
-   [Express.js] - Fast, unopinionated, minimalist web framework for Node.js
-   [Mongoose] - an Object Data Modeling (ODM) library for MongoDB and Node. js

##### Prerequisites

-   [x] Node.js : To run npm packages

##### Steps

-   To run via vscode, we should run the server and client side projects separately, and also make sure mongodb is up and running.
-   Create a `.env` file inside of the `server` directory. Add the below entries
    ```
    PORT = 8000
    DB_HOST=localhost
    DB_PORT=27017
    DB_NAME=as_you_wish
    ```
    #### Server commands

    ```sh
    cd server
    npm install
    npm start
    ```
    #### Client commands

    ```sh
    cd client
    yarn or npm install
    npm start
    ```

