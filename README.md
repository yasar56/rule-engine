# Rule Engine

A **Rule Engine** application that allows you to define and evaluate rules against dynamic user data. The application supports logical conditions using a simple syntax to define rules, stores them in MongoDB, and evaluates them using an Abstract Syntax Tree (AST).

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Define rules with logical operators (`AND`, `OR`) and comparison operators (`>`, `<`, `=`, `>=`, `<=`).
- Automatically generate an Abstract Syntax Tree (AST) from a rule string.
- Evaluate rules against dynamic user data and return the result.
- Combine multiple rules for efficient evaluation.
- Store rules and their ASTs in a MongoDB database.
- Axios API for creating, retrieving, and evaluating rules.
- Frontend UI (using React) to manage rules and user data.

## Technologies

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MongoDB
- **Other**: Mongoose, Cors, Body-Parser

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (>=14)
- MongoDB

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yasar56/rule-engine.git
   cd rule-engine
   ```

2. **Backend Setup:**
   Navigate to the backend folder and install dependencies:
   ```bash
   cd backend
   npm install express body-parser mongoose cors
   ```
3. **Frontend Setup:**

   ```bash
   cd rule-engine
   npm install
   ```

4. **Start the application:**
   Start the backend server:

   ```bash
   cd backend
   node app.js
   ```

   Start the React frontend:
 
   ```bash
   cd rule-engine
   npm start
   ```

### Usage

- **Create a rule**: Define and save rules using a logical expression.
- **Evaluate rules**: Evaluate user data against defined rules and get eligibility results.


## Directory Structure

    rule-engine/
    ├── backend/
    │   ├── models/
    │   │    ├──Rule.js
    │   │    └──User.js 
    │   ├── node_module
    │   ├── routes/
    │   │   └── rules.js
    │   │──app.js
    │   │──package.json
    │   ├──package-lock.json 
    src/
    ├── components/
    │   ├── RuleEvaluator.js
    │   └── RuleForm.jsx.js
    ├── App.js
    ├── index.js
    ├── index.css
    └── App.css


### Contributing
Feel free to contribute to the project:

- Fork the repository.
- Create a feature branch (git checkout -b feature-branch).
- Make changes and commit (git commit -m 'Add feature').
- Push to the branch (git push origin feature-branch).
- Open a Pull Request.