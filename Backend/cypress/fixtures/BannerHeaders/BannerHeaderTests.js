describe('Testing h2 elements styles', () => {
	it('should test the styles of each h2 element', { retries: 1 }, () => {
		cy.fixture('./BannerHeaderData.json').then((h2Styles) => {
			cy.log(h2Styles);
			h2Styles.forEach((style) => {
				cy.get('h2')
					.contains(style.Text)
					.then((header) => {
						if (style.test && Array.isArray(style.test)) {
							style.test.forEach((test) => {
								if (test.test && test.test.assertion) {
									switch (test.test.assertion) {
										case 'equal':
											if (test.test.current === 'selector') {
												cy.get(test.test.selector).should(
													'have.css',
													test.test.property,
													test.test.value
												);
											} else {
												cy.wrap(header).should(
													'have.css',
													test.test.property,
													test.test.value
												);
											}
											break;
										case 'contain':
											if (test.test.current === 'selector') {
												cy.get(test.test.selector).should(
													'contain',
													test.test.value
												);
											} else {
												cy.wrap(header).should('contain', test.test.value);
											}
											break;
									}
								}
							});
						}
					});
			});
		});
	});
});
