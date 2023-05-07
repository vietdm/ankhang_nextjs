import { Stack } from "@mui/material";

export const TreeBox = ({ user, parent = 0, row = 0 }: { user: any, parent?: number, row?: number }) => {
    if (!user || !user?.fullname) return <></>;
    return (
        <>
            <Stack direction="row" display={row > 1 ? 'flex' : 'flex'} data-parent={parent} data-id={user?.id}>
                <h3
                    style={{
                        whiteSpace: 'nowrap',
                        marginLeft: (row * 20) + "px",
                        width: '100%',
                        padding: '4px 0',
                        fontWeight: row == 0 ? '700' : '400'
                    }}
                    onClick={() => {
                        // document.querySelectorAll(`[data-parent="${user.id}"]`).forEach(el => {
                        //     el.style.display = el.style.display == 'flex' ? 'none' : 'flex';
                        // });
                    }}
                >
                    {user.fullname}
                </h3>
            </Stack>
            {user.children && user.children.map((child: any) => (
                <TreeBox user={child} key={child.id} row={row + 1} parent={user.id} />
            ))}
        </>
    )
}
