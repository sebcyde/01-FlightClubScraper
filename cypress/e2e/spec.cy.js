const { BannerCopyTests } = require(`./${
	new Date().toLocaleDateString().replace(/\//g, '') +
	new Date()
		.toLocaleTimeString('en-GB', {
			hour: 'numeric',
		})
		.replace(/:/g, '')
}`);
const fs = require('fs');
const path = require('path');

const runTests = async () => {
	const tests = BannerCopyTests;

	for (const test of tests) {
		console.log('Current Test:', test);

		describe(test.name, () => {
			for (const step of test.test) {
				it(step.name, async () => {
					const { url, selector, assertion, property, value } = step.test;
					await cypress
						.visit(url)
						.get(selector)
						.should(assertion, property, value);
				});
			}
		});
	}

	try {
		await cypress.run();
	} catch (err) {
		console.error(err);
		expect.fail(err);
	}
};

runTests();
