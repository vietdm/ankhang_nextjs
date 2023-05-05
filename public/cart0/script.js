const url = new URL(window.location.href);
// const url = new URL(
//   "http://app.ankhang.asia/cart/index.html?carts=%5B%7B%22product_id%22:1,%22quantity%22:1%7D%5D&token=eyJhbGciOiJTSEEyNTYiLCJ0eXAiOiJKV1QifQ.eyJpZCI6MTAsImV4cCI6MTY4Mjk3OTMwNX0.9rb3564Z04TLfI7H13HYnuzMRQ1ycCAm0ROb8gAFHP0"
// );

const params = new URLSearchParams(url.search);
const api = "https://mvtp.site/api/";

function copyText(textToCopy) {
  const tempInput = document.createElement("input");
  tempInput.value = textToCopy;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  alert("Đã sao chép!");
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
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
      Authorization: 'Bearer ' + getCookie('_token')
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
        <div class="list d-flex">
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
    const img = JSON.parse(cart.product.images);
    $(".lists").append(
      renderList({
        img: img[0],
        title: cart.product.title,
        quantity: cart.quantity,
        price: formatMoney(cart.quantity * cart.product.price) + " đ",
      })
    );
  });

  $(".btn-trace-store").on("click", async function () {
    $.ajax({
      url: api + "order",
      type: 'post',
      data: {
        order: cartSave,
        user_id: userInfo.id,
        name: $('[name="fullname"]').val(),
        phone: $('[name="phone"]').val(),
        address: $('[name="address"]').val(),
        note: $('[name="note"]').val(),
      },
      headers: {
        Authorization: 'Bearer ' + getCookie('_token')
      },
      dataType: 'json',
      success: () => {
        localStorage.removeItem('cart');
        window.location.href = "/";
      }, error: (err) => {
        alert(Object.values(err.responseJSON)[0]);
      }
    });
  });
}

init();
