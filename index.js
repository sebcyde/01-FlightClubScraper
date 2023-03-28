// Dependencies
const puppeteer = require('puppeteer');
const cypress = require('cypress');
const axios = require('axios');
const fs = require('fs');

// Components
const { BannerButtonsTests } = require('./Banners/BannerButtonTests.js');
const { BannerHeaderTests } = require('./Banners/BannerHeaderTests.js');
const { BannerCopyTests } = require('./Banners/BannerCopyTests.js');

(async () => {
	const URL = 'https://flightclubdarts.com/';
	const FileName = `./cypress/fixtures/TestData`;
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Generate Tests and create TestData.json file
	const ExtractData = async () => {
		// Navigate to the website
		await page.goto(URL);

		// Generate Banner Tests

		const BannerExtraction = async () => {
			const Banners = await Promise.all([
				BannerHeaderTests(page, URL, FileName),
				BannerCopyTests(page, URL, FileName),
				BannerButtonsTests(page, URL, FileName),
			]);

			console.log('Test Example:', JSON.stringify(Banners.flat()[0].test));

			// If Test Data already exists - delete it
			if (fs.existsSync(`${FileName}.json`)) {
				console.log(`Removing existing Test Data at: ${FileName}.json`);
				fs.unlinkSync(`${FileName}.json`);
				console.log('Removal successful');
			}

			// Write test cases to new file
			try {
				console.log(`Creating new test data file at: ${FileName}.json`);
				fs.writeFileSync(
					`${FileName}.json`,
					JSON.stringify(Banners.flat()).replace('][', '],['),
					{
						flag: 'a',
					}
				);
				console.log('Test data file creation successful');
			} catch (error) {
				console.log(`Failed to create new test data file`);
				console.log('Error:', err);
			}

			// Log the file path for debugging purposes
			console.log(`All Banner test cases written to ${FileName}`);
		};

		await BannerExtraction();

		// Close the browser instance
		await browser.close();
	};

	// Execute the tests in TestData.json
	const ExecuteTests = async () => {
		await cypress
			.run({
				browser: 'chrome',
				spec: './cypress/e2e/spec.cy.js',
			})
			.then((results) => {
				if (results.status === 'failed') {
					console.log('Test Execution Failed');
					console.log('Reason:', results.message);
				} else {
					console.log('Test Execution Successful');
					console.log(results);
				}
			});

		//
		//
		//
		// cypress.open({
		// 	config: {
		// 		baseUrl: URL,
		// 	},
		// });
		//
		//
		//
	};

	// await ExtractData();
	await ExecuteTests();

	// // Extract the page header text using a CSS selector
	// const headerText = await page.$eval('h1', (el) => el.textContent.trim());

	// // Extract the navigation menu links using CSS selectors
	// const navLinks = await page.$$eval('#nav li a', (links) =>
	// 	links.map((link) => link.href)
	// );

	// Extract the page footer text using a CSS selector
	// const footerElement = await page.$eval('.fc_footer');
})();
