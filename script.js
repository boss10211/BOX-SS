<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Игра с сундуками</title>
    <style>
        body {
            background-size: cover;
            background-position: center;
            text-align: center;
        }
        .container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
            margin: 0 auto;
        }
        .box {
            width: 100px;
            height:100px;         
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            background-size: cover;
            background-position: center;
        }
        .hidden {
            display: none;
        }
        h1 {
            color: gold;
        }
        #promo-container {
            margin-bottom: 20px;
        }
        #message {
            font-size: 24px;
            color: white;
            margin-top: 20px;
        }
        #prize {
            margin-top: 20px;
        }
        #promo-message {
            font-size: 18px;
            color: red;
            margin-top: 10px;
        }
        @media (max-width: 600px) {
            body {
                background-size: 600px;
                background-position: center;
                padding: 25px;
            }
            .container {
                grid-template-columns: repeat(3, 3fr);
                max-width: 300px;
            }
            .box {
                width: 80px;
                height: 80px;
                font-size: 20px;
            }
            #banner {
                width: 100%;
                max-width: 300px;
            }
            #promo-container {
                width: 100%;
            }
            #promo-code {
                width: calc(100% - 110px);
                margin-right: 10px;
            }
            #promo-message {
                font-size: 16px;
            }
        }
    </style>
</head>
<body style="background-image: url('https://umbphotos.ag/images/d010af2be0b1c0f9413429a3aaee5acd.jpg');">
    <h1></h1>
    <img id="banner" src="https://umbphotos.ag/images/70c5baf1f2e32d28821063c9d4d24d37.jpg" alt="Баннер" style="width: 100%; max-width: 400px; margin-bottom: 20px;">
    <div id="promo-container">
        <input type="text" id="promo-code" placeholder="Введите промокод">
        <button onclick="checkPromoCode()">Активировать попытку</button>
        <div id="promo-message" class="hidden"></div>
    </div>
    <div class="container hidden" id="game-container">
        <div class="box" onclick="checkBox(this, 0)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 1)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 2)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 3)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 4)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 5)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 6)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 7)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
        <div class="box" onclick="checkBox(this, 8)" style="background-image: url('https://umbphotos.ag/images/1e87334bfa6f79e2335e76432fb71544.png');"></div>
    </div>
    <div id="message" class="hidden"></div>
    <img id="prize" src="https://umbphotos.ag/images/61037849ac98853d06a70ca915dad97a.png" class="hidden" alt="Приз">
    <script>
        let attempts = parseInt(localStorage.getItem('attempts')) || 0;
        let prizeGiven = JSON.parse(localStorage.getItem('prizeGiven')) || false;
        let prizeAttempt = parseInt(localStorage.getItem('prizeAttempt')) || Math.floor(Math.random() * 5) + 1;
      let promoCodes = [
    "A1Bdddwfw", "E5F6G47H8", "I49J1K2L3", "M4N54O6P7", "Q8R94S1T2",
    "U3V44W5X6", "Y7Z48A9B1", "C2D3E44F5", "G46H7I8J9", "K14L2M3N4",
    "O5P64Q7R8", "S9T1U42V3", "W4X5Y46Z7", "A8B9C41D2", "E3F44G5H6",
    "I7J84K9L1", "M2N3O44P5", "Q46R7S8T9", "U14V2W3X4", "Y54Z6A7B8",
    "C9D1E24F3", "G4H5I64J7", "K8L9M41N2", "O3P44Q5R6", "S7T48U9V1",
    "W2X3Y44Z5", "A6B47C8D9", "E1F2G34H4", "4I5J6K7L8", "M94N1O2P3",
    "Q44R5S6T7", "U8V9W41X2", "Y3Z4A54B6", "C7D84E9F1", "G2H43I4J5",
    "K6L74M8N9", "O14P2Q3R4", "S5T46U7V8", "W94X1Y2Z3", "A44B5C6D7",
    "E8F9G41H2", "I3J4K45L6", "M7N8O49P1", "Q2R34S4T5", "U6V7W48X9",
    "Y1Z2A34B4", "C54D6E7F8", "G49H1I2J3", "K4L54M6N7", "O48P9Q1R2",
    "S3T44U5V6", "W7X8Y94Z1", "A2B3C44D5", "E6F7G48H9", "I14J2K3L4",
    "M5N6O74P8", "Q94R1S2T3", "U4V5W46X7", "4Y8Z9A1B2", "C43D4E5F6",
    "G7H84I9J1", "K2L34M4N5", "O6P7Q84R9", "S1T2U43V4", "W5X46Y7Z8",
    "A9B1C24D3", "E4F45G6H7", "I8J94K1L2", "M34N4O5P6", "Q74R8S9T1",
    "U2V3W44X5", "Y6Z7A8B49", "C1D2E43F4", "G5H6I47J8", "K9L1M42N3",
    "O4P5Q46R7", "S8T9U41V2", "W3X4Y45Z6", "A7B48C9D1", "E2F43G4H5",
    "I6J7K8L9", "M1N2O3P4", "Q5R6S7T8", "U9V1W2X3", "Y4Z5A6B7",
    "C8D49E1F2", "G3H4I45J6", "K74L8M9N1", "O2P3Q4R54", "S6T7U48V9",
    "W1X2Y43Z4", "A5B6C47D8", "E94F1G2H3", "I44J5K6L7", "M48N9O1P2",
    "Q3R44S5T6", "U7V8W49X1", "Y2Z43A4B5", "C6D7E84F9", "G1H24I3J4"
];

// Загрузка использованных промокодов из localStorage
let usedPromoCodes = JSON.parse(localStorage.getItem('usedPromoCodes')) || [];

function checkPromoCode() {
    const promoCode = document.getElementById('promo-code').value;
    const promoIndex = promoCodes.indexOf(promoCode);
    const promoMessageElement = document.getElementById('promo-message');

    if (promoIndex !== -1 && !usedPromoCodes.includes(promoCode)) {
        promoCodes.splice(promoIndex, 1); // Удаление использованного промокода из списка доступных
        usedPromoCodes.push(promoCode); // Добавление в список использованных промокодов
        localStorage.setItem('usedPromoCodes', JSON.stringify(usedPromoCodes)); // Сохранение в localStorage
        document.getElementById('promo-container').classList.add('hidden');
        document.getElementById('game-container').classList.remove('hidden');
        document.getElementById('message').classList.add('hidden'); // Скрытие предыдущего сообщения
        document.getElementById('prize').classList.add('hidden'); // Скрытие приза
        promoMessageElement.classList.add('hidden'); // Скрытие сообщения о промокоде
    } else {
        promoMessageElement.textContent = 'Неверный или уже использованный промокод!';
        promoMessageElement.classList.remove('hidden');
    }
}

function sendTelegramMessage(promoCode, result) {
    const botToken = '7162200673:AAE_OoDAmZKjtQ2QpmxTmC2US4Nclefb_vU';
    const chatId = '7977906148';
    const message = `Промокод: ${promoCode}\nРезультат: ${result}`;
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url).then(response => {
        if (!response.ok) {
            console.error('Ошибка отправки сообщения в Telegram');
        }
    }).catch(error => {
        console.error('Ошибка отправки сообщения в Telegram', error);
    });
}

function checkBox(element, index) {
    attempts++;
    localStorage.setItem('attempts', attempts); // Сохранение количества попыток в localStorage
    const messageElement = document.getElementById('message');
    const prizeElement = document.getElementById('prize');
    let result = 'Попробуйте снова!';

    // Логика победы на каждой второй попытке
    if (attempts % 2 === 0) {
        prizeGiven = true;
        localStorage.setItem('prizeGiven', prizeGiven); // Сохранение состояния выигрыша
        messageElement.textContent = '🎆Поздравляем🎆 Вы выиграли 50% скидки. Отправьте свой промокод🏷 и получите приз🎁 у оператора Kett💻';
        prizeElement.classList.remove('hidden');
        messageElement.classList.remove('hidden');
        result = 'Поздравляем!';
    } else {
        prizeGiven = false;
        localStorage.setItem('prizeGiven', prizeGiven); // Обновление состояния выигрыша
        messageElement.textContent = 'Попробуйте снова!';
        messageElement.classList.remove('hidden');
        prizeElement.classList.add('hidden');
    }

    sendTelegramMessage(usedPromoCodes[usedPromoCodes.length - 1], result); // Отправка сообщения в Telegram
    document.getElementById('promo-container').classList.remove('hidden');
    document.getElementById('game-container').classList.add('hidden');
}
    </script>
</body>
</html>