/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Movie, conn } = require("../../src/db.js");

const agent = session(app);
const movie = {
  title: "Die Hard",
};

describe("/movies", function () {
  it("GET responde con un array vacío de entrada", function () {
    return supertest // supertest permite hacer y testear requests HTTP
      .get("/movies") // request HTTP: GET a '/movies'
      .expect(200) // el codigo de status del response
      .expect("Content-Type", /json/) // testeo headers
      .expect(function (res) {
        expect(res.body).to.eql([]); // testeo respuesta con el body
      });
  });
});
