const ChainedBackend = require("i18next-chained-backend/dist/cjs/i18nextChainedBackend.js");
const FSBackend = require("i18next-fs-backend/cjs");
const HttpBackend = require("i18next-http-backend/cjs");
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
        backends: [FSBackend, MultiLoadBackendAdapter],
        backendOptions: [
            backendOptions.FSBackend,
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
