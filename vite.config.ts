import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	optimizeDeps: {
		include: ['@project-serum/anchor', '@solana/web3.js', 'buffer']
	}
});
