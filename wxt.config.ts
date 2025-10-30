import {defineConfig} from 'wxt';

export default defineConfig({
    modules: ['@wxt-dev/module-react'],

    manifest: {
        permissions: ['storage', 'unlimitedStorage'],
        host_permissions: ['https://lorem-api.com/*']
    }
});
