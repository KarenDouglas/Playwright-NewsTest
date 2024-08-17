# 🐺 QA Wolf Take Home Assignment

## Description

The **Playwright News Test** is a testing suite designed to validate the functionality of a news website. This program ensures that:
- Elements are correctly visible on the page.
- Items are sorted according to expected criteria.
- There are no detectable accessibility violations.

## Installation

To set up the project locally, follow these steps:

1.**Clone the Repository:**
```bash
   git clone git@github.com:KarenDouglas/Playwright-NewsTest.git
```
2.**Navigate to the Project Directory:**
```bash
cd Playwright-NewsTest
```
3.**Install Dependencies:**
```bash
npm install
```

## Running Tests
- **Start Tests:**
```bash
npm run test
```

- **Show Test Report:**
```bash 
npm run report
```
## Test Case Documentation

This section outlines the test cases for the project. It includes details on the test scenarios, steps to execute the tests, expected outcomes, and the tools used for testing.

### Testing Strategy

We have implemented the following types of tests:
- **End-to-End Tests:** Simulate user interactions with the application to ensure that the system works as expected.

**Tools Used:**
- **Playwright:** For end-to-end testing.
- **Axe-Core/playwright:** For accessibility testing

### Test Case Format

Each test case is documented with the following details:
- **Test Case ID:** A unique identifier for the test case.
- **Test Description:** A brief description of the test scenario.
- **Preconditions:** Any conditions that must be met before executing the test.
- **Test Steps:** The steps required to execute the test.
- **Expected Result:** The expected outcome of the test.
- **Post-Condition:** Any actions to be taken after the test execution.

###  Test Cases

#### Test Case 01: Validate articles are sorted from newest to oldest and find any easily detectable accessibility issues.
- **Test Case ID:** TC01
- **Test Description:** validate that EXACTLY the first 100 articles are sorted from newest to oldest.
- **Preconditions:**
  -The user is on the Hacker News homepage.
  - The test environment is properly set up with a stable internet connection.
- **Test Steps:**
  1. Navigate to Hacker News Homepage.
  2. Locate the "new" link in the navigation bar and click on it to access the 'New' page, where articles are displayed in reverse chronological order
  3. Verify the newest articles page has loaded:
  - Check if title element is present
  - Check if  at least one article has loaded
  - Check if the "More" link is present
  4. Verify that the first 30 articles displayed are sorted from newest to oldest by comparing the timestamps or identifiers associated with each article.
  5. Scroll to the bottom of the page and click on the "More" button to load the next set of articles. Repeat this action until 100 articles have been loaded.
  6. Confirm that the entire list of the first 100 articles remains sorted from newest to oldest after loading additional articles.
  7. Using Playwright's built-in AxelBuild Accessibilty feature, scan for accessibility issues
- **Expected Result:** 
  - The first 100 articles on the 'New' page should be displayed in ascending order, from the most recent to the oldest, even after loading more articles by clicking the "More" button.
  - There should be no easily detectable accessibility violations
_ **Post Conditions:**
- Browsers Should be closed

- **Actual Result:**
- Pages loads on Screen
- The first 100 articles ARE sorted from least to greatest
- 4 Accessibility Violations detected


- **Pass/Fail Criteria:**
- Pass: If selected elements load
- Fail: If selected elements dont load
- Pass: If all 100 articles are correctly sorted from newest to oldest.
- Fail: If any article is out of order.
- Pass: If there are/arent accessibility violations, but any violations will be logged

## Author

- LinkedIn - [@KarenDouglas](https://www.linkedin.com/in/karen-douglas-344974246/)
- Frontend Mentor - [@KarenDouglas](https://www.frontendmentor.io/profile/KarenDouglas)
- Twitter - [@CodeNoob4Life](https://twitter.com/CodeNoob4Life)
- GitHub -[@KarenDouglas](https://github.com/KarenDouglas)