const express = require("express");

const sportsRouteController = require("../controllers/sportsRouteController");

const sportRouter = express.Router();

function routes(Sport) {
  const controllerSportsList = sportsRouteController(Sport);
  sportRouter.route("/").get(controllerSportsList.get);

  return sportRouter;
}

module.exports = routes;
