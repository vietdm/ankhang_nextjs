import { Box, Stack } from "@mui/material";

export const Loading = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            maxHeight='100vh'
            height="100vh"
            overflow="hidden"
        >
            <Box sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                background: 'url("/imgs/bg_down_page.jpg")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}></Box>
            <svg className="loading_screen" viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="loading_screen-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
                        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                    </linearGradient>
                    <linearGradient id="loading_screen-grad2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="hsl(313,90%,55%)" />
                        <stop offset="100%" stop-color="hsl(223,90%,55%)" />
                    </linearGradient>
                </defs>
                <circle className="loading_screen__ring" cx="100" cy="100" r="82" fill="none" stroke="url(#loading_screen-grad1)" stroke-width="36" stroke-dasharray="0 257 1 257" stroke-dashoffset="0.01" stroke-linecap="round" transform="rotate(-90,100,100)" />
                <line className="loading_screen__ball" stroke="url(#loading_screen-grad2)" x1="100" y1="18" x2="100.01" y2="182" stroke-width="36" stroke-dasharray="1 165" stroke-linecap="round" />
            </svg>
        </Stack>
    );
}
