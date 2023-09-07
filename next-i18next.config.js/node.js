const ChainedBackend = require("i18next-chained-backend/dist/cjs/i18nextChainedBackend.js");
const FSBackend = require("i18next-fs-backend/cjs");
const HttpBackend = require("i18next-http-backend/cjs");
const MultiloadAdapter = require("i18next-multiload-backend-adapter/cjs");

const backendOptions = require("./backendOptions");

module.exports = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    },
    use: [MultiloadAdapter, ChainedBackend],
    ns: ["auth", "otp", "common", "validation"],
    preload: ["en"],
    defaultNS: "common",
    backend: {
        backends: [FSBackend, HttpBackend],
        backendOptions
    },
    maxParallelReads: 50,
    serializeConfig: false
};
