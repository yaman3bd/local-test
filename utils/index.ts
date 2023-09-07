export function getHostName() {
    try {
        const {hostname} = window.location;

        return hostname;
    } catch (error) {
    }
}

export const IS_CLIENT: boolean = typeof window !== "undefined";


