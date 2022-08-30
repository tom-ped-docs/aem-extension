import { URLS as SAMSUNG_URLS, START_KEYS as SAMSUNG_START_KEYS, END_KEYS as SAMSUNG_END_KEYS } from './module-samsung.mjs';
import { URLS as IQOS_URLS, START_KEYS as IQOS_START_KEYS, END_KEYS as IQOS_END_KEYS } from './module-iqos.mjs';
const sanitizeStart = (url, key, object) => {
    let sanitizedUrl = url;
    if (sanitizedUrl.startsWith(object[key]))
        sanitizedUrl = sanitizedUrl.slice(object[key].length);
    if (sanitizedUrl.startsWith('/'))
        sanitizedUrl = sanitizedUrl.slice(1);
    return sanitizedUrl;
};
const sanitizeEnd = (url, key, object) => {
    let sanitizedUrl = url;
    if (sanitizedUrl.endsWith(object[key]))
        sanitizedUrl = sanitizedUrl.slice(0, sanitizedUrl.length - object[key].length);
    if (sanitizedUrl.endsWith('/'))
        sanitizedUrl = sanitizedUrl.slice(0, sanitizedUrl.length - 1);
    return sanitizedUrl;
};
const sanitizeUrl = (url) => {
    let sanitizedUrl = url;
    sanitizedUrl = sanitizedUrl.trim();
    sanitizedUrl = sanitizedUrl.toLowerCase();
    SAMSUNG_START_KEYS.forEach((key) => { sanitizedUrl = sanitizeStart(sanitizedUrl, key, SAMSUNG_URLS); });
    IQOS_START_KEYS.forEach((key) => { sanitizedUrl = sanitizeStart(sanitizedUrl, key, IQOS_URLS); });
    SAMSUNG_END_KEYS.forEach((key) => { sanitizedUrl = sanitizeEnd(sanitizedUrl, key, SAMSUNG_URLS); });
    IQOS_END_KEYS.forEach((key) => { sanitizedUrl = sanitizeEnd(sanitizedUrl, key, IQOS_URLS); });
    return sanitizedUrl;
};
export default sanitizeUrl;
