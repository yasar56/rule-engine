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
- RESTful API for creating, retrieving, and evaluating rules.
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
   npm install
   ```
3. **Frontend Setup:**

   ```bash
   cd rule-engine
   npm install
   ```

4. **Start the application:**

    ## Start the backend server:

   ```bash
   cd backend
   npm start
   ```
