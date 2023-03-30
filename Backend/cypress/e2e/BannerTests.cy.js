describe('Desktop Homepage Tests', () => {
	before(() => {
		cy.visit('https://flightclubdarts.com/');
		cy.viewport(1920, 1080);
	});
	// H2 Elements Tests
	describe('Testing h2 elements styles', () => {
		it('should test the styles of each h2 element', { retries: 1 }, () => {
			cy.fixture('../fixtures/BannerHeaders/BannerHeaderData.json').then(
				(h2Styles) => {
					cy.log(h2Styles);
					h2Styles.forEach((style) => {
						cy.get('h2')
							.contains(style.Text)
							.then((header) => {
								debugger;
								cy.log('header:', header);
								if (style.test && Array.isArray(style.test)) {
									debugger;
									style.test.forEach((test, index) => {
										if (test.test && test.test.assertion) {
											debugger;
											cy.get('h2')
												.contains(style.Text)
												.then(($el) => {
													return window.getComputedStyle($el[0]);
												})
												.invoke('getPropertyValue', test.test.check)
												.should(test.test.assertion, test.test.value);
											debugger;
											cy.log('Current H2 Index: ', index);
											cy.log('Current H2 Check: ', test.test.check);
											cy.log('Current H2 Value: ', test.test.value);
										}
									});
								}
							});
					});
				}
			);
		});
	});
});
