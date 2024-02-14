import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
	schema: process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000',
	documents: ['src/**/*.js', 'src/**/*.tsx'],
	generates: {
		'./src/types/graphql/': {
			preset: 'client',
			plugins: []
		}
	}
};

export default config;