import { Box, Button, Stack, Typography } from "@mui/material";
import { CallSupport } from "../ui/CallSupport";
import { DialogBeforeSpin } from "./DialogBeforeSpin";
import { useState } from "react";
import { Alert } from "@/libraries/alert";
import { useRouter } from "next/router";

export const LuckyWheel = ({ active = false }: { active?: boolean }) => {
  const [openModalBeforeSpin, setOpenModalBeforeSpin] = useState<boolean>(false);
  const router = useRouter();

  const handleSuccess = () => {
    Alert.confirm('Phần quà từ vòng quay may mắn chỉ được trao tới bạn khi và chỉ khi chúng tôi có kết quả khảo sát từ quý khách hàng!', () => {
      router.push('/lucky-event');
    });
  }

  const HasTag = (hasTag: string) => {
    return (
      <>
        <Typography component="span" fontWeight={700}>{hasTag}&nbsp;</Typography>
      </>
    )
  }

  return (
    <Box display={active ? "block" : "none"}>
      <Box sx={{ fontSize: '18px', padding: '15px', paddingTop: 3 }}>
        📢🔥 <b>&quot;Thịnh vượng cùng An Khang&quot;</b> - Chương trình khuyến mãi lớn đang đổ bộ!
        <br />
        <br />
        🌟🎉 Bạn đã sẵn sàng cho sự kiện thịnh vượng lớn? Hãy cùng An Khang trải nghiệm cảm giác <b>&quot;Mua là có - Quay là trúng&quot;</b>!
        <br />
        <br />
        📢🎁 Chương trình khuyến mãi đặc biệt này dành cho tất cả khách hàng, bất kể bạn muốn mua bất cứ sản phẩm nào từ <b>An Khang</b>. Chỉ cần đặt hàng <b>từ 1 sản phẩm trở lên</b>, bạn sẽ có cơ hội tham gia quay trúng thưởng và nhận ngay những phần quà vô cùng hấp dẫn!
        <br />
        <br />
        ⏰🎉 Thời gian áp dụng của chương trình kéo dài từ ngày <b>14/7</b> đến <b>31/7</b>. Đừng để lỡ cơ hội hiếm có này!
        <br />
        <br />
        🎉🎁 Hãy tham gia ngay <b>&quot;Thịnh vượng cùng An Khang&quot;</b> và cùng chúng tôi chinh phục những phần quà hấp dẫn!
        <br />
        <br />

        <Stack flexWrap="wrap" direction="row">
          {HasTag("#AnKhangGroup")}
          {HasTag("#ThịnhVượngCùngAnKhang")}
          {HasTag("#MuaLàCóQuayLàTrúng")}
          {HasTag("#KhuyếnMãi")}
          {HasTag("#RinhQuà")}
          {HasTag("#HấpDẫn")}
        </Stack>
      </Box>
      <Box sx={{ textAlign: 'center' }}>
        <Button variant="contained" onClick={() => setOpenModalBeforeSpin(true)}>Vào vòng quay may mắn</Button>
      </Box>
      <DialogBeforeSpin open={openModalBeforeSpin} handleClose={() => setOpenModalBeforeSpin(false)} handleSuccess={handleSuccess} />
      <CallSupport bottom="100px" />
    </Box>
  );
};
