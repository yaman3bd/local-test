const ChainedBackend = require("i18next-chained-backend/dist/cjs/i18nextChainedBackend.js");
const HttpBackend = require("i18next-http-backend/cjs");
const LocalStorageBackend = require("i18next-localstorage-backend").default;
const MultiLoadBackendAdapter = require("i18next-multiload-backend-adapter/cjs");

const backendOptions = require("./backendOptions");

const env = process.env.NODE_ENV;
module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    },
    use: [ChainedBackend],
    backend: {
        backends: [LocalStorageBackend, MultiLoadBackendAdapter],
        backendOptions: [
            {},
            {
                backend: HttpBackend,
                backendOption: backendOptions.HttpBackend
            }
        ]
    },
    ns: ["auth", "otp", "common", "validation"],
    preload: ["en"],
    defaultNS: "common",
    maxParallelReads: 50,
    serializeConfig: false,
    reloadOnPrerender: env === "development"
};
