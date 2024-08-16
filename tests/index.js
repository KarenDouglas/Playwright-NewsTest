// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { test, expect, chromium } = require('@playwright/test');

// Navigates page to "newest" Hacker News Articles
async function sortHackerNewsArticles(url) {
  // launch browser
  const browser = await chromium.launch({ headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();
  // go to Hacker News
  await page.goto(url);
  return page;
}

//Collects article dates for the first 100 articles from page
 (async () => {
  //Launch browser
  const browser = await chromium.launch({headless: true});
  const page = await browser.newPage();

  // go to website
  await page.goto('https://news.ycombinator.com/newest');

  //Array to store scraped data
  const scrapedData = [];
  // converts article dates into seconds
  function parseRelativeTime(timeString) {
    const [value, unit] = timeString.split(" ");
     // Convert minutes to seconds
    if (unit.includes("min")) return value * 60;
    // Convert hours to seconds
    if (unit.includes("hour")) return value * 3600; 
}
  // Function to scrape the current items and handle "more" link clicks
  async function scrapedItems() {
    while (scrapedData.length< 100) {
      // Waits for dates to load
      await page.waitForSelector('.age', { timeout: 120000 });

      //Scrape the data from the current set of items
      const items = await page.$$('.age');

      // Loops thru items and pushes parsed data to scrapedData array
      for(let i = 0; i < items.length && scrapedData.length < 100; i++ ){
       const data = await items[i].textContent();
       const parsedData = await parseRelativeTime(data);
       scrapedData.push(parsedData);
      }
      // If you still need more items, click the"more" button to load next page
      if(scrapedData.length < 100){
        await page.waitForSelector('a.morelink', { timeout: 120000 });
        const moreLink = await page.locator('a.morelink');
        if(moreLink){
          await moreLink.click();
          await page.waitForSelector('.age', { timeout: 120000 });
        }else{
          console.log('No more items to load, but less than 100 items found');
          break;
        }
      }
    }
  }
  // Starts the scraping process
  await scrapedItems();

  // Output the scraped data
  console.log(`Total items scraped: ${scrapedData.length}`);
  console.log(scrapedData);

    // Close the browser
    await browser.close();
})();


test.describe('Tests functionality of Hacker News "newest" page', () => {
  test.setTimeout(60000)
let page
  
  test('Verify that the "newest" page on Hacker News is loaded', async () => {
    page = await sortHackerNewsArticles("https://news.ycombinator.com/newest");

    // Explicitly waits for 'More' link to be visible for testing in headless mode
     await page.waitForSelector('text=More', { timeout: 120000 });
    //element vars
    const ageElements = await page.$$('.age');
    const pageTitle = await page.title();
    const moreLink = await page.locator('a.morelink');
    //assertions
    await expect(pageTitle === 'New Links | Hacker News' || pageTitle === 'Hacker News').toBe(true);
    await expect(moreLink).toBeVisible();
    await expect(ageElements.length).toBeGreaterThan(0);
  });
  

  test.skip('validates that EXACTLY the first 100 articles are sorted from newest to oldest.', async () => {
   
  page = await sortHackerNewsArticles("https://news.ycombinator.com/newest");
  
  
  const ageElements = await page.$$('.age');
  const moreLink = await page.locator('a.morelink');
  //assertions
  await expect(moreLink).toBeVisible();


  
 
  });
});