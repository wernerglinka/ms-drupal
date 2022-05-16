const debug = require("debug")("metalsmith-drupal-data-source-structured-pages");
const fetch = require("node-fetch");
const buildInitialPageObject = require("./get-page-object");
const buildPageSections = require("./get-page-sections");
const getPageQueryData = require("./get-page-query");

/**
 * @typedef Options
 * @property {String} key
 */

/** @type {Options} */
const defaults = {
  source: "",
};

/**
 * Normalize plugin options
 * @param {Options} [options]
 * @returns {Object}
 */
function normalizeOptions(options) {
  return Object.assign({}, defaults, options || {});
}

/**
 * A Metalsmith plugin to fetch sectioned page data from a Drupal JSON API.
 *
 * @param {Options} options
 * @returns {import('metalsmith').Plugin}
 */
function buildSectionedPages(options) {
  options = normalizeOptions(options);
  if (options.source === "") {
    debug("Found no source option");
    return function metadata() {};
  }
  debug("Running with options: %O", options);

  return (files, metalsmith, done) => {
    /**
     * Get the page data from the api
     * The site content is managed by a Drupal9 site and the content is fetched via the site JSON API
     */
    const serverUrl = options.source;
    const pageURL = "/jsonapi/node/sectioned_page";
    const sectionedPagesRequest = serverUrl + pageURL + getPageQueryData;

    debug("Request URL: %O", sectionedPagesRequest);

    // fetch all page data from the API
    fetch(sectionedPagesRequest)
      .then(response => response.json())
      .then(json => {
        // Get all pages data. Page data includes the page id which we need to get the page sections
        const pageData = json.data.filter(thisPage => thisPage.type.includes("sectioned_page"));
        // Get all paragraphs. All sections and base components are paragraphs. This list will
        // be used to get the page sections and then the section base components data
        const allParagraphs = json.included;

        debug("All available sections and base components: %O", allParagraphs);

        // Build all pages
        pageData.forEach(thisPage => {
          // get the page name
          const pageName = thisPage.attributes.title.toLowerCase().replace(/\s/g, "-");

          debug("Page Name: %O", pageName);

          // Build the initial page object
          // includes the page metadata and template
          const pageObj = buildInitialPageObject(thisPage);

          // Build the page sections
          const pageSections = buildPageSections(thisPage, allParagraphs);

          // Build the final page object to be added to the files object
          const page = {
            ...pageObj,
            sections: pageSections,
            contents: Buffer.from("A sectioned page"),
            stats: {
              atime: new Date(),
            },
          };

          debug("Page File: %O", page);

          // This is the key for the page object
          const fileName = `${pageName}.md`;

          // Add page to metalsmith object
          files[fileName] = page;
        });

        done();
      });
  };
}

module.exports = buildSectionedPages;
