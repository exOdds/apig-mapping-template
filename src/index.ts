import { Compile, parse} from "velocityjs";
import { base64Decode, base64Encode, escapeJavaScript, parseJson, urlDecode, urlEncode } from "./util-functions"

/**
 * Renders a mapping template given a template string, payload, and optional parameters and context.
 * 
 * TODO: The context parameter should be typed.
 * 
 * @param template The mapping template to render.
 * @param payload The payload to render the template with.
 * @param params The parameters that
 * @param context The context to render the template with.
 */
const render = (template: string, payload: string, params?: Map<string, string>, context?: any): string => {

	const data = {

		input: {
			body: payload,
		},

		/**
		 * The $util namespace provides utility functions that you can use in mapping templates.
		 * 
		 * @see https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-mapping-template-reference.html#util-template-reference
		 */
		util: {
			escapeJavaScript,
			parseJson,

			urlEncode,
			urlDecode,
			
			base64Encode,
			base64Decode
		}
	};

	// Form AST
	const ast = parse(template);

	// Perform render
	return (new Compile(ast, {
		escape: false
	})).render(data, undefined, true);
}

export default render;