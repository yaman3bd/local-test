const Axios = require("axios");
const process = require("process");

const instance = Axios.create({
    baseURL: "https://api.msaaq.test/v1/tenant",
    withCredentials: false,
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
    }
});

const setTenantDomain = (req) => {
    if (process.env.NEXT_PUBLIC_APP_URL) {
        instance.defaults.headers.common["X-Academy-Domain"] = process.env.NEXT_PUBLIC_APP_URL;

        return;
    }

    if (typeof req === "string") {
        instance.defaults.headers.common["X-Academy-Domain"] = req;

        return;
    }

    if (typeof req === "object" && req.headers && req.headers.host) {
        instance.defaults.headers.common["X-Academy-Domain"] = req.headers.host;

        return;
    }

    throw new Error("Invalid request parameter");
};

const setAuthToken = (token) => {
    if (token) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common["Authorization"];
    }
};

const setCurrentAcademyId = (academyId) => {
    if (academyId) {
        instance.defaults.headers.common["X-Academy-ID"] = academyId;
    } else {
        delete instance.defaults.headers.common["X-Academy-ID"];
    }
};

module.exports = {
    instance,
    setTenantDomain,
    setAuthToken,
    setCurrentAcademyId
};
