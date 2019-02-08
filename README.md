# Final Project - Healthy Meal Planner:
This is the back-end for a meal planner app.
Here is the link to the [Web-app](https://planet-friendly-meal-planner.netlify.com).

## Description
The meal planner is a full-stack web app. A team of four developers and one UI/UX designer worked to develop/design it.

The goal is to develop the basic features for a meal planner that helps people plan healthier meals more efficiently.

The idea of the app is to generate for users one recipe per day randomly from the database, the ability to change the recipe associated to a day and to print a shopping list based on all the recipes selected for the week.

### Some features of the apps:
- Creating user accounts
- Generating a list of recipes
- Generating a shopping list that included all the necessary ingredients in the right quantity (calculated for the number of household members)

## Tech stack
* TypeScript
* Koa
* Routing-controllers
* TypeORM
* PostgreSQL

## Demo
[Working MVP Demo](https://loized.com/img/meal/video_meal.gif)

## Setup
* You need a working Postgres database that is preferably empty and running. To populate the database with dummy data use a SQL script and run it with your Postgres client.
* Install the dependencies using ```npm install```
* Start the server using ```npm start```
* Start compiling using ```nmp run compile```
* You can now access endpoints with HTTPie commands on ```localhost:4000```

## Authors and acknowledgment
[Hoan Phung](https://www.linkedin.com/in/hoanphung) - Junior Full-Stack Developer (me)

[Sabina Dhaugoda - Junior Full-Stack Developer](https://www.linkedin.com/in/sabinadhaugoda)

[Alina Rusu - Junior Full-Stack Developer](https://github.com/alex-alina)

[David Behal - Junior Full-Stack Developer](https://github.com/DavidB59)

[Loize Dalco - UX/ UI Designer](https://loized.com/)
