function generateCard() {
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const contact = document.getElementById("contact").value;
  const customText = document.getElementById("custom-text").value;
  const qrData = document.getElementById("qr-data").value;
  const bgColor = document.getElementById("bg-color").value;

  document.getElementById("card-name").textContent = name || "Ваше имя";
  document.getElementById("card-title").textContent = title || "Ваша должность";
  document.getElementById("card-contact").textContent = contact || "Ваши контакты";
  document.getElementById("card-custom-text").textContent = customText || "";
  document.getElementById("card").style.backgroundColor = bgColor;

  // Обработка фонового изображения
  const bgImageInput = document.getElementById("bg-image");
  if (bgImageInput.files && bgImageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("card").style.backgroundImage = `url(${e.target.result})`;
      document.getElementById("card").style.backgroundSize = "cover";
    };
    reader.readAsDataURL(bgImageInput.files[0]);
  } else {
    document.getElementById("card").style.backgroundImage = ""; // Очистка фона, если файл не выбран
  }

  // Генерация QR-кода
  const qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = ""; // Очистка QR-кода, если уже был сгенерирован
  if (qrData) {
    new QRCode(qrcodeContainer, {
      text: qrData,
      width: 100,
      height: 100,
      colorDark: "#000000",
      colorLight: "#ffffff",
    });
  }
}

function downloadCard() {
  const card = document.getElementById("card");

  html2canvas(card).then(canvas => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "визитка.png";
    link.click();
  });
}
