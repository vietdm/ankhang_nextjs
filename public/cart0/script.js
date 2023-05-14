const url = new URL(window.location.href);

const params = new URLSearchParams(url.search);
const api = "https://api.ankhangmilk.com/api/";

function copyText(textToCopy) {
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Đã sao chép!");
}

function getCart() {
  let _cart = params.get("carts");
  if (_cart == null) return [];
  return JSON.parse(_cart);
}

async function getUserInfo() {
  const token = params.get("token");
  if (token == null) {
    $("body").html("Không tìm thấy token");
    throw Error("error");
  }
  const response = await $.post(api + "auth/token/verify", { token });
  if (response.success != 1) {
    $("body").html("Mã đăng nhập đã hết hạn");
    throw Error("error");
  }
  return (await $.ajax({
    url: api + "auth/info",
    type: 'post',
    data: { token },
    headers: {
      Authorization: 'Bearer ' + token
    },
    dataType: 'json',
  })).user;
}

function getProducts() {
  return new Promise((resolve) => {
    $.get(api + "products").then((res) => resolve(res.products));
  });
}

function renderList(data) {
  return `
        <div class="list d-flex mb-2">
            <div class="img">
                <img src="${data.img}" alt="img">
            </div>
            <div class="content px-2">
                <h6 class="mb-1" style="font-weight: bold;">${data.title}</h6>
                <p class="mb-1">Số lượng: ${data.quantity}</p>
                <p class="mb-1">Đơn giá: ${data.price}</p>
            </div>
        </div>
    `;
}

function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
}

function fillDefaultData(userInfo) {
  $('[name="fullname"]').val(userInfo.fullname);
  $('[name="phone"]').val(userInfo.phone);
  $('[name="address"]').val(userInfo.address);
}

async function init() {
  const userInfo = await getUserInfo();
  const carts = getCart();
  const cartSave = [];
  let products = await getProducts();
  let totalPrice = 0;

  fillDefaultData(userInfo);

  for (const index in carts) {
    const productIndex = products.findIndex(
      (p) => p.id == carts[index].id
    );
    if (productIndex < 0) {
      delete carts[index];
      continue;
    }
    cartSave.push(JSON.parse(JSON.stringify(carts[index])));
    carts[index].product = products[productIndex];
  }

  $(".lists").empty();
  carts.map((cart) => {
    const cartPrice = cart.quantity * cart.product.price;
    totalPrice += cartPrice;
    $(".lists").append(
      renderList({
        img: cart.product.images[0],
        title: cart.product.title,
        quantity: cart.quantity,
        price: formatMoney(cartPrice) + " đ",
      })
    );
  });

  let intervalCountdown = null;

  $('#areaBankInfoModal').on('show.bs.modal', function () {
    const timer = $('#areaBankInfoModal').find('[id="time"]');
    timer.text('10:00');
    let duration = 60 * 10;
    let minutes, seconds;
    intervalCountdown = setInterval(function () {
      minutes = parseInt(duration / 60, 10);
      seconds = parseInt(duration % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      timer.text(minutes + ":" + seconds);

      if (--duration < 0) {
        clearInterval(intervalCountdown);
        $('#areaBankInfoModal').find('.modal-body').empty().append('<h5 class="text-center">Đơn hàng đã bị hủy</h5>');
        $('#areaBankInfoModal').find('.btn-access').remove();
        $('#areaBankInfoModal').find('.btn-go-home').removeClass('d-none');
        localStorage.removeItem('cart');
        Swal.fire({
          title: 'Thất bại',
          text: "Đơn hàng đã bị hủy!",
          icon: 'error',
        }).then(() => {
          window.location.href = "/";
        });
      }
    }, 1000);
  });

  $('#areaBankInfoModal').on('hide.bs.modal', function () {
    clearInterval(intervalCountdown);
  });

  $('#areaUploadBankResult').on('hide.bs.modal', function () {
    $('#areaUploadBankResult').find('.img-preview').empty();
    $('#fileBankResult').val('');
  });

  $('.btn-pay').on('click', function () {
    const qrCode = `https://img.vietqr.io/image/mbbank-0918261368-11sAiww.jpg?amount=${totalPrice}&addInfo=${userInfo.username}&accountName=Nguyen%20Thi%20Kim%20Thoa`;
    $('#areaBankInfoModal').modal({ backdrop: 'static', keyboard: false });
    $('#areaBankInfoModal').find('[id="QrCode"]').attr('src', qrCode);
  });

  $(".btn-trace-store").on("click", async function () {
    const file = $('#fileBankResult')[0].files;
    if (file.length == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cần chọn ảnh xác nhận thanh toán trước khi Đặt Hàng!'
      });
      return;
    }

    $(this).prop('disabled', true);

    const formData = new FormData;
    formData.append('image', file[0]);
    formData.append('order', JSON.stringify(cartSave));
    formData.append('user_id', userInfo.id);
    formData.append('name', $('[name="fullname"]').val());
    formData.append('phone', $('[name="phone"]').val());
    formData.append('address', $('[name="address"]').val());
    formData.append('note', $('[name="note"]').val());

    $.ajax({
      url: api + "order",
      type: 'post',
      data: formData,
      headers: {
        Authorization: 'Bearer ' + params.get("token")
      },
      processData: false,
      contentType: false,
      dataType: 'json',
      success: () => {
        localStorage.removeItem('cart');
        Swal.fire({
          title: 'Thành công',
          text: "Đơn hàng đã được đặt thành công!",
          icon: 'success',
        }).then(() => {
          window.location.href = "/";
        });
      }, error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: Object.values(err.responseJSON)[0]
        });
        $(this).prop('disabled', false);
      }
    });
  });

  $('#fileBankResult').on('change', function () {
    const $modal = $('#areaUploadBankResult');
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg'];

    $modal.find('.img-preview').empty();
    if (this.files.length == 0) {
      return;
    }

    if (!validImageTypes.includes(this.files[0]['type'])) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'File đã chọn không phải 1 ảnh!'
      });
      return;
    }

    const reader = new FileReader();

    const newImg = $('<img />');
    newImg.css('width', '250px');

    reader.onload = function (e) {
      newImg.attr('src', e.target.result);
      $modal.find('.img-preview').append(newImg);
    }

    reader.readAsDataURL(this.files[0]);
  });

  $('.btn-confirm-trace').on('click', function () {
    $('#areaBankInfoModal').modal('hide');
    $('#areaUploadBankResult').modal({ backdrop: 'static', keyboard: false });
  });
}

init();
