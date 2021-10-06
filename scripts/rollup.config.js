import typescript from 'rollup-plugin-typescript2';
import json from '@rollup/plugin-json';

export default {
	input: 'src/index.ts',
	plugins: [
		json(),
		typescript({
			tsconfig: './tsconfig.json'
		})
	],
	output: [
		{
			format: 'umd',
			name: 'Tree',
			file: 'build/Tree.js',
			sourcemap: true,
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/Tree.module.js',
			sourcemap: false,
			indent: '\t'
		}
	]
};
