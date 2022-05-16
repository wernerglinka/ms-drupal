/**
 * 
 * @param {Object} allParagraphs 
 * @param {Object} baseComponents 
 * @returns {Object}
 * @example
 * {
    "ctas": [
      {
        button_style: 'Primary',
        is_button: false,
        is_external: true,
        label: 'Visit Nunjucks',
        url: 'https://mozilla.github.io/nunjucks/'
      },
      ...
    ]
  }
 */
const ctas = function(allParagraphs, baseComponents) {
  const key = "ctas";
  const thisBaseComponent = [];

  baseComponents[key].forEach(obj => {
    let temp = {};
    // Match base component ID with a paragraph ID
    allParagraphs.forEach(paragraph => {
      if (paragraph.id === obj.id) {
        // Normalize the keys and build a temporary object
        Object.keys(paragraph.attributes).forEach(pkey => {
          temp = { ...temp, [pkey.replace("field_", "")]: paragraph.attributes[pkey] };
        });
      }
    });
    thisBaseComponent.push(temp);
  });
  return { [key]: thisBaseComponent };
};

module.exports = ctas;
