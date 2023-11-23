import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit(), nodePolyfills()],

	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer']
	}
});
