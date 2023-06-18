import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const HomeCountdown = ({ date, onDone = null }: { date: Date | null, onDone?: any }) => {
  const [doneCountdown, setDoneCountdown] = useState(false);
  const [days, setDays] = useState<any>("0");
  const [hours, setHours] = useState<any>("0");
  const [minutes, setMinutes] = useState<any>("0");
  const [seconds, setSeconds] = useState<any>("0");

  const getTimeNow = () => {
    const timeNowString = new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const timeNowSplit = timeNowString.split(" ");
    const dateNow = timeNowSplit[1].split("/");
    const timeNow = timeNowSplit[0].split(":");
    const _i = (str: string) => parseInt(str);
    return new Date(
      _i(dateNow[2]),
      _i(dateNow[1]),
      _i(dateNow[0]),
      _i(timeNow[0]),
      _i(timeNow[1]),
      _i(timeNow[2]),
    );
  };

  useEffect(() => {
    if (!date) return;
    const interval = setInterval(() => {
      const now = getTimeNow();

      const difference = date.getTime() - now.getTime();

      if (difference <= 0) {
        setDoneCountdown(true);
        clearInterval(interval);
        if (typeof onDone == "function") {
          onDone();
        }
        ;
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      setDays(d < 10 ? "0" + d : d);

      const h = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      setHours(h < 10 ? "0" + h : h);

      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      setMinutes(m < 10 ? "0" + m : m);

      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setSeconds(s < 10 ? "0" + s : s);

      if (d <= 0 && h <= 0 && m <= 0 && s <= 0) {
        setDoneCountdown(true);
        if (typeof onDone == "function") {
          onDone();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  return (
    <Stack direction="row" justifyContent="center">
      {!doneCountdown && date && (
        <>
          <Typography component="span" fontSize="32px">{days}</Typography>
          <Typography component="span" fontSize="32px">:</Typography>
          <Typography component="span" fontSize="32px">{hours}</Typography>
          <Typography component="span" fontSize="32px">:</Typography>
          <Typography component="span" fontSize="32px">{minutes}</Typography>
          <Typography component="span" fontSize="32px">:</Typography>
          <Typography component="span" fontSize="32px">{seconds}</Typography>
        </>
      )}
    </Stack>
  );
};
