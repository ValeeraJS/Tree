import typescript from "rollup-plugin-typescript2";

export default {
	input: "src/index.ts",
	output: [
		{
			file: "build/Tree.js",
			format: "umd",
			indent: "\t",
			name: "Tree",
			sourcemap: true
		},
		{
			file: "build/Tree.module.js",
			format: "es",
			indent: "\t",
			sourcemap: false
		}
	],
	plugins: [
		typescript({
			tsconfig: "./tsconfig.json"
		})
	]
};
