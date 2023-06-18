import Swal from "sweetalert2";

export const Alert = {
  error(mgs: string, callback?: any) {
    Swal.fire({
      title: "Error!",
      text: mgs,
      icon: "error",
      confirmButtonText: "Đóng",
    }).then(() => {
      if (typeof callback == "function") {
        callback();
      }
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
