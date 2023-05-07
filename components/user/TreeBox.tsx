import { Box, Typography } from "@mui/material"

export const TreeBox = ({ user, row = 0 }: { user: any, row?: number }) => {
    return (
        <Box>
            <Typography component="h3">{row + " " + user.fullname}</Typography>
            {user.children && user.children.map((child: any) => (
                <TreeBox user={child} key={child.id} row={row + 1} />
            ))}
        </Box>
    )
}
