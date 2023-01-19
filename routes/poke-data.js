const express = require("express");
const routes = express.Router();

const pokeDataControl = require("../controllers/poke-data");

routes.get("/", pokeDataControl.getPokeData);

routes.get("/:id", pokeDataControl.getPokemon);

routes.post("/", pokeDataControl.createPokemon);

routes.put("/:id", pokeDataControl.updatePokemon);

routes.delete("/:id", pokeDataControl.deletePokemon);

module.exports = routes;
