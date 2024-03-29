const express = require("express");
const tips = require("./TipsRoutes.js");
const recipes = require("./RecipesRoutes.js");
const user = require('./UserRoutes.js')
const path = require("path");

const routes = (app) => {    

    app.route('/').get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, '..', 'views', "index.html"));
    });    

    app.use(express.json());

    app.use("/api/", tips)    
    app.use("/api/", recipes)    
    app.use("/api", user)

};

module.exports = routes;
