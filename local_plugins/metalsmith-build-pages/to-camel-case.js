const toCamel = s => {
  return s.replace(/([-_][a-z])/gi, $1 => {
    return $1
      .toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

const isArray = function(a) {
  return Array.isArray(a);
};

const isObject = function(o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

/**
 * Source: https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
 * @param {Object} obj
 * @returns {Object}
 * @example
 * const obj = {
 *  'foo_bar': 'baz',
 *  'foo_bar_baz': 'qux',
 *  'foo_bar_baz_qux': 'quux',
 *  'foo_bar_baz_qux_quuz': 'corge'
 * };
 * toCamelCase(obj);
 * // => {
 * //   fooBar: 'baz',
 * //   fooBarBaz: 'qux',
 * //   fooBarBazQux: 'quux',
 * //   fooBarBazQuxQuuz: 'corge'
 * // }
 * @returns {Object}
 */

const keysToCamel = function(o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  }
  if (isArray(o)) {
    return o.map(i => {
      return keysToCamel(i);
    });
  }

  return o;
};

module.exports = keysToCamel;
