const expect = require('chai').expect;

const {Builder, By, Key, WebElement, Browser} = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
require('geckodriver');

const BASE_URL = "https://www.is.fi/haku/";
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000))

describe("UI Tests", () => {
    /** @type {import('selenium-webdriver').ThenableWebDriver} */
    let driver = undefined;

    before(async () => {
        const options = new firefox.Options();
        options.setBinary("C:\\Program Files\\Mozilla Firefox\\firefox.exe");

        driver = await new Builder()
            .forBrowser(Browser.FIREFOX)
            .setFirefoxOptions(options)
            .build();
        await driver.get(BASE_URL);
        await sleep(5);
    });

    it("Can find all the buttons", async () => {
        buttons = {
            button1: await driver.findElement(By.id('main-search')),
            button2: await driver.findElement(By.id('sort')),
            button3: await driver.findElement(By.id('search-section-select')),
            button4: await driver.findElement(By.id('search-time-select'))
        };
    });
    it('Can get and set text to search field', async () => {
        const search = await driver.findElement(By.id("main-search"));
        let search_value = await search.getAttribute('value');
        const keystroke_sequence = [];

        // Käyttäjä kirjoittaa arvon
        keystroke_sequence.push("suomi");

        // Käyttäjä painaa enter
        keystroke_sequence.push(Key.ENTER);

        // Sekvenssi kirjoitetaan kenttään (suoritus)
        await search.sendKeys(...keystroke_sequence);
        search_value = await search.getAttribute('value');
        expect(search_value).to.eq("suomi");
        await sleep(5);
    });

    after(async () => {
        await driver.close();
    });
});