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

export const formatMoney = (amount, decimalCount = 0, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};
