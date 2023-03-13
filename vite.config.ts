import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg}']
			},
			manifest: {
				short_name: 'WhatsApp Link Generator',
				name: 'WhatsApp Link Generator',
				start_url: '/',
				scope: '/',
				display: 'standalone',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				icons: [
					{
						src: '/wa-link-gen-192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: '/wa-link-gen-512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: '/wa-link-gen-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			devOptions: {
				enabled: true
			}
		}),
		visualizer({
			emitFile: true,
			filename: 'stats.html'
		})
	]
});
