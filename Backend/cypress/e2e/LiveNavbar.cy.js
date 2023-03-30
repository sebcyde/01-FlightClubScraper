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

describe("Executing Tests", () => {
  it("Running Live Navbar Tests", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://flightclubdarts.com/");

    // // Navbar Location Link
    // cy.get("#main-nav ul li").eq(0).trigger("mouseover");
    // cy.get(
    //   "#main-nav ul li.fc_locations-menu .fc_locations-container .fc_other-locations-uk.active"
    // )
    //   .find(".location-city")
    //   .should("be.visible")
    //   .should("have.css", "font-family", "Didot-Italic");

    // cy.get("#main-nav ul li")
    //   .eq(1)
    //   .find(".fc_nav-current-location a")
    //   .should("be.visible")
    //   .find("a")
    //   .should("be.visible")
    //   .should("have.css", "font-size", "12px")
    //   .should("have.css", "font-family", "BrandonGrotesqueWeb-Reg");

    // cy.get("#main-nav ul li")
    //   .eq(2)
    //   .find(".fc_nav-current-location a")
    //   .should("be.visible")
    //   .find("a")
    //   .should("be.visible")
    //   .should("have.css", "font-size", "12px")
    //   .should("have.css", "font-family", "BrandonGrotesqueWeb-Reg");

    // cy.get("#main-nav ul li")
    //   .eq(3)
    //   .find(".fc_nav-current-location a")
    //   .should("be.visible")
    //   .find("a")
    //   .should("be.visible")
    //   .should("have.css", "font-size", "12px")
    //   .should("have.css", "font-family", "BrandonGrotesqueWeb-Reg");

    // cy.get("#main-nav ul li")
    //   .eq(4)
    //   .find(".fc_nav-current-location a")
    //   .should("be.visible")
    //   .find("a")
    //   .should("be.visible")
    //   .should("have.css", "font-size", "12px")
    //   .should("have.css", "font-family", "BrandonGrotesqueWeb-Reg");

    it("stuff", () => {
      // Banner Headers
      cy.get(`h2`)
        .should("have.css", "font-size", "40px")
        .should("have.css", "font-family", "BebasNeue-bold")
        .each((header) => {
          header.should("satisfy", ($el) => {
            const style = window.getComputedStyle($el);
            return (
              style.color == "rgb(255, 255, 255)" ||
              style.color == "rgb(14, 25, 21)"
            );
          });
        });

      // Banner Copy
      cy.get("p")
        .should("have.css", "font-size", "18px")
        .should("have.css", "font-family", "BrandonGrotesqueWeb-Reg")
        .each((copy) => {
          copy.should("satisfy", ($el) => {
            const style = window.getComputedStyle($el);
            return (
              style.color == "rgb(255, 255, 255)" ||
              style.color == "rgb(14, 25, 21)"
            );
          });
        });
    });
  });
});
