// describe('Executing Tests', () => {
// 	it('Running...', () => {
// 		cy.fixture('TestData').then((testData) => {
// 			// describe(testData[1].name, () => {
// 			// 	it(
// 			// 		testData[1].name,
// 			// 		{
// 			// 			retries: 1,
// 			// 		},
// 			// 		() => {
// 			// 			cy.visit('https://flightclubdarts.com/');
// 			// 			// const { url, selector, assertion, property, value } =
// 			// 			// 	step.test;
// 			// 			// await cy.visit('https://flightclubdarts.com/');
// 			// 			// await cy.should(assertion, property, value);
// 			// 		}
// 			// 	);
// 			// });

// 			for (const test of testData) {
// 				if (test !== null) {
// 					// if (test.TestType == 'Header') {
// 					describe(test.name, () => {
// 						it(
// 							'Example',
// 							{
// 								retries: 1,
// 							},
// 							async () => {
// 								expect(true).to.equal(true);
// 								// const { url, selector, assertion, property, value } =
// 								// 	step.test;
// 								// await cy.visit(step.url);
// 								// await cy.get(selector);
// 								// await cy.should(assertion, property, value);
// 							}
// 						);
// 						// for (const step of test.test) {
// 						// 	it(
// 						// 		step.name,
// 						// 		{
// 						// 			retries: 1,
// 						// 		},
// 						// 		async () => {
// 						// 			expect(true).to.equal(true);
// 						// 			// const { url, selector, assertion, property, value } =
// 						// 			// 	step.test;
// 						// 			// await cy.visit(step.url);
// 						// 			// await cy.get(selector);
// 						// 			// await cy.should(assertion, property, value);
// 						// 		}
// 						// 	);
// 						// }
// 					});
// 				}
// 				// }
// 			}
// 		});
// 	});
// });

// Check Video
// Get object by classes instead of just h2

describe('Executing Tests', () => {
	it('Running...', () => {
		cy.viewport(1920, 1080);
		cy.visit('https://flightclubdarts.com/');
		cy.fixture('TestData').then((TestData) => {
			TestData.forEach((TestCase) => {
				if (TestCase !== null) {
					// Add element type conditional in here
					describe(TestCase.name, () => {
						TestCase.test.forEach((Test) => {
							const { url, selector, assertion, property, value } = Test.test;
							cy.log(Test.name);
							// cy.visit(url);
							cy.get(selector);
							// cy.log('Assertion:', assertion);
							// cy.log('Property:', property);
							// cy.log('Value:', value);
							cy.should(assertion, property, value);
						});
					});
				}
				cy.log('Break');
			});
		});
	});
});
