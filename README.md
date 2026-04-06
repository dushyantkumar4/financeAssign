# Tech Stack

Node.js
Express.js
MongoDB (Mongoose)
JWT Authentication
Joi Validation

# Clone the repository

git clone <repo-url>

# Install dependencies

npm install

# Start the server

npm run dev

# OR

node src/server.js

# Project Overview

This project is designed as an Expense Tracker Backend with role-based access control.

# Authentication

Users must register/login
A JWT token is returned
Token must be passed as Bearer Token in protected routes
Roles & Permissions

# Viewer

Can view:
Total users
Active users

# Analyst

Can:
Create finance records
Update own finance records
Delete own finance records
View own dashboard data

# Admin

Full control over the system:
Manage all users
Update user roles
Delete users (with finance data)
View any user's dashboard

# API Endpoints

# User Routes

# for register =>

POST baseUrl/api/register
req.body {
"name":"",
"email":"",
"role":"",
"password":""
}

# for login =>

POST baseUrl/api/login
req.body{
"email":"",
"password":""
}

# get user detail =>

GET baseUrl/api/me
need to provide the bearer token in auth all below routes

# admin get all users =>

GET baseUrl/api/users

# update user =>

PUT baseUrl/api/me/:userId
req.body {
"name":"",
"password":"",
"status":""
}

# update user role by admin =>

PUT baseUrl/api/me/:userId/role
req.body {
"role":"",
}

# delete user =>

DELETE baseUrl/api/me/:userId

# Finance route

# create finance add amount

POST baseUrl/api/amount
req.body{
"amount":"",
"type":"",
"category":"",
"date":""
}

# update finance

PUT baseUrl/api/amount/:financeId
req.body{
"amount":"",
"type":"",
"category":"",
"date":""
}
some values can be optional

# delete finance

DELETE baseUrl/api/amount/:financeId

# => dashboard apis

# Dashboard Routes

# get user count

GET baseUrl/api/dashboard

# get Dashboard summery

GET baseUrl/api/dashboard/:userId
