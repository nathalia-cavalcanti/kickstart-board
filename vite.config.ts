import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import pluginEnv from 'vite-plugin-vue-env';
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  define: {
    'process.env': {},
    global: {},
  },
  plugins: [
    vue(),
    svgLoader(),
    pluginEnv(),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      include: 'src/*',
      cypress: true
    }),
    tsconfigPaths({ extensions: ['.ts', '.d.ts'] })
  ],
});