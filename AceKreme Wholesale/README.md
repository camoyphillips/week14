# AceKreme Wholesale Admin Dashboard

A full-stack Node.js + Express + MongoDB (Atlas) web application for managing wholesale products, store locations, customer information, and orders. This application serves as the admin interface, allowing for full CRUD (Create, Read, Update, Delete) operations on the stored data.

## Table of Contents

- [Features](#features)
- [Wholesale Inventory Content](#wholesale-inventory-content)
- [Assignment Requirements Met](#assignment-requirements-met)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Credits](#credits)

## Features

- **Product Management:** Add, view, edit, and delete wholesale products (beds, TVs, appliances, electronics, etc.).
- **Store Location Management:** Manage information for various store outlets.
- **Customer Management:** Keep track of customer details.
- **Order Management:** Oversee and update customer orders.
- **Entertainment:** Trakt api connection for entertainment.
- **Admin Dashboard:** A centralized, responsive web interface for all management tasks.
- **RESTful API:** Exposes data in JSON format for external consumption.
- **Secure Deletion:** Confirmation pages for all delete operations to prevent accidental data loss.
- **MongoDB Atlas Integration:** Data stored securely in a cloud-hosted MongoDB database.
- **Pug Template Engine:** Server-side rendering for admin pages.
- **Custom Styling:** Presentable and responsive admin pages with custom CSS.

## Wholesale Inventory Content

AceKreme sells the following wholesale products:

-   Beds, mattresses, doors, locks
-   Televisions, cell phones, computers
-   Refrigerators, microwaves, air fryers, deep fryers
-   Blenders, juicers, printers, kettles
-   Washing machines and dryers

## Assignment Requirements

1.  **MongoDB Collections:** `products`, `storeLocations`, `customers`, `orders` .
2.  **Express App with Admin Pages:** Full CRUD functionality implemented for all collections via admin pages rendered using Pug.
3.  **CRUD Operations:** Add, List, Edit, Delete for all entities.
4.  **MongoDB Atlas:** Database deployed online with access from anywhere (0.0.0.0/0).
5.  **Admin Interface Design:** Custom-themed responsive CSS.
6.  **API Endpoints:** `/api/products`, `/api/stores`, `/api/customers`, `/api/orders` return JSON arrays.
7.  **Deployment:** Application to be deployed online.

## Folder Structure
AceKreme-wholesale/
│
├── controllers/          # Logic for each model
├── models/               # Mongoose models 
├── routes/               # Express routes for each module
├── views/                # Pug templates for admin panel
│   ├── layout.pug
│   ├── dashboard.pug
│   ├── product-list.pug
│   ├── product-add.pug
│   ├── product-edit.pug
│   ├── product-delete.pug
│   ├── store-list.pug
│   ├── store-add.pug
│   ├── store-edit.pug
│   ├── store-delete.pug
│   ├── customer-list.pug
│   ├── customer-add.pug
│   ├── customer-edit.pug
│   ├── customer-delete.pug
│   ├── order-list.pug
│   ├── order-add.pug
│   ├── order-edit.pug
│   └── order-delete.pug
├── public/               # Static CSS/JS/images
│   └── styles.css
├── .env                  # Environment variables (MongoDB URI, session secret)
├── index.js              # Main Express app file
├── package.json          # Project dependencies and scripts
└── README.md             # Project documentation


## Getting Started

### Prerequisites

-   Node.js 
-   MongoDB Atlas account and cluster
-   `npm` (Node Package Manager)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <> acekreme-wholesale
    cd acekreme-wholesale
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure environment variables:**
    Create a `.env` file in the root directory of the project with the following content:
    ```
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
    SESSION_SECRET=a_very_long_random_string_for_your_session_secret
    PORT=3000
    ```
    - Replace `<username>`, `<password>`, `<cluster-url>`, and `<dbname>` with your MongoDB Atlas credentials and database name.
    - Ensure your MongoDB Atlas cluster's "Network Access" is configured to allow connections from your deployment IP or "0.0.0.0/0" for access from anywhere (for development/testing).

### Running the Application

1.  **Start the server:**
    ```bash
    npm start
    # Or for development with hot-reloading (if nodemon is installed):
    # npm run dev
    ```
2.  **Access the Admin Dashboard:**
    Open your web browser and navigate to: `http://localhost:3000/admin`.

## Deployment

[]

## API Endpoints

-   **Get All Products:** `GET /api/products`
-   **Get All Store Locations:** `GET /api/stores`
-   **Get All Customers:** `GET /api/customers`
-   **Get All Orders:** `GET /api/orders`

## Technologies Used

-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB
-   **Templating:** Pug
-   **Styling:** Custom CSS
-   **Dev Tools:** Nodemon (for development)
-   **Utilities:** `dotenv`, `express-session`, `connect-flash`, `method-override`

## Credits

Developed for HTTP5222 Assignment 1.