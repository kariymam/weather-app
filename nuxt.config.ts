// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			// update Nuxt defaults
			charset: 'utf-16',
			viewport: 'width=device-width,user-scalable=no',
			link: [
				{ rel: 'stylesheet', href: 'https://unpkg.com/open-props' },
				{ rel: 'stylesheet', href: "https://unpkg.com/open-props/normalize.min.css" }],
		}
	},
	modules: [
		'@nuxt/eslint',
		[
			'@pinia/nuxt', { autoImports: ['defineStore'] },
		],
		'@nuxtjs/device',
		'nuxt-svgo',
		'@nuxt/image',
	],
	svgo: {
		autoImportPath: 'public/svg',
		defaultImport: 'component',
	},
	imports: {
		dirs: ['store'],
	},
	devtools: { enabled: true },
	runtimeConfig: {
		mpbx: process.env.MAPBOX_API_KEY,
		openweather: process.env.OPENWEATHER_API_KEY,
	},
	compatibilityDate: '2025-05-15',
	eslint: {
		config: {
			stylistic: {
				semi: true,
				quotes: 'single',
				indent: 'tab',
			},
		},
	},
	experimental: {
		componentIslands: true
	}
});