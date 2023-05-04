import { fetch } from "@/libraries/axios";

export const withAuth = (callback?: any) => {
    fetch.post('/auth/info').then(result => {
        if (typeof callback == 'function') {
            callback();
        }
    }).catch(error => {
        window.location.href = '/auth0';
    });
};
