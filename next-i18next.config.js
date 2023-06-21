const HttpApi = require("i18next-http-backend/cjs");
const {instance: axios} = require("./lib/axios");

module.exports = {
    debug: false,
    i18n: {
        locales: ["ar"],
        defaultLocale: "ar"
    },
    use: [HttpApi],
    backend: {
        loadPath: "{{lng}}|{{ns}}",
        request: async (options, url, payload, callback) => {
            try {
                const [lng, ns] = url.split("|");
                await axios.get("/translations", {
                    params: {ns},
                }).then((response) => {
                    console.log("callback")
                    callback(null, {
                        data: response.data.data[lng][ns],
                        status: 200
                    });
                }).catch((error) => {
                    console.log(error.response);
                });
            } catch (e) {
                callback(null, {
                    status: 500
                });
            }
        }
    },
    reloadOnPrerender: true,
    serializeConfig: false
};
