const { Movie, conn } = require("../../src/db.js");
const { expect } = require("chai");

describe("Movie model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Movie.sync({ force: true }));
    describe("title", () => {
      it("should throw an error if title is null", (done) => {
        Movie.create({})
          .then(() => done(new Error("It requires a valid title")))
          .catch(() => done());
      });
      it("should work when its a valid title", () => {
        Movie.create({ title: "Die Hard" });
      });
    });
  });
});
