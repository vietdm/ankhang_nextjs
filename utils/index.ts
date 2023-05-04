export const youtubeParser = (url: string) => {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length == 11) ? match[1] : '';
}

export const userLevel = (level: string | undefined) => {
    switch (level) {
        case 'nomal': return 'Người dùng';
        case 'chuyen_vien': return 'Chuyên viên';
        case 'truong_phong': return 'Trưởng phòng';
        case 'pho_giam_doc': return 'Phó giám đốc';
        case 'giam_doc': return 'Giám đốc';
        case 'giam_doc_cap_cao': return 'Giám đốc cấp cao';
        default: return 'Không rõ';
    }
}
