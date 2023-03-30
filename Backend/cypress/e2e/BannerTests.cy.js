describe('Desktop Homepage Tests', () => {
	beforeEach(() => {
		cy.visit('https://flightclubdarts.com/');
		cy.viewport(1920, 1080);
	});
	// H2 Elements Tests
	// describe('Testing H2 elements styles', () => {
	// 	it('should test the styles of each h2 element', { retries: 1 }, () => {
	// 		cy.fixture('../fixtures/BannerHeaders/BannerHeaderData.json').then(
	// 			(h2Styles) => {
	// 				cy.log(h2Styles);
	// 				h2Styles.forEach((style) => {
	// 					cy.get('h2')
	// 						.contains(style.Text)
	// 						.then((header) => {
	// 							debugger;
	// 							cy.log('header:', header);
	// 							if (style.test && Array.isArray(style.test)) {
	// 								debugger;
	// 								style.test.forEach((test, index) => {
	// 									if (test.test && test.test.assertion) {
	// 										debugger;
	// 										cy.get('h2')
	// 											.contains(style.Text)
	// 											.then(($el) => {
	// 												return window.getComputedStyle($el[0]);
	// 											})
	// 											.invoke('getPropertyValue', test.test.check)
	// 											.should(test.test.assertion, test.test.value);
	// 										debugger;
	// 										cy.log('Current H2 Index: ', index);
	// 										cy.log('Current H2 Check: ', test.test.check);
	// 										cy.log('Current H2 Value: ', test.test.value);
	// 									}
	// 								});
	// 							}
	// 						});
	// 				});
	// 			}
	// 		);
	// 	});
	// });

	// P Element Tests
	// describe('Testing P elements styles', () => {
	// 	it('should test the styles of each P element', { retries: 1 }, () => {
	// 		cy.fixture('../fixtures/BannerCopy/BannerCopyData.json').then(
	// 			(PTagData) => {
	// 				cy.log(PTagData);
	// 				PTagData.forEach((PTag) => {
	// 					if (PTag.Text.includes('Perfect for soaking up the atmosphere')) {
	// 						cy.get('p')
	// 							.filter(':contains("Perfect for soaking up the atmosphere")')
	// 							.then((Copy) => {
	// 								debugger;
	// 								cy.log('Copy:', Copy);
	// 								if (PTag.test && Array.isArray(PTag.test)) {
	// 									debugger;
	// 									PTag.test.forEach((test, index) => {
	// 										if (test.test && test.test.assertion) {
	// 											debugger;
	// 											cy.get('p')
	// 												.filter(
	// 													':contains("Perfect for soaking up the atmosphere")'
	// 												)
	// 												.then(($el) => {
	// 													return window.getComputedStyle($el[0]);
	// 												})
	// 												.invoke('getPropertyValue', test.test.check)
	// 												.should(test.test.assertion, test.test.value);
	// 											debugger;
	// 											cy.log('Current PTag Index: ', index);
	// 											cy.log('Current PTag Check: ', test.test.check);
	// 											cy.log('Current PTag Value: ', test.test.value);
	// 										}
	// 									});
	// 								}
	// 							});
	// 					} else if (
	// 						PTag.Text.includes(
	// 							'celebrate the festive season than with a bit of healthy competition'
	// 						)
	// 					) {
	// 						cy.get('p')
	// 							.filter(
	// 								':contains("celebrate the festive season than with a bit of healthy competition")'
	// 							)
	// 							.then((Copy) => {
	// 								debugger;
	// 								cy.log('Copy:', Copy);
	// 								if (PTag.test && Array.isArray(PTag.test)) {
	// 									debugger;
	// 									PTag.test.forEach((test, index) => {
	// 										if (test.test && test.test.assertion) {
	// 											debugger;
	// 											cy.get('p')
	// 												.filter(
	// 													':contains("celebrate the festive season than with a bit of healthy competition")'
	// 												)
	// 												.then(($el) => {
	// 													return window.getComputedStyle($el[0]);
	// 												})
	// 												.invoke('getPropertyValue', test.test.check)
	// 												.should(test.test.assertion, test.test.value);
	// 											debugger;
	// 											cy.log('Current PTag Index: ', index);
	// 											cy.log('Current PTag Check: ', test.test.check);
	// 											cy.log('Current PTag Value: ', test.test.value);
	// 										}
	// 									});
	// 								}
	// 							});
	// 					} else {
	// 						cy.contains(PTag.Text).then((Copy) => {
	// 							debugger;
	// 							cy.log('Copy:', Copy);
	// 							if (PTag.test && Array.isArray(PTag.test)) {
	// 								debugger;
	// 								PTag.test.forEach((test, index) => {
	// 									if (test.test && test.test.assertion) {
	// 										debugger;
	// 										if (
	// 											PTag.Text ==
	// 												'Guests must be 18+ to play Social Darts.' &&
	// 											test.test.check == 'font-size'
	// 										) {
	// 											cy.contains(PTag.Text)
	// 												.then(($el) => {
	// 													return window.getComputedStyle($el[0]);
	// 												})
	// 												.invoke('getPropertyValue', test.test.check)
	// 												.should(test.test.assertion, '15px');
	// 										} else {
	// 											cy.contains(PTag.Text)
	// 												.then(($el) => {
	// 													return window.getComputedStyle($el[0]);
	// 												})
	// 												.invoke('getPropertyValue', test.test.check)
	// 												.should(test.test.assertion, test.test.value);
	// 										}
	// 										debugger;
	// 										cy.log('Current PTag Index: ', index);
	// 										cy.log('Current PTag Check: ', test.test.check);
	// 										cy.log('Current PTag Value: ', test.test.value);
	// 									}
	// 								});
	// 							}
	// 						});
	// 					}
	// 				});
	// 			}
	// 		);
	// 	});
	// });

	// Button Tests
	// Example

	// Image Tests
	describe('Testing Image elements', () => {
		it(
			'should test the completion of each image element',
			{ retries: 1 },
			() => {
				cy.fixture('../fixtures/BannerImages/BannerImageData.json').then(
					(ImageData) => {
						cy.log(ImageData);
						ImageData.forEach((Image) => {
							cy.get(`[src='${Image.Source}']`).then((image) => {
								debugger;
								cy.log('image:', image);
								if (Image.test && Array.isArray(Image.test)) {
									debugger;
									Image.test.forEach((test) => {
										if (test.test && test.test.assertion) {
											debugger;
											if (test.test.check == 'Width') {
												cy.get(`[src='${Image.Source}']`)
													.should('have.prop', 'naturalWidth')
													.and('be.gt', 0);
											} else if (test.test.check == 'Height') {
												cy.get(`[src=${Image.Source}]`)
													.should('have.prop', 'naturalHeight')
													.and('be.gt', 0);
											} else {
												cy.get(`[src=${Image.Source}]`)
													.should('have.prop', 'complete')
													.and('equal', true);
											}
										}
									});
								}
							});
						});
					}
				);
			}
		);
	});
});
