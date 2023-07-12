import { Box, Button, Typography } from "@mui/material";
import { CallSupport } from "../ui/CallSupport";
import { DialogQc } from "../home/DialogQc";

export const LuckyWheel = ({ active = false }: { active?: boolean }) => {
  const HasTag = (hasTag: string) => {
    return (
      <>
        <Typography component="span" fontWeight={700}>{hasTag}&nbsp;</Typography>
      </>
    )
  }

  return (
    <Box display={active ? "block" : "none"}>
      <Box sx={{ fontSize: '18px', padding: '15px' }}>
        📢🔥 <b>&quot;Thịnh vượng cùng An Khang&quot;</b> - Chương trình khuyến mãi lớn đang đổ bộ!
        <br />
        <br />
        🌟🎉 Bạn đã sẵn sàng cho sự kiện thịnh vượng lớn? Hãy cùng <b>An Khang</b> trải nghiệm cảm giác <b>&quot;Mua là có - Quay là trúng&quot;</b>!
        <br />
        <br />
        🎁🎉 Chương trình khuyến mãi đặc biệt này dành cho tất cả khách hàng, bất kể bạn muốn mua bất cứ sản phẩm nào từ <b>An Khang</b>. Chỉ cần đặt hàng từ 1 sản phẩm trở lên, bạn sẽ có cơ hội tham gia quay trúng thưởng và nhận ngay những phần quà vô cùng hấp dẫn!
        <br />
        <br />
        🎁🌟 Hãy tưởng tượng một chút, bạn có thể nhận được những phần quà gì khi tham gia chương trình này?
        <br />
        <br />
        🎟️✨ Vé sức khỏe để chăm sóc tình trạng sức khoẻ của bạn, hộp tri thức để khám phá thêm những điều thú vị trong cuộc sống hoặc sẽ là hộp bí mật có chứa giữ những phần quà đầy mê hoặc.... Đó chỉ là một phần nhỏ trong vô vàn những phần quà hấp dẫn đang chờ đón bạn.
        <br />
        <br />
        ⏰🎉 Thời gian áp dụng của chương trình kéo dài từ ngày 12/7 đến 31/7. Đừng để lỡ cơ hội hiếm có này!
        <br />
        <br />
        🎉🎁 Hãy tham gia ngay <b>&quot;Thịnh Vượng Cùng An Khang&quot;</b> và cùng chúng tôi chinh phục những phần quà hấp dẫn!
        <br />
        <br />
        <Box sx={{ wordBreak: 'break-word' }}>
          {HasTag("#AnKhangGroup")}
          {HasTag("#ThịnhVượngCùngAnKhang")}
          {HasTag("#MuaLàCóQuayLàTrúng")}
          {HasTag("#KhuyếnMãi")}
          {HasTag("#RinhQuà")}
          {HasTag("#HấpDẫn")}
        </Box>
      </Box>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button variant="contained">Vào vòng quay may mắn</Button>
      </Box>
      <DialogQc />
      <CallSupport bottom="100px" />
    </Box>
  );
};
