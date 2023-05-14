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
    },
    getPackageName(package_joined: any) {
        if (package_joined == 'star') return 'Star';
        if (package_joined == 'vip') return 'VIP';
        return 'Chưa tham gia gói';
    },
    getPositionName(position: string) {
        switch (position) {
            case 'nomal': return 'Người dùng';
            case 'chuyen_vien': return 'Chuyên viên';
            case 'truong_phong': return 'Trưởng phòng';
            case 'pho_giam_doc': return 'Phó giám đốc';
            case 'giam_doc': return 'Giám đốc';
            case 'giam_doc_cap_cao': return 'Giám đốc cấp cao';
            default: return 'Không rõ';
        }
    }
}
