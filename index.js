const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 66; seed <= 75; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    // wait for table to load
    await page.waitForSelector("table");

    // extract all numbers
    const numbers = await page.$$eval("td", tds =>
      tds.map(td => parseInt(td.innerText)).filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed} sum =`, sum);

    totalSum += sum;
  }

  console.log("FINAL TOTAL =", totalSum);

  await browser.close();
})();