import {defineConfig} from 'wxt';

export default defineConfig({
    modules: ['@wxt-dev/module-react'],

    manifest: {
        permissions: [
            'storage', // open access to storage
            'unlimitedStorage' // "remove" storage size limit
        ],

        host_permissions: [
            'https://lorem-api.com/*' // just to test/check RTK query (outside api call)
        ]
    }
});
