const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getPokeData = async (req, res) => {
  const result = await mongodb.getDb().db("poke-data").collection("pokemon").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getPokemon = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const createPokemon = async (req, res) => {
  const pokemon = {
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    image: req.body.image,
    shiny: req.body.shiny,
    height: req.body.height,
    weight: req.body.weight
  };
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .insertOne(pokemon);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "An error has occurred while creating the pokemon."
      );
  }
};

const updatePokemon = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const pokemon = {
    name: req.body.name,
    number: req.body.number,
    type: req.body.type,
    image: req.body.image,
    shiny: req.body.shiny,
    height: req.body.height,
    weight: req.body.weight
  };
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .replaceOne({ _id: userId }, pokemon);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "An error has occurred while updating the pokemon."
      );
  }
};

const deletePokemon = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db("poke-data")
    .collection("pokemon")
    .deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "An error has occurred while deleting the pokemon."
      );
  }
};

module.exports = {
  getPokeData,
  getPokemon,
  createPokemon,
  updatePokemon,
  deletePokemon,
};
