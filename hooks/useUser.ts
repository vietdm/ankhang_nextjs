import { fetch } from "@/libraries/axios";
import { useEffect, useState } from "react";

export interface UserInterface {
    username: string;
    cccd: string;
    email: string;
    phone: string;
    fullname: string;
    present_phone: string;
    address: string;
    level: string;
}

export const useUser = () => {
    const [user, setUser] = useState<UserInterface | null>(null);
    useEffect(() => {
        fetch.post('auth/info').then(result => {
            setUser(result.user);
        }).catch(error => {
            window.location.href = '/auth0';
        });
    }, []);
    return { user };
}
