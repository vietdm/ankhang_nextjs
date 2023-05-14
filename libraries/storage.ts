export const Storage = {
    set(name: string, value: string) {
        localStorage.setItem(name, value);
    },
    get(name: string) {
        return localStorage.getItem(name);
    },
    delete(name: string) {
        localStorage.removeItem(name);
    },
    has(name: string) {
        return localStorage.hasOwnProperty(name);
    }
}
