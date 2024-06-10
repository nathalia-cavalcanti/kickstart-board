import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import pluginEnv from 'vite-plugin-vue-env';
import tsconfigPaths from 'vite-tsconfig-paths'
import { updateCommonjsPlugin } from './commonjs-plugin';
import constants from './constants'

const { SECRET_ACCESS_KEY_AWS, ACCESS_KEY_ID_AWS, API_MOCK_BASE_URL } = constants;

export default defineConfig({
  define: {
    'process.env': {
      SECRET_ACCESS_KEY_AWS,
      ACCESS_KEY_ID_AWS,
      API_MOCK_BASE_URL
    },
    global: 'window',
  },
  plugins: [
    vue(),
    svgLoader(),
    pluginEnv(),
    updateCommonjsPlugin(),
    istanbul({
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      include: 'src/*',
      cypress: true
    }),
    tsconfigPaths({ extensions: ['.ts', '.d.ts'] })
  ],
});