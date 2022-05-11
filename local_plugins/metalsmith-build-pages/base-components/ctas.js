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
