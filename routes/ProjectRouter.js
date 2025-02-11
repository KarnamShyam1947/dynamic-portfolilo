const express = require("express")
const {
    addProject,
    getProjects
} = require("./../controllers/ProjectsController")
const verifyToken = require("./../middleware/authMiddleware")

const ProjectRouter = express.Router()

ProjectRouter.route("/")
    .post(verifyToken, addProject)
    .get(getProjects)


module.exports = ProjectRouter
