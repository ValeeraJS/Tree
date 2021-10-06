import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	plugins: [
		json(),
		typescript({
			tsconfig: './tsconfig.legacy.json'
		})
	],
	output: [
		{
			format: 'umd',
			name: 'Tree',
			file: 'build/Tree.legacy.js',
			sourcemap: true,
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/Tree.legacy.module.js',
			sourcemap: false,
			indent: '\t'
		}
	]
};
