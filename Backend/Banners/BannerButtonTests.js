const puppeteer = require("puppeteer");

const BannerButtonsTests = async (page, URL, Colours) => {
  const BannerButtons = await page.$$eval("a", (Buttons) =>
    Buttons.map((Button) => {
      if (Button.innerText == "") return;

      const style = window.getComputedStyle(Button);
      return {
        classes: Button.getAttribute("class"),
        fontSize: style.getPropertyValue("font-size"),
        fontWeight: style.getPropertyValue("font-weight"),
        fontFamily: style.getPropertyValue("font-family"),
        backgroundcolor: style.getPropertyValue("background-color"),
        color: style.getPropertyValue("color"),
        textContent: Button.innerText,
        isClickable: !Button.disabled,
        href: Button.href,
      };
    })
  );

  const BannerButtonTests = BannerButtons.filter(
    (el) => el !== null || undefined
  ).map((Button, index) => {
    console.log(
      `Generating Banner Button Test (${index + 1}/${BannerButtons.length})`
    );

    return {
      name: `${Button.textContent.replace(/\n/g, "")} Banner Button Test`,
      classes: Button.classes,
      TestType: "Button",
      test: [
        {
          name: "Verifies button text content",
          test: {
            selector: "button",
            assertion: "contain",
            value: `${Button.textContent.replace(/\n/g, "")}`,
          },
        },
        {
          name: "Verifies button font sizing",
          test: {
            selector: "button",
            assertion: "have.css",
            property: "font-size",
            value: Button.fontSize,
            expected: "14px",
          },
        },
        {
          name: "Verifies button font family",
          test: {
            selector: "button",
            assertion: "have.css",
            property: "font-family",
            value: Button.fontFamily,
            expected: "BrandonGrotesqueWeb-bold",
          },
        },
        {
          name: "Verifies button background color",
          test: {
            selector: "button",
            assertion: "have.css",
            property: "background-color",
            value: Button.backgroundcolor,
            expected: Colours,
          },
        },
        {
          name: "Verifies button link ",
          test: {
            selector: "button",
            link: Button.href,
          },
        },
      ],
    };
  });

  BannerButtonTests.forEach((element, index) => {
    if (index == 0 || (index == 1 && element.test)) {
      console.log("Example Button:", element);
      element.test.forEach((test) => console.log(test));
    }
  });

  console.log(
    `Generated ${BannerButtons.length} banner Button tests successfully`
  );

  return BannerButtonTests;
};

module.exports = { BannerButtonsTests };
