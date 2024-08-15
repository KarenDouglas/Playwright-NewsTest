// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { test, expect, chromium } = require('@playwright/test');

async function sortHackerNewsArticles(url) {
  // launch browser
  const browser = await chromium.launch({ headless: false});
  const context = await browser.newContext();
  const page = await context.newPage();
  // go to Hacker News
  await page.goto(url);
  return page;
}
test('Verify that the "newest" page on Hacker News is loaded', async () => {
  const page = await sortHackerNewsArticles("https://news.ycombinator.com/newest");

  // explicitly waits for 'More' link to be visible for testing in headless mode
  await page.waitForSelector('role=link[name="More"]', { state: 'visible' });

  // check if page title, more link, and article date links are visible 
  const moreBtn = await page.locator('role=link[name="More"]');
  const ageElements = await page.$$('.age');
  const pageTitle = await page.title(); 

  // expects page title to be visible and accounts for different page title in headless mode
  await expect(pageTitle === 'New Links | Hacker News' || pageTitle === 'Hacker News').toBe(true);
  
  await expect(moreBtn).toBeVisible();
  await expect(ageElements.length).toBeGreaterThan(0);

});

test('validates that EXACTLY the first 100 articles are sorted from newest to oldest.', async () =>{

});
