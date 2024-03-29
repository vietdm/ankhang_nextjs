import { Error } from "@/components/ui/Error";
import { SinglePage } from "@/components/ui/SinglePage";
import { ErrorMessage } from "@hookform/error-message";
import { Autocomplete, Box, Button, Stack, TextField, Typography, createFilterOptions } from "@mui/material";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { fetch } from "@/libraries/axios";
import { useUser } from "@/hooks/useUser";
import { Alert } from "@/libraries/alert";
import { HrTag } from "@/components/ui/HrTag";
import { useRouter } from "next/router";

type FormValueNomal = {
  email: string;
  fullname: string;
  cccd: string;
};

type FormValueBank = {
  bin: string;
  branch: string;
  account_number: string;
};

const EditPage = () => {
  const [requesting, setRequesting] = useState<boolean>(false);
  const [banks, setBanks] = useState<any[]>([]);
  const { user } = useUser();
  const router = useRouter();
  const [showFormNomal, setShowFormNomal] = useState<boolean>(true);
  const [showFormBank, setShowFormBank] = useState<boolean>(false);
  const [bankValueSelect, setBankValueSelect] = useState<string>("");
  const [backHome, setBackHome] = useState<boolean>(false);

  const formValueNomal = useForm<FormValueNomal>({ defaultValues: { fullname: "loading.." } });
  const formValueBank = useForm<FormValueBank>({
    defaultValues: {
      bin: "loading..",
      branch: "loading..",
      account_number: "loading..",
    },
  });

  useEffect(() => {
    fetch.get("/banks").then((response: any) => {
      const banks = response.banks;
      setBanks(banks);
    });
    fetch.get("/user/bank").then((response: any) => {
      const bankInfo = response.bank_info;
      formValueBank.setValue("bin", bankInfo?.bin ?? "");
      formValueBank.setValue("branch", bankInfo?.branch ?? "");
      formValueBank.setValue("account_number", bankInfo?.account_number ?? "");
      setBankValueSelect(bankInfo?.bank_name ?? "");
    });
    if (router.query?.backhome == "1") {
      setBackHome(true);
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    formValueNomal.setValue("fullname", user.fullname);
  }, [user]);

  const onUpdateNomalInfo = formValueNomal.handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("/user/update/nomal", data)
      .then((response: any) => {
        setRequesting(false);
        Alert.success(response.message);
        setTimeout(() => router.replace(router.asPath), 100);
      })
      .catch((error: any) => {
        setRequesting(false);
        Alert.error(error.message);
      });
  });

  const onUpdateBankInfo = formValueBank.handleSubmit((data) => {
    setRequesting(true);
    fetch
      .post("/user/update/bank", data)
      .then((response: any) => {
        setRequesting(false);
        Alert.success(response.message);
      })
      .catch((error: any) => {
        setRequesting(false);
        Alert.error(error.message);
      });

  });

  const filterOptions = createFilterOptions({
    matchFrom: "any",
    stringify: (option: any) => `${option.code} ${option.short_name} ${option.name}`,
  });

  return (
    <SinglePage title="Cập nhật thông tin" hasBackIcon={!backHome} hasHomeIcon={backHome}>
      <Box paddingY={1}></Box>
      <Box>
        <Stack onClick={() => setShowFormNomal(!showFormNomal)} sx={{
          marginBottom: 1,
          background: "radial-gradient(#f4f9fd, #bae4f4)",
          color: "#0049a5",
          borderRadius: "4px",
          position: "relative",
        }}>
          <Typography component="h4" fontSize="20px" textAlign="center">Thông tin cơ bản</Typography>
          {showFormNomal ? (
            <ArrowDropDownOutlinedIcon
              sx={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)" }} />
          ) : (
            <ArrowRightOutlinedIcon
              sx={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)" }} />
          )}
        </Stack>
        {(showFormNomal && user) && (
          <form action="" onSubmit={onUpdateNomalInfo}>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <TextField
                id="fullname"
                label="Họ và tên"
                variant="standard"
                sx={{ width: "calc(100% - 60px)" }}
                type="text"
                role="presentation"
                {...formValueNomal.register("fullname", { required: "Họ và tên không được trống!" })}
              />
              <ErrorMessage errors={formValueNomal.formState.errors} name="fullname"
                            render={({ message }) => <Error mgs={message} />} />
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <Person2OutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <TextField
                id="username"
                label="Username"
                variant="standard"
                sx={{ width: "calc(100% - 60px)" }}
                type="text"
                value={user.username}
                InputProps={{
                  disabled: true,
                }}
              />
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <EmailOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              {user.email ? (
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  sx={{ width: "calc(100% - 60px)" }}
                  type="text"
                  value={user.email}
                  InputProps={{
                    disabled: true,
                  }}
                />
              ) : (
                <>
                  <TextField
                    id="email"
                    label="Email"
                    variant="standard"
                    sx={{ width: "calc(100% - 60px)" }}
                    type="text"
                    {...formValueNomal.register("email", { required: "Địa chỉ Email không được trống!" })}
                  />
                  <ErrorMessage errors={formValueNomal.formState.errors} name="email"
                                render={({ message }) => <Error mgs={message} />} />
                </>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              {user.cccd ? (
                <TextField
                  id="cccd"
                  label="Số CMT/CCCD"
                  variant="standard"
                  sx={{ width: "calc(100% - 60px)" }}
                  type="text"
                  InputProps={{
                    disabled: true,
                  }}
                  value={user.cccd}
                />
              ) : (
                <>
                  <TextField
                    id="cccd"
                    label="Số CMT/CCCD"
                    variant="standard"
                    sx={{ width: "calc(100% - 60px)" }}
                    type="text"
                    {...formValueNomal.register("cccd", { required: false })}
                  />
                </>
              )}
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <PhoneAndroidOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <TextField
                id="phone"
                label="Số điện thoại"
                variant="standard"
                sx={{ width: "calc(100% - 60px)" }}
                type="number"
                InputProps={{
                  disabled: true,
                }}
                value={user.phone}
              />
            </Stack>
            <Box textAlign="right">
              <Button variant="contained" type="submit" disabled={requesting}>Cập nhật</Button>
            </Box>
          </form>
        )}
      </Box>
      <HrTag />
      <Box>
        <Stack onClick={() => setShowFormBank(!showFormBank)} sx={{
          marginBottom: 2,
          background: "radial-gradient(#f4f9fd, #bae4f4)",
          color: "#0049a5",
          borderRadius: "4px",
          position: "relative",
        }}>
          <Typography component="h4" fontSize="20px" textAlign="center">Tài khoản ngân hàng</Typography>
          {showFormBank ? (
            <ArrowDropDownOutlinedIcon
              sx={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)" }} />
          ) : (
            <ArrowRightOutlinedIcon
              sx={{ position: "absolute", right: "4px", top: "50%", transform: "translateY(-50%)" }} />
          )}
        </Stack>
        {showFormBank && (
          <form action="" onSubmit={onUpdateBankInfo}>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <AccountBalanceOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <Autocomplete
                value={bankValueSelect}
                inputValue={bankValueSelect}
                onChange={(_, option: any) => {
                  if (!option) {
                    formValueBank.setValue("bin", "");
                    setBankValueSelect("");
                  } else {
                    formValueBank.setValue("bin", option.bin);
                    setBankValueSelect(`${option.code}: ${option.short_name} - ${option.name}`);
                  }
                }}
                onInput={(e: any) => setBankValueSelect(e.target?.value ?? "")}
                filterOptions={filterOptions}
                getOptionLabel={(option) => option?.name ?? ""}
                renderOption={(props, option) => (
                  <Box component="li" {...props}>{`${option.code}: ${option.short_name} - ${option.name}`}</Box>
                )}
                options={banks}
                sx={{ width: "calc(100% - 60px)" }}
                renderInput={(params) => (
                  <>
                    <TextField
                      sx={{ display: "none" }}
                      value={formValueBank.getValues("bin")}
                      {...formValueBank.register("bin", { required: "Hãy chọn ngân hàng!" })}
                    />
                    <TextField
                      {...params}
                      variant="standard"
                      label="Chọn ngân hàng"
                    />
                  </>
                )}
              />
              <ErrorMessage errors={formValueBank.formState.errors} name="bin"
                            render={({ message }) => <Error mgs={message} />} />
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <BadgeOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <TextField
                id="account_number"
                label="Số tài khoản"
                variant="standard"
                sx={{ width: "calc(100% - 60px)" }}
                type="text"
                role="presentation"
                {...formValueBank.register("account_number", { required: "Số tài khoản không được trống!" })}
              />
              <ErrorMessage errors={formValueBank.formState.errors} name="account_number"
                            render={({ message }) => <Error mgs={message} />} />
            </Stack>
            <Stack direction="row" alignItems="center" marginBottom="1.25rem" flexWrap="wrap">
              <BusinessOutlinedIcon sx={{ width: "60px", color: "grey" }} />
              <TextField
                id="branch"
                label="Chi nhánh"
                variant="standard"
                sx={{ width: "calc(100% - 60px)" }}
                type="text"
                role="presentation"
                {...formValueBank.register("branch", { required: "Hãy nhập chi nhánh ngân hàng!" })}
              />
              <ErrorMessage errors={formValueBank.formState.errors} name="branch"
                            render={({ message }) => <Error mgs={message} />} />
            </Stack>
            <Box textAlign="right">
              <Button variant="contained" type="submit" disabled={requesting}>Cập nhật</Button>
            </Box>
          </form>
        )}
      </Box>
    </SinglePage>
  );
};

export default EditPage;
