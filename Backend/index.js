// Dependencies
const puppeteer = require("puppeteer");
const cypress = require("cypress");
const axios = require("axios");
const fs = require("fs");
const Colours = [
  "#ef4358",
  "#db3d4f",
  "#9f2936",
  "#631417",
  "#00a479",
  "#038762",
  "#003C27",
  "#ffffff",
  "#rgba(255, 255, 255, 0.5)",
  "#000000",
  "#0e1915",
  "#1a2421",
  "#212b28",
  "#e2e3e3",
  "#f0f1f1",
  "#403b2c",
  "#4b4739",
  "#f5f2ef",
  "#efece6",
  "#e8e2da",
  "#E5DFD6",
  "#55bec7",
  "#45999b",
  "#3B2359",
  "#E5BE3D",
];

// Components
const { BannerButtonsTests } = require("./Banners/BannerButtonTests.js");
const { BannerHeaderTests } = require("./Banners/BannerHeaderTests.js");
const { BannerCopyTests } = require("./Banners/BannerCopyTests.js");

(async () => {
  const URL = "https://flightclubdarts.com/";
  const FileName = `./cypress/fixtures/TestData`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Generate Tests and create TestData.json file
  const ExtractData = async (PageSize = "Desktop") => {
    // Navigate to the website
    await page.goto(URL);

    if (PageSize == "Desktop")
      await page.setViewport({ width: 1920, height: 1080 });
    if (PageSize == "Mobile")
      await page.setViewport({ width: 390, height: 844 });

    // Generate Banner Tests

    const BannerExtraction = async () => {
      const Banners = await Promise.all([
        BannerHeaderTests(page, URL, Colours),
        BannerCopyTests(page, URL, Colours),
        BannerButtonsTests(page, URL, Colours),
      ]);

      // Banners.forEach((element) => {
      //   console.log("Example Header:", element);
      // });

      // console.log("Test Example:", JSON.stringify(Banners.flat()[0].test));

      // If Test Data already exists - delete it
      if (fs.existsSync(`${FileName}.json`)) {
        console.log(`Removing existing Test Data File at: ${FileName}.json`);
        fs.unlinkSync(`${FileName}.json`);
        console.log("Removal successful");
      }

      // Write test cases to new file
      try {
        console.log(`Creating new test data file at: ${FileName}.json`);
        fs.writeFileSync(
          `${FileName}.json`,
          JSON.stringify(Banners.flat()).replace("][", "],["),
          {
            flag: "a",
          }
        );
        console.log("Test data file creation successful");
      } catch (error) {
        console.log(`Failed to create new test data file`);
        console.log("Error:", err);
      }

      // Log the file path for debugging purposes
      console.log(`All Banner test cases written to ${FileName}`);
    };

    await BannerExtraction();

    // Close the browser instance
    await browser.close();
  };

  // Test Execution
  const ExecuteLiveTests = async () => {
    console.log("Starting Live Site Tests");

    const NavbarOptionsChrome = {
      browser: "chrome",
      spec: "./cypress/e2e/LiveNavbar.cy.js",
    };

    const Results = (results) => {
      if (results.status === "failed") {
        console.log("Test Execution Failed");
        console.log("Reason:", results.message);
      } else {
        console.log("Live Test Execution Successful");
        // console.log("Executed Tests:", results.runs[0].tests);
      }
    };

    await cypress.run(NavbarOptionsChrome).then((results) => Results(results));
  };

  const ExecuteStagingTests = async () => {};

  const ExecuteLocalTests = async () => {};

  await ExtractData();
  await ExecuteLiveTests();

  // // Extract the page header text using a CSS selector
  // const headerText = await page.$eval('h1', (el) => el.textContent.trim());

  // // Extract the navigation menu links using CSS selectors
  // const navLinks = await page.$$eval('#nav li a', (links) =>
  // 	links.map((link) => link.href)
  // );

  // Extract the page footer text using a CSS selector
  // const footerElement = await page.$eval('.fc_footer');
})();
