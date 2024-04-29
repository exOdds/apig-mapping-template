/**
 * This file contains the test cases for the `render` function made available by this library.
 */

import render from "../src/index";

describe("render", () => {

	/**
	 * Tests for the $input.body method.
	 */
	describe("input.body", () => {
		test("should render the payload", () => {
			const template = "$input.body";
			const payload = "Hello, World!";
			expect(render(template, payload)).toBe(payload);
		});

		test("should render an empty payload", () => {
			const template = "$input.body";
			const payload = "";
			expect(render(template, payload)).toBe(payload);
		});

		test("should render a payload with special characters", () => {
			const template = "$input.body";
			const payload = "Hello, World!@#$%^&*()";
			expect(render(template, payload)).toBe(payload);
		});

		test("should render a payload with a parameter", () => {
			const template = "$input.body";
			const payload = "Hello, World!";
			expect(render(template, payload)).toBe(payload);
		});
	});

	/**
	 * Tests for the $util.base64Encode method.
	 */
	describe("base64Encode", () => {
		test("should encode a string to base64", () => {
			const template = "$util.base64Encode('Hello, World!')";
			const payload = "";
			expect(render(template, payload)).toBe("SGVsbG8sIFdvcmxkIQ==");
		});

		test("should encode an empty string to base64", () => {
			const template = "$util.base64Encode('')";
			const payload = "";
			expect(render(template, payload)).toBe("");
		});

		test("should encode a string with special characters to base64", () => {
			const template = "$util.base64Encode('Hello, World!@#$%^&*()')";
			const payload = "";
			expect(render(template, payload)).toBe("SGVsbG8sIFdvcmxkIUAjJCVeJiooKQ==");
		});

		test("should encode a string to base64 with a payload", () => {
			const template = "$util.base64Encode($input.body)";
			const payload = "Hello, World!";
			expect(render(template, payload)).toBe("SGVsbG8sIFdvcmxkIQ==");
		});
	});

	/**
	 * Tests for the $util.base64Decode method.
	 */
	describe("base64Decode", () => {
		test("should decode a base64 string", () => {
			const template = "$util.base64Decode('SGVsbG8sIFdvcmxkIQ==')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello, World!");
		});

		test("should decode an empty string", () => {
			const template = "$util.base64Decode('')";
			const payload = "";
			expect(render(template, payload)).toBe("");
		});

		test("should decode a base64 string with special characters", () => {
			const template = "$util.base64Decode('SGVsbG8sIFdvcmxkIUAjJCVeJiooKQ==')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello, World!@#$%^&*()");
		});

		test("should decode a base64 string with a payload", () => {
			const template = "$util.base64Decode($input.body)";
			const payload = "SGVsbG8sIFdvcmxkIQ==";
			expect(render(template, payload)).toBe("Hello, World!");
		});
	});

	/**
	 * Tests for the $util.urlEncode method.
	 */
	describe("urlEncode", () => {
		test("should encode a string to URL format", () => {
			const template = "$util.urlEncode('Hello, World!')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello%2C%20World!");
		});

		test("should encode an empty string to URL format", () => {
			const template = "$util.urlEncode('')";
			const payload = "";
			expect(render(template, payload)).toBe("");
		});

		test("should encode a string with special characters to URL format", () => {
			const template = "$util.urlEncode('Hello, World!@#$%^&*()')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello%2C%20World!%40%23%24%25%5E%26*()");
		});

		test("should encode a string to URL format with a payload", () => {
			const template = "$util.urlEncode($input.body)";
			const payload = "Hello, World!";
			expect(render(template, payload)).toBe("Hello%2C%20World!");
		});
	});

	/**
	 * Tests for the $util.urlDecode method.
	 */
	describe("urlDecode", () => {
		test("should decode a URL encoded string", () => {
			const template = "$util.urlDecode('Hello%2C%20World!')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello, World!");
		});

		test("should decode an empty string", () => {
			const template = "$util.urlDecode('')";
			const payload = "";
			expect(render(template, payload)).toBe("");
		});

		test("should decode a URL encoded string with special characters", () => {
			const template = "$util.urlDecode('Hello%2C%20World!%40%23%24%25%5E%26*()')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello, World!@#$%^&*()");
		});

		test("should decode a URL encoded string with a payload", () => {
			const template = "$util.urlDecode($input.body)";
			const payload = "Hello%2C%20World!";
			expect(render(template, payload)).toBe("Hello, World!");
		});
	});

	/**
	 * Tests for the $util.escapeJavaScript method.
	 */
	describe("escapeJavaScript", () => {
		test("should escape a string with special characters", () => {
			const template = "$util.escapeJavaScript('Hello, World!@#$%^&*()')";
			const payload = "";
			expect(render(template, payload)).toBe("Hello, World!@#$%^&*()");
		});

		test("should escape a string with special characters with a payload", () => {
			const template = "$util.escapeJavaScript($input.body)";
			const payload = "Hello, World!@#$%^&*()";
			expect(render(template, payload)).toBe("Hello, World!@#$%^&*()");
		});

		test("should escape a string with special characters with a payload and a parameter", () => {
			const template = "$util.escapeJavaScript($input.body)";
			const payload = "Hello, World!"
			expect(render(template, payload)).toBe("Hello, World!");
		});

		test("should escape a string with special characters with a payload and a parameter", () => {
			const template = "$util.escapeJavaScript($input.body)";
			const payload = "Hello, World!"
			expect(render(template, payload)).toBe("Hello, World!");
		});
	});

	/**
	 * Tests for the $util.parseJson method.
	 */
	describe("parseJson", () => {
		test("should parse a JSON string", () => {
			const template = "$util.parseJson('{\"hello\": \"world\"}')";
			const payload = "";
			expect(render(template, payload)).toEqual(`{hello=world}`);
			expect(render(template + ".hello", payload)).toEqual("world");
		});

		test("should parse a JSON string with a payload", () => {
			const template = "$util.parseJson($input.body)";
			const payload = `{"hello": "world"}`;
			expect(render(template, payload)).toEqual(`{hello=world}`);
			expect(render(template + ".hello", payload)).toEqual("world");
		});

		test("should parse a JSON string with nested array", () => {
			const template = "$util.parseJson($input.body)";
			const payload = `{"hello": ["world"]}`;
			expect(render(template, payload)).toEqual(`{hello=[world]}`);
			expect(render(template + ".hello[0]", payload)).toEqual("world");
		});

		test("should parse a JSON string with nested array with mutliple entries", () => {
			const template = "$util.parseJson($input.body)";
			const payload = `{"hello": ["world", "world2"]}`;
			expect(render(template, payload)).toEqual(`{hello=[world, world2]}`);
			expect(render(template + ".hello[0]", payload)).toEqual("world");
			expect(render(template + ".hello[1]", payload)).toEqual("world2");
		});
	});
});