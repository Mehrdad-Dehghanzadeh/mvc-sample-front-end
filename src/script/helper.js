/**
 * @param {Object} source
 * @param {Object} properties
 * @returns {Object} assign (merge) two object
 */
function merge(source, properties) {
    for (var property in properties) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(property)) {
            source[property] = properties[property];
        }
    }
    return source;
}

/**
 * Remove whitespace from a string
 * @private
 * @param {String} string
 * @returns {String}
 */
function trim(string) {
    return string.replace(/^\s+|\s+$/g, '');
}

module.exports = {
    merge,
    trim,
};
