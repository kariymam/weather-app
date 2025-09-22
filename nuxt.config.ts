// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
    head: {
      // update Nuxt defaults
      charset: 'utf-16',
      viewport: 'width=device-width,user-scalable=no',
		}
	},
	modules: [
		'@nuxt/eslint',
		'vuetify-nuxt-module',
		['@pinia/nuxt', { autoImports: ['defineStore'] },
		]],
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
