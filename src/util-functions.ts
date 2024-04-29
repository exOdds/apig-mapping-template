/**
 * This file defines the functions available through the $util namespace in the API Gateway mapping templates.
 * 
 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#util-template-reference
 */

/**
 * Performs the base64 encoding of a string. This is made available through the `$util.base64Encode` method in the mapping templates.
 * 
 * @param input The string to be encoded
 * @returns The base64 encoded string
 */
export const base64Encode = (input: string): string => {
	return btoa(input);
}

/**
 * Performs the base64 decoding of a string. This is made available through the `$util.base64Decode` method in the mapping templates.
 * 
 * @param input The string to be decoded
 * @returns The base64 decoded string
 */
export const base64Decode = (input: string): string => {
	return atob(input);
}

/**
 * Performs the URL encoding (to the 'application/x-www-form-urlencoded' format) of a string. This is made available through the `$util.urlEncode` method in the mapping templates.
 * 
 * @param input The string to be encoded
 * @returns The URL encoded string
 */
export const urlEncode = (input: string): string => {
	return encodeURIComponent(input);
}

/**
 * Performs the URL decoding of a string. This is made available through the `$util.urlDecode` method in the mapping templates.
 * 
 * @param input The string to be decoded
 * @returns The URL decoded string
 */
export const urlDecode = (input: string): string => {
	return decodeURIComponent(input);
}

// The below is taken from a previous implementation - https://github.com/ToQoz/api-gateway-mapping-template/blob/6505b5d1501d474bf7b356c650299f1e68709dff/index.js#L163C1-L175C2
// I recognize $util.escapeJavaScript as almost `escapeJSONString` and implemented so.
// c.f. 24.3.2.2 Runtime Semantics: QuoteJSONString ( value )
//   http://www.ecma-international.org/ecma-262/6.0/index.html#sec-quotejsonstring
//   DO: 2.a -> 2.b -> 2.c -> 2.d
const escapeJavaScriptTable: { [key: string]: string } = {
	'"': '\"',    // 2.a
	'\\': '\\\\',
	'\b': '\\b',  // 2.b (skip abbrev)
	'\f': '\\f',
	'\n': '\\n',
	'\r': '\\r',
	'\t': '\\t',
};
// 2.c
for (var code = 0; code < 20; code++) {
	escapeJavaScriptTable[String.fromCharCode(code)] = ((code < 16) ? '\\u000' : '\\u00') + code.toString(16);
}

/**
 * Escapes any javascript characters from the input string. This is made available through the $util.escapeJavaScript() method in the mapping templates.
 * 
 * @param input The string to escape.
 * @returns The escaped string.
 */
export const escapeJavaScript = (input: string): string => {
	return input.split("").map((c) => {
		return escapeJavaScriptTable[c] || c;
	}).join("");
}

/**
 * Parses a JSON string into an object. This is made available through the `$util.parseJson` method in the mapping templates.
 * 
 * @param input The JSON string to parse.
 * @returns The parsed JSON object.
 */
export const parseJson = (input: string): any => {
	return JSON.parse(input);
}