export const UserHelper = {
    build(data: any) {
        const children = data?.children;
        data = {
            name: data.fullname,
            attributes: {
                "N": data.email,
                "P": data.phone,
            },
            children: []
        };

        if (children) {
            for (const child of children) {
                data.children.push(this.build(child));
            }
        }

        return data;
    }
}
