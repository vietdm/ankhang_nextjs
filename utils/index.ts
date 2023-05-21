export const youtubeParser = (url: string) => {
    const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[1].length == 11) ? match[1] : '';
}

export const userLevel = (level: string | undefined) => {
    switch (level) {
        case 'nomal': return 'Khách hàng';
        case 'chuyen_vien': return 'Chuyên viên';
        case 'truong_phong': return 'Trưởng phòng';
        case 'pho_giam_doc': return 'Phó giám đốc';
        case 'giam_doc': return 'Giám đốc';
        case 'giam_doc_cap_cao': return 'Giám đốc cấp cao';
        default: return 'Không rõ';
    }
}

export const formatMoney = (amount: any, decimalCount = 0, decimal = ".", thousands = ",") => {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i: any = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    let hour: string | number = date.getHours();
    let minute: string | number = date.getMinutes();
    let second: string | number = date.getSeconds();

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;
    if (hour < 10) hour = '0' + hour;
    if (minute < 10) minute = '0' + minute;
    if (second < 10) second = '0' + second;

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
