export type Academy = {
  id: number;
  title: string;
  subtitle: null | string;
  logo: null | string;
  favicon: null | string;
  domain: string;
  locale: string;
  currency: string;
  meta_keywords: Array<string>;
  meta_description: string;
  meta_image: string;
  colors: {
    primary: string;
    headline: string;
    paragraph: string;
    secondary: string;
    "section-dark": string;
    "section-light": string;
  };
  font_family: null | string;
  font_body: null | string;
  links: {
    maroof: null | string;
    tiktok: null | string;
    podcast: null | string;
    twitter: null | string;
    youtube: null | string;
    facebook: null | string;
    snapchat: null | string;
    telegram: null | string;
    whatsapp: null | string;
    instagram: null | string;
    soundcloud: null | string;
  };
  meta: {
    unbranded: boolean;
    gdpr_enabled: boolean;
    gdpr_content: null | string;
    show_verified_status: boolean;
  };
  nelc_compliant: boolean;
  sms_available: boolean;
  is_affiliate_open: boolean;
  is_verified: boolean;
};
