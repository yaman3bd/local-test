const axios = require("axios");

exports.FSBackend = {
    loadPath: "./public/locales_cache/{{lng}}/{{ns}}.json",
    addPath: "./public/locales_cache/{{lng}}/{{ns}}.json",
    expirationTime: 15 * 1000 // all 30 seconds the cache should be deleted
};

exports.HttpBackend = {
    loadPath: "{{lng}}|{{ns}}",
    allowMultiLoading: true,
    request: async (options, url, payload, callback) => {
        try {
            const [lng, ns] = url.split("|");

            await axios
                .get("http://localhost:3001/api/translations", {
                    params: {lng, ns}
                })
                .then((response) => {
                    callback(null, {
                        data: response.data.data,
                        status: 200
                    });
                })
                .catch((error) => {
                    // eslint-disable-next-line no-console
                    console.log("response error: ", error.response.data);
                    callback(null, {
                        status: 500
                    });
                });
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log("catch error: ", e);
            callback(null, {
                status: 500
            });
        }
    }
};
