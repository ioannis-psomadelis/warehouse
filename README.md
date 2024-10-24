# Warehouse

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.9.

[DEMO](https://warehouse-ten-rouge.vercel.app/)

## Table of Contents
- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Services](#services)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Introduction
Warehouse is an Angular-based application designed to manage and display a list of products. It includes features such as user authentication, product listing, and messaging services.

## Installation
To run this project locally, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/ioannis-psomadelis/warehouse.git
   cd warehouse
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser to see the application in action.

## Usage
- **Login:** Users can log in using the login component.
    - **Role:** admin
        - **Username:** admin
        - **Password:** admin
    - **Role:** user
        - **Username:** user
        - **Password:** user
- **Product List:** View a list of products with details.
- **Product Actions:** (Only for admin)
    - **Add:** Add a new product.
    - **Edit:** Edit an existing product.
    - **Delete:** Delete a product.

## Project Structure
The project is organized as follows:
- **src/app/features/dashboard:** Contains the dashboard component for routing

- **src/app/components:** Contains the Angular components.
  - **login:** Handles user authentication.
  - **product-list:** Displays the list of products.
  - **product-form:** Handles the product form (add-edit).

- **src/app/shared/models:** Contains data models used across the application.
  - **product.model.ts:** Defines the structure of a product object.

- **src/app/shared/services:** Contains services for handling business logic and data management.
  - **auth.service.ts:** Manages user authentication.
  - **messaging.service.ts:** Handles messaging functionality.
  - **session-storage.service.ts:** Manages session storage.
  - **product.service.ts:** Provides product data and actions.
