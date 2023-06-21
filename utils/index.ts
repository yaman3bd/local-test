export function getWildcardCookiePath() {
  const envHost = process.env.NEXT_PUBLIC_APP_URL;

  if (envHost) return envHost;

  const { host, hostname } = window.location;

  if (host.split(".").length === 1) {
    return hostname;
  } else {
    let domainParts = host.split(".");

    domainParts.shift();

    return "." + domainParts.join(".");
  }
}

export function getHostName() {
  try {
    const { hostname } = window.location;

    return hostname;
  } catch (error) {}
}

export const IS_CLIENT: boolean = typeof window !== "undefined";

export const toEnglishDigits = (str: string): string => {
  const persianNumbers: RegExp[] = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const arabicNumbers: RegExp[] = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNumbers[i], i.toString()).replace(arabicNumbers[i], i.toString());
  }

  return str;
};

export const isEnglish = (value: string): boolean => {
  const regExp: RegExp = /^[A-Za-z0-9]*$/;

  return regExp.test(value);
};

export const isNumeric = (value: string): boolean => {
  const regExp: RegExp = /^[0-9]*$/;

  return regExp.test(value);
};
