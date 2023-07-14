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
  confirm(mgs: string, callback: any = null) {
    Swal.fire({
      title: 'Are you sure?',
      text: mgs,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && typeof callback == 'function') {
        callback();
      }
    })
  }
};
