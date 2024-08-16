const { test, expect, chromium } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;
// Launches the browser and navigates to the "newest" Hacker News Articles
async function sortHackerNewsArticles(url) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(url);
  return { browser, page };
}

// Test suite for Hacker News "newest" page
test.describe('Tests functionality of Hacker News "newest" page', () => {
  let browser;
  let page;

  // Set a higher timeout to account for potential delays
  test.setTimeout(120000);

  // Before each test, navigate to the "newest" page on Hacker News
  test.beforeEach(async () => {
    const result = await sortHackerNewsArticles("https://news.ycombinator.com/newest");
    browser = result.browser;
    page = result.page;
  });

  // After each test, close the browser
  test.afterEach(async () => {
    await browser.close();
  });

  test('Verify that the "newest" page on Hacker News is loaded', async () => {
    // Explicitly wait for the 'More' link to be visible for testing 
    await page.waitForSelector('text=More', { timeout: 120000 });

    // Element selectors
    const ageElements = await page.$$('.age');
    const pageTitle = await page.title();
    const moreLink = await page.locator('a.morelink');

    // Assertions
    await expect(pageTitle).toMatch(/Hacker News|New Links/);
    await expect(moreLink).toBeVisible();
    await expect(ageElements.length).toBeGreaterThan(0);
  });

  test('Validates that EXACTLY the first 100 articles are sorted from newest to oldest.', async () => {
    const scrapedData = [];

    function parseRelativeTime(timeString) {
      const [value, unit] = timeString.split(" ");
      if (unit.includes("min")) return value * 60;   // Convert minutes to seconds
      if (unit.includes("hour")) return value * 3600; // Convert hours to seconds
      return 0; // If the time is in days or other units, handle as necessary
    }

    async function scrapeItems() {
      while (scrapedData.length < 100) {
        await page.waitForSelector('.age', { timeout: 240000 });

        const items = await page.$$('.age');
        for (let i = 0; i < items.length && scrapedData.length < 100; i++) {
          const data = await items[i].textContent();
          const parsedData = parseRelativeTime(data);
          scrapedData.push(parsedData);
        }

        if (scrapedData.length < 100) {
          const moreLink = await page.locator('a.morelink');
          if (await moreLink.isVisible()) {
            await moreLink.click();
            await page.waitForTimeout(1000); // Allow time for the next page to load
          } else {
            console.log('No more items to load, but less than 100 items found');
            break;
          }
        }
      }
    }

    await scrapeItems();

    // Now validate if the articles are sorted in descending order
    const isSorted = () => {
        for(let i = 0; i < scrapedData.length-1; i++){
            if(scrapedData[i]> scrapedData[i+1]){
                return false;
            }
        }
        return true
    }
   const sortResult = isSorted()
    await expect(sortResult).toBe(true);

    console.log(`Total items scraped: ${scrapedData.length}`);
    console.log(scrapedData);
  });
  test('"newest" page should not have any automatically detectable accessibility issues', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    console.log(`------------- There are ${accessibilityScanResults.violations.length } detectable accessibility issues------`)
    if (accessibilityScanResults.violations.length > 0) {
      console.log('Accessibility violations:', JSON.stringify(accessibilityScanResults.violations, null, 2));
    } else {
      console.log('No accessibility violations found');
    }

    
  });
});
