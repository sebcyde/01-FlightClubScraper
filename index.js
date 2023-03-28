// Dependencies
const puppeteer = require('puppeteer');
const cypress = require('cypress');
const axios = require('axios');

// Components
const { BannerHeaderTests } = require('./Banners/BannerHeaderTests.js');
const { BannerButtonsTests } = require('./Banners/BannerButtonTests.js');
const { BannerCopyTests } = require('./Banners/BannerCopyTests.js');
const { FilePathGenerator } = require('./Functions/FilePathGenerator.js');

// Launch a headless browser instance with Puppeteer
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const URL = 'https://flightclubdarts.com/';

	const FileName = `./cypress/e2e/${
		new Date().toLocaleDateString().replace(/\//g, '') +
		new Date()
			.toLocaleTimeString('en-GB', {
				hour: 'numeric',
			})
			.replace(/:/g, '')
	}`;

	const ExtractData = async () => {
		// Navigate to the website
		await page.goto(URL);

		// Generate Banner Tests
		const BannerHeaders = await BannerHeaderTests(page, URL, FileName);
		const BannerCopy = await BannerCopyTests(page, URL, FileName);
		const BannerButtons = await BannerButtonsTests(page, URL, FileName);

		// Close the browser instance
		await browser.close();

		// Return a path to the file containing the test JSON
		return FilePathGenerator();
	};

	const ExecuteTests = async (Path) => {
		// cypress
		// 	.run({
		// 		browser: 'chrome',
		// 		spec: './cypress/e2e/spec.cy.js',
		// 	})
		// 	.then((results) => {
		// 		console.log(results);
		// 	})
		// 	.catch((err) => {
		// 		console.error(err);
		// 	});
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

	const Path = await ExtractData();
	await ExecuteTests(Path);

	// // Extract the page header text using a CSS selector
	// const headerText = await page.$eval('h1', (el) => el.textContent.trim());

	// // Extract the navigation menu links using CSS selectors
	// const navLinks = await page.$$eval('#nav li a', (links) =>
	// 	links.map((link) => link.href)
	// );

	// Extract the page footer text using a CSS selector
	// const footerElement = await page.$eval('.fc_footer');
})();
