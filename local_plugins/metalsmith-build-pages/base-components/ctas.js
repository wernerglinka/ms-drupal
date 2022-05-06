const ctas = function() {
  let temp = {};
  baseComponents[key].forEach(baseComponentObject => {
    // Match base component ID with a paragraph ID
    allParagraphs.forEach(paragraph => {
      if (paragraph.id === baseComponentObject.id) {
        // Normalize the keys and build a temporary object
        Object.keys(paragraph.attributes).forEach(pkey => {
          if (pkey.startsWith("field_")) {
            const newKey = pkey.replace("field_", "");
            temp = { ...temp, [newKey]: paragraph.attributes[pkey] };
          }
        });
      }
    });
    sectionBaseComponentsData[key].push(temp);
  });
};

module.exports = ctas;
