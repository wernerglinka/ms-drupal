const isColorDark = function(color) {
  const rgb = color
    .replace("rgba(", "")
    .replace(")", "")
    .trim()
    .split(",");

  const yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
  return yiq < 128;
};

module.exports = isColorDark;
