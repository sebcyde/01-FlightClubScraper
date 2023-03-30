const puppeteer = require("puppeteer");

const BannerHeaderTests = async (page, URL, Colours) => {
  await page.setViewport({ width: 1000, height: 500 });
  const BannerHeaders = await page.$$eval("h2", (Headers) =>
    Headers.filter((el) => el.innerText !== "").map((Header) => {
      const style = window.getComputedStyle(Header);

      return {
        classes: Header.getAttribute("class"),
        fontSize: style.getPropertyValue("font-size"),
        fontWeight: style.getPropertyValue("font-weight"),
        fontFamily: style.getPropertyValue("font-family"),
        color: style.getPropertyValue("color"),
        textContent: Header.innerText,
      };
    })
  );

  const BannerHeaderTests = BannerHeaders.filter(
    (el) => el !== null || undefined
  ).map((Header, index) => {
    console.log(
      `Generating Banner Header Test (${index + 1}/${BannerHeaders.length})`
    );

    return {
      hidden: Header.textContent == null || "" || undefined ? true : false,
      name: `${Header.textContent} Banner Header Test`,
      classes: Header.classes,
      TestType: "Header",
      test: [
        {
          name: "Verifies H2 Text",
          test: {
            url: `${URL}`,
            selector: "h2",
            assertion: "contain",
            value: `${Header.textContent}`,
          },
        },
        {
          name: "Verifies H2 font sizing",
          test: {
            url: `${URL}`,
            selector: "h2",
            assertion: "have.css",
            property: "font-size",
            value: "42px",
          },
        },
        {
          name: "Verifies H2 font weighting",
          test: {
            url: `${URL}`,
            selector: "h2",
            assertion: "have.css",
            property: "font-weight",
            value: "700",
          },
        },
        {
          name: "Verifies H2 font family",
          test: {
            url: `${URL}`,
            selector: "h2",
            assertion: "have.css",
            property: "font-family",
            value: "BebasNeue-bold",
          },
        },
        {
          name: "Verifies H2 color",
          test: {
            url: `${URL}`,
            selector: "h2",
            assertion: "have.css",
            property: "color",
            value: Header.color,
            options: Colours,
          },
        },
      ],
    };
  });

  // BannerHeaderTests.forEach((element) => {
  //   console.log("Example Header:", element);
  // });

  return BannerHeaderTests;
};

module.exports = { BannerHeaderTests };
