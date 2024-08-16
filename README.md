# 🐺 QA Wolf Take Home Assignment

Welcome to the QA Wolf take home assignment for our [QA Engineer](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe) role! We appreciate your interest and look forward to seeing what you come up with.

## Instructions

This assignment has two questions as outlined below. When you are done, send [qa-hiring@qawolf.com](mailto:qa-hiring@qawolf.com) the following:

1. A link to a zip file of this folder on Google Drive 

2. A note indicating your work location (Country/State)

3. A note of how you found this job post (LinkedIn, Handshake, Wellfound, referral, etc.)

### Question 1

In this assignment, you will create a script on [Hacker News](https://news.ycombinator.com/) using JavaScript and Microsoft's [Playwright](https://playwright.dev/) framework. 

1. Install node modules by running `npm i`.

2. Edit the `index.js` file in this project to go to [Hacker News/newest](https://news.ycombinator.com/newest) and validate that EXACTLY the first 100 articles are sorted from newest to oldest. You can run your script with the `node index.js` command.

Note that you are welcome to update Playwright or install other packages as you see fit, however you must utilize Playwright in this assignment.

### Question 2

Why do you want to work at QA Wolf? Please record a short, ~2 min video that includes:

1. Your answer 

2. A walk-through demonstration of your code, showing a successful execution

Post the link in `why_qa_wolf.txt` (Please use [Loom](https://www.loom.com) to record your response). The answer and walkthrough should be combined into *one* video.

## Frequently Asked Questions

### What is your hiring process? When will I hear about next steps?

This take home assignment is the first step in our hiring process, followed by a final round interview if it goes well. **We review every take home assignment submission and promise to get back to you either way within one week (usually sooner).** The only caveat is if we are out of the office, in which case we will get back to you when we return. If it has been more than one week and you have not heard from us, please do follow up.

The final round interview is a 2-hour technical work session that reflects what it is like to work here. We provide a $150 stipend for your time for the final round interview regardless of how it goes. After that, there may be a short chat with our director about your experience and the role.

Our hiring process is rolling where we review candidates until we have filled our openings. If there are no openings left, we will keep your contact information on file and reach out when we are hiring again.

### How do you decide who to hire?

We evaluate candidates based on three criteria:

- Technical ability (as demonstrated in the take home and final round)
- Customer service orientation (as this role is customer facing)
- Alignment with our values (captured [here](https://www.notion.so/qawolf/QA-Wolf-QA-Engineer-Remote-156203a1e476459ea5e6ffca972d0efe))

This means whether we hire you is based on how you do during our interview process, not on your previous experience (or lack thereof). Note that you will also need to pass a background check to work here as our customers require this.

### How can I help my application stand out?

We've found that our best hires have been the most enthusiastic throughout our process. If you are very excited about working here, please feel free to go above and beyond on this assignment.



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
Pass: If selected elements load
Fail: If selected elements dont load
Pass: If all 100 articles are correctly sorted from newest to oldest.
Fail: If any article is out of order.
Pass: If there are/arent accessibility violations, but any violations will be logged

