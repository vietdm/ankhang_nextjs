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
    cashback_point: number;
    package_joined: 'star' | 'vip';
}

export const useUser = () => {
    const [user, setUser] = useState<UserInterface | null>(null);
    useEffect(() => {
        fetch.post('auth/info').then((result: any) => {
            setUser(result.user);
        }).catch(() => {
            window.location.href = '/auth0';
        });
    }, []);
    return { user };
}
