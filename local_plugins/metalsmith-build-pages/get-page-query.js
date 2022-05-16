const commonTags = require("common-tags");

// query fragments
const includeFragment = require("./query-fragments/include");
const sectionedPageFragment = require("./query-fragments/sectioned-page");
const sectionImageBanner = require("./query-fragments/section-image-banner");
const sectionIntroFragment = require("./query-fragments/section-intro");
const sectionMediaFragment = require("./query-fragments/section-media");
const sectionCtaBannerFragment = require("./query-fragments/section-cta-banner");
const sectionMapFragment = require("./query-fragments/section-map");
const paragraphCommonsFragment = require("./query-fragments/paragraph-commons");
const paragraphTextFragment = require("./query-fragments/paragraph-text");
const paragraphCtasFragment = require("./query-fragments/paragraph-ctas");
const paragraphAudioFragment = require("./query-fragments/paragraph-audio");
const paragraphImageFragment = require("./query-fragments/paragraph-image");
const paragraphLottieFragment = require("./query-fragments/paragraph-lottie");
const paragraphVideoFragment = require("./query-fragments/paragraph-video");
const paragraphGeomapFragment = require("./query-fragments/paragraph-geomap");
const paragraphMapMarkersFragment = require("./query-fragments/paragraph-map-markers");

module.exports = commonTags.oneLineTrim`
  ${includeFragment}
  ${sectionedPageFragment}
  ${sectionImageBanner}
  ${sectionIntroFragment}
  ${sectionMediaFragment}
  ${sectionCtaBannerFragment}
  ${sectionMapFragment}
  ${paragraphCommonsFragment}
  ${paragraphTextFragment}
  ${paragraphCtasFragment}
  ${paragraphAudioFragment}
  ${paragraphImageFragment}
  ${paragraphLottieFragment}
  ${paragraphVideoFragment}
  ${paragraphGeomapFragment}
  ${paragraphMapMarkersFragment}
`;
