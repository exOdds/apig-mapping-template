/**
 * This file performs the unit testing of the functions available through the $util namespace in the API Gateway mapping templates.
 * The functions are defined in the util-functions.ts file.
 */

import { base64Encode, base64Decode, urlEncode, urlDecode, escapeJavaScript, parseJson } from "../src/util-functions";

describe("base64Encode", () => {
	test("should encode a string to base64", () => {
		expect(base64Encode("Hello, World!")).toBe("SGVsbG8sIFdvcmxkIQ==");
	});

	test("should encode an empty string to base64", () => {
		expect(base64Encode("")).toBe("");
	});

	test("should encode a string with special characters to base64", () => {
		expect(base64Encode("Hello, World!@#$%^&*()")).toBe("SGVsbG8sIFdvcmxkIUAjJCVeJiooKQ==");
	});
});

describe("base64Decode", () => {
	test("should decode a base64 string", () => {
		expect(base64Decode("SGVsbG8sIFdvcmxkIQ==")).toBe("Hello, World!");
	});

	test("should decode an empty string", () => {
		expect(base64Decode("")).toBe("");
	});

	test("should decode a base64 string with special characters", () => {
		expect(base64Decode("SGVsbG8sIFdvcmxkIUAjJCVeJiooKQ==")).toBe("Hello, World!@#$%^&*()");
	});
});

describe("urlEncode", () => {
	test("should encode a string to URL format", () => {
		expect(urlEncode("Hello, World!")).toBe("Hello%2C%20World!");
	});

	test("should encode an empty string to URL format", () => {
		expect(urlEncode("")).toBe("");
	});

	test("should encode a string with special characters to URL format", () => {
		expect(urlEncode("Hello, World!@#$%^&*()")).toBe("Hello%2C%20World!%40%23%24%25%5E%26*()");
	});
});

describe("urlDecode", () => {
	test("should decode a URL encoded string", () => {
		expect(urlDecode("Hello%2C%20World!")).toBe("Hello, World!");
	});

	test("should decode an empty string", () => {
		expect(urlDecode("")).toBe("");
	});

	test("should decode a URL encoded string with special characters", () => {
		expect(urlDecode("Hello%2C%20World!%40%23%24%25%5E%26*()")).toBe("Hello, World!@#$%^&*()");
	});
});

describe("escapeJavaScript", () => {
	test("should escape a string", () => {
		expect(escapeJavaScript(`{"key":"value"}`)).toBe(`{\"key\":\"value\"}`);
	});

	test("should escape a string with special characters", () => {
		expect(escapeJavaScript(`{"key\n":"value","key2":"value2"}"`)).toBe(`{\"key\\u000a\":\"value\",\"key2\":\"value2\"}\"`);
	});
})

describe("parseJson", () => {
	test("should parse a JSON string", () => {
		expect(parseJson(`{"key":"value"}`)).toEqual({ key: "value" });
	});

	test("should parse a JSON string with special characters", () => {
		expect(parseJson(`{"key\\u000a":"value","key2":"value2"}`)).toEqual({ "key\n": "value", key2: "value2" });
	});
})