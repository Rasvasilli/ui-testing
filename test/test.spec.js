const expect = require('chai').expect;

describe("Test environment", () => {
    it("Works", () => expect(true).to.equal(true));
    it.skip("Fails", () => expect(true).to.equal(false));
});