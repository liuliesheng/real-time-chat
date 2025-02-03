/**
 * 是否是绝对url
 * @param {string} url
 * @returns {boolean}
 */
export const isAbsoluteURL = (url) => {
	// A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	// RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	// by any combination of letters, digits, plus, period, or hyphen.
	return /^([a-z][a-z\d+-.]*:)?\/\//i.test(url);
};

/**
 * 组合url
 * @param {string} baseURL
 * @param {string} relativeURL
 * @returns {string}
 */
export const combineURL = (baseURL, relativeURL) => {
	return relativeURL
		? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
		: baseURL;
};
