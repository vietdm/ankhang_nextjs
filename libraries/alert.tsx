import Swal from "sweetalert2";

export const Alert = {
  error(mgs: string) {
    Swal.fire({
      title: "Error!",
      text: mgs,
      icon: "error",
      confirmButtonText: "Đóng",
    });
  },
  success(mgs: string) {
    Swal.fire({
      title: "Success!",
      text: mgs,
      icon: "success",
      confirmButtonText: "Đóng",
    });
  },
};
