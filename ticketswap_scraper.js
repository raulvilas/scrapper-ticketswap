const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://www.ticketswap.com/", { waitUntil: "load" });

    const extractedData = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("h3.css-7g5cl9.eazv9fo5"))
            .map(el => el.textContent);
    });

    fs.writeFileSync("ticketswap_data.json", JSON.stringify(extractedData, null, 2));
    console.log("Data extracted:", extractedData);

    await browser.close();
})();