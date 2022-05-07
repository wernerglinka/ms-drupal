const ctas = function(allParagraphs, obj, sectionBaseComponentsData, key) {
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
  sectionBaseComponentsData[key].push(temp);
};

module.exports = ctas;
