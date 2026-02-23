const database = require('../db/games.json');
const {styleText} = require('node:util');
let games = database.games;

let mapBySlug = new Map(games.map(g => [g.slug, g]));
let mapById = new Map(games.map(g => [g.id, g]));

const getAll = () => {
    return games;
}

const getById = (id) => {
    return mapById.get(Number(id));
}

const getBySlug = (slug) => {
    return mapBySlug.get(slug);
}

const add = (game) => {
    games.push(game);
    mapById.set(game.id, game);
    mapBySlug.set(game.slug, game);
}

const update = (game) => {
    games.map(g => g.id === game.id ? game : g);
    mapById.set(game.id, game);
    mapBySlug.set(game.slug, game);
}

module.exports = {
    getAll, getById, getBySlug, add, update
}