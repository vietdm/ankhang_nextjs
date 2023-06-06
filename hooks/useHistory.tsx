import { useRouter } from 'next/router';
import { useContext, createContext, useEffect, useState } from 'react';

const HistoryManagerContext = createContext<ReturnType<typeof useHistoryManager>>({
    history: [],
    canGoBack: () => false
});

export const useHistory = () => useContext(HistoryManagerContext);

export const HistoryManagerProvider = ({ value, children }: { value: any, children: any }) => {
    return (
        <HistoryManagerContext.Provider value={value} >
            {children}
        </HistoryManagerContext.Provider>
    )
}

export const useHistoryManager = () => {
    const router = useRouter();
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        if (!router) return
        const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
            if (!shallow) {
                setHistory(prevState => [...prevState, url]);
            }
        };

        router.beforePopState(() => {
            setHistory(prevState => prevState.slice(0, -2));
            return true;
        });

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    return { history, canGoBack: () => history.length > 1 };
}
