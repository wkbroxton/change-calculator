const express = require("express");
const path = require("path");
const Nightmare = require("nightmare");
const expect = require("chai").expect;
const axios = require("axios");

const app = express();
app.use(express.static(path.join(__dirname, "../")));
app.listen(8888);

const url = "http://localhost:8888/index.html";

describe("Change Calculator", function () {
  this.timeout(5000);
  this.slow(3000);

  it("should load successfully", () =>
    axios.get(url).then((r) => expect(r.status === 200)));

  describe("HTML", () => {
    let pageObject;

    before(() => {
      pageObject = Nightmare().goto(url);
    });

    it('should have a H1 with the text "Change Calculator"', () =>
      pageObject
        .evaluate(() => document.querySelector("h1").innerText)
        .then((heading) => expect(heading).to.equal("Change Calculator")));

    it('should have an input element with an id of "amount-due"', () =>
      pageObject
        .evaluate(() => document.querySelector("#amount-due"))
        .then((input) => expect(input).to.exist));

    it('should have an input element with an id of "amount-received"', () =>
      pageObject
        .evaluate(() => document.querySelector("#amount-received"))
        .then((input) => expect(input).to.exist));

    it('should contain a button with an id of "calculate-change"', () =>
      pageObject
        .evaluate(() => document.querySelector("#calculate-change"))
        .then((input) => expect(input).to.exist));

    [
      "hundred",
      "fifty",
      "twenty",
      "ten",
      "five",
      "dollar",
      "quarter",
      "dime",
      "nickel",
      "penny",
    ].map((id) => {
      it(`should contain a paragraph element with an id of "${id}"`, () =>
        pageObject
          .evaluate((id) => document.querySelector(`#${id}`), id)
          .then((input) => expect(input).to.exist));
    });
  });

  describe("Integration", () => {
    let pageObject;

    beforeEach(() => {
      pageObject = Nightmare();
    });

    it(`should display correct change`, () => {
      return pageObject
        .goto(url)
        .type("#amount-received", "20")
        .type("#amount-due", "10.21")
        .click("#calculate-change")
        .wait("#hundred")
        .evaluate(() => ({
          hundred: document.querySelector("#hundred").innerText,
          fifty: document.querySelector("#fifty").innerText,
          twenty: document.querySelector("#twenty").innerText,
          ten: document.querySelector("#ten").innerText,
          five: document.querySelector("#five").innerText,
          dollar: document.querySelector("#dollar").innerText,
          quarters: document.querySelector("#quarter").innerText,
          dimes: document.querySelector("#dime").innerText,
          nickels: document.querySelector("#nickel").innerText,
          penny: document.querySelector("#penny").innerText,
        }))
        .end()
        .then((change) => {
          expect(change.hundred).to.equal(
            "0",
            "Expected hundreds didn't match"
          );
          expect(change.fifty).to.equal("0", "Expected fiftys didn't match");
          expect(change.twenty).to.equal("0", "Expected twentys didn't match");
          expect(change.ten).to.equal("0", "Expected tens didn't match");
          expect(change.five).to.equal("1", "Expected fives didn't match");
          expect(change.dollar).to.equal("4", "Expected dollars didn't match");
          expect(change.quarter).to.equal("3", "Expected dollars didn't match");
          expect(change.dime).to.equal("0", "Expected dimes didn't match");
          expect(change.nickel).to.equal("0", "Expected nickels didn't match");
          expect(change.penny).to.equal("3", "Expected pennies didn't match");
        });
    });

    it(`should display correct change`, () => {
      return pageObject
        .goto(url)
        .type("#amount-received", "20")
        .type("#amount-due", "13.34")
        .click("#calculate-change")
        .wait("#hundred")
        .evaluate(() => ({
          hundred: document.querySelector("#hundred").innerText,
          fifty: document.querySelector("#fifty").innerText,
          twenty: document.querySelector("#twenty").innerText,
          ten: document.querySelector("#ten").innerText,
          five: document.querySelector("#five").innerText,
          dollar: document.querySelector("#dollar").innerText,
          quarters: document.querySelector("#quarter").innerText,
          dimes: document.querySelector("#dime").innerText,
          nickels: document.querySelector("#nickel").innerText,
          penny: document.querySelector("#penny").innerText,
        }))
        .end()
        .then((change) => {
          expect(change.hundred).to.equal(
            "0",
            "Expected hundreds didn't match"
          );
          expect(change.fifty).to.equal("0", "Expected fiftys didn't match");
          expect(change.twenty).to.equal("0", "Expected twentys didn't match");
          expect(change.ten).to.equal("0", "Expected tens didn't match");
          expect(change.five).to.equal("1", "Expected fives didn't match");
          expect(change.dollar).to.equal("1", "Expected dollars didn't match");
          expect(change.quarter).to.equal("2", "Expected dollars didn't match");
          expect(change.dime).to.equal("1", "Expected dimes didn't match");
          expect(change.nickel).to.equal("1", "Expected nickels didn't match");
          expect(change.penny).to.equal("1", "Expected pennies didn't match");
        });
    });
  });
});
