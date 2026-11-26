/* $0 MRR CLUB · v3.42 · Ukrainian version (v3.62: prices stay in €, no UAH).
   English stays the default. UA turns on with ?lang=uk, the EN/UA switch, or a Ukrainian browser.
   How it works: the site code keeps writing English; this file translates text nodes and a few attributes
   as they appear (MutationObserver), and in UA shows every € price in hryvnia at the NBU rate.
   It changes only text, never the DOM structure, so the site code keeps working unchanged. */
(function () {
  'use strict';
  var qs = new URLSearchParams(location.search), q = (qs.get('lang') || '').toLowerCase(), L = null;
  if (q === 'uk' || q === 'ua') L = 'uk'; else if (q === 'en') L = 'en';
  try { if (L) localStorage.setItem('zm_lang', L); else L = localStorage.getItem('zm_lang'); } catch (e) {}
  if (L !== 'uk' && L !== 'en') L = /^uk\b/i.test(navigator.language || '') ? 'uk' : 'en';
  window.ZM_LANG = L;
  document.documentElement.lang = L;

  /* ---------- EN / UA switch ---------- */
  function addSwitch() {
    if (document.getElementById('zm-lang')) return;
    var st = document.createElement('style');
    st.textContent = '#zm-lang{position:fixed;z-index:2147483000;top:calc(env(safe-area-inset-top,0px) + 8px);left:50%;transform:translateX(-50%);display:flex;gap:2px;padding:2px;' +
      'background:rgba(7,10,18,.82);border:1px solid rgba(143,163,201,.45);font:400 9px/1 "Press Start 2P",ui-monospace,Menlo,monospace;letter-spacing:.06em}' +
      '#zm-lang a{color:#8fa3c9;text-decoration:none;padding:6px 8px}#zm-lang a[aria-current="true"]{background:#ece4d0;color:#070a12}' +
      '#zm-lang a:focus-visible{outline:2px solid #ef8a4e;outline-offset:1px}' +
      '#zm-lang.static{position:absolute;top:14px;right:14px;left:auto;bottom:auto;transform:none}' +
      '@media print{#zm-lang{display:none}}' +
      '@media (max-width:760px){#zm-lang{top:auto;left:8px;transform:none;bottom:calc(env(safe-area-inset-bottom,0px) + 64px)}body[data-mode]:not([data-mode="boot"]) #zm-lang{display:none}}';   /* phones: the game HUD has no room — switch on the start screen */
    document.head.appendChild(st);
    var n = document.createElement('nav'); n.id = 'zm-lang'; n.setAttribute('aria-label', 'Language / Мова'); n.setAttribute('data-noi18n', '');
    [['en', 'EN'], ['uk', 'UA']].forEach(function (x) {
      var a = document.createElement('a'); a.href = '#'; a.textContent = x[1]; a.lang = x[0];
      a.setAttribute('aria-current', String(x[0] === L));
      a.onclick = function (e) {
        e.preventDefault(); if (x[0] === L) return;
        try { localStorage.setItem('zm_lang', x[0]); } catch (er) {}
        var u = new URL(location.href); u.searchParams.delete('lang'); location.replace(u.toString());
      };
      n.appendChild(a);
    });
    if (document.querySelector('main.wrap')) n.className = 'static';   /* legal pages: top-right, scrolls away */
    document.body.appendChild(n);
  }
  if (document.body) addSwitch(); else document.addEventListener('DOMContentLoaded', addSwitch);

  if (L !== 'uk') return;

  /* ---------- EUR → UAH ---------- */
  var RATE = 0;
  try { var c = JSON.parse(localStorage.getItem('zm_uah') || 'null'); if (c && c.v > 30 && c.v < 90) RATE = c.v; } catch (e) {}
  if (!RATE) RATE = 50;   // first visit only, until the NBU rate arrives (~1 s)
  // v3.62: Western Bid asks not to use UAH as the store currency → the Ukrainian version shows € too
  var SHOW_UAH = false;
  function uah(n) {
    if (!SHOW_UAH) return '€' + n;
    var v = Math.ceil(parseFloat(String(n).replace(',', '.')) * RATE - 1e-9);
    return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' грн';
  }
  if (SHOW_UAH) fetch('/api/card?a=fx').then(function (r) { return r.json(); }).then(function (j) {
    var v = Number(j && j.eur_uah);
    if (!(v > 30 && v < 90)) return;
    try { localStorage.setItem('zm_uah', JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
    if (Math.abs(v - RATE) > 1e-6) { RATE = v; retranslateAll(); }
  }).catch(function () {});

  /* ---------- dictionary: exact text (prices normalised to €#) ---------- */
  var D = {
    /* shared */
    'Privacy': 'Конфіденційність', 'Terms': 'Умови', 'Shipping': 'Доставка', 'Shipping & returns': 'Доставка й повернення',
    'Instagram': 'Instagram', 'Email': 'Email', 'Continue': 'Далі', 'Back': 'Назад', 'Close': 'Закрити', 'Cancel': 'Скасувати',
    'Confirm': 'Підтвердити', 'Select': 'Вибір', 'Change': 'Змінити', 'Skip': 'Пропустити', 'Save': 'Зберегти',
    'Tee': 'Футболка', 'Pre-order': 'Передзамовити', 'Reserve': 'Зарезервувати', 'Total': 'Разом', 'Order': 'Замовлення',
    'Copy': 'Копіювати', 'Copied': 'Скопійовано', 'Copy address': 'Копіювати адресу', 'Try again': 'Спробувати ще',
    'Something went wrong. Try again.': 'Щось пішло не так. Спробуй ще раз.',
    'Drop 01 · coming soon': 'Drop 01 · незабаром', 'Drop 01 · pre-order open': 'Drop 01 · передзамовлення відкрито',
    'Questions:': 'Питання:', 'Refunded': 'Повернено', 'Refunded.': 'Кошти повернено.', 'Underpaid': 'Недоплата',
    'Size': 'Розмір', 'Remove': 'Прибрати', 'Pay with': 'Спосіб оплати', 'Token': 'Токен', 'Network': 'Мережа',

    /* index · boot & HUD */
    'Tap to skip': 'Торкнись, щоб пропустити', 'Zoom out': 'Віддалити', 'Zoom in': 'Наблизити',
    'Pre-revenue entertainment · est. 2026': 'Розваги до першої виручки · з 2026',
    'Streetwear for builders with zero MRR and infinite aura. Drop 01 is coming soon.': 'Стрітвір для білдерів з нульовим MRR і нескінченною аурою. Drop 01 — незабаром.',
    'Press start': 'Натисни старт', 'Loading…': 'Завантаження…',
    'Sound on · founding price': 'Увімкни звук · ціна засновника',
    'Toggle sound': 'Звук увімк./вимк.', 'Sound': 'Звук', 'Aura': 'Аура',
    'Main menu': 'Головне меню', 'Options': 'Опції', 'Choose a tee': 'Обери футболку', 'View': 'Вигляд',
    '○ Back': '○ Назад', 'Previous tee': 'Попередня футболка', 'Next tee': 'Наступна футболка',
    'On Hero': 'На герої', 'Tee only': 'Лише футболка', 'Details': 'Деталі', 'Hide': 'Сховати',
    'Size guide': 'Розмірна сітка', 'Hide size guide': 'Сховати розмірну сітку',
    'cm / in': 'см / дюйми', 'Chest (flat)': 'Груди (в розкладі)', 'Length': 'Довжина', 'Sleeve': 'Рукав',
    'Oversized boxy fit, dropped shoulders. Want it less boxy — size down. Flat measurements, ±2 cm. Heavyweight oversized cotton, water-based screen print.':
      'Оверсайз, бокс-фіт, спущене плече. Хочеш менш вільно — бери на розмір менше. Заміри в розкладі, ±2 см. Щільна оверсайз-бавовна, шовкографія водними фарбами.',
    'Width (flat)': 'Ширина (в розкладі)', 'Item page →': 'Сторінка товару →', 'Skip to shop →': 'Одразу в магазин →', 'Inventory': 'Інвентар',
    'The shop: every tee with photos, sizes, prices, shipping. No 3D needed.': 'Магазин: усі футболки з фото, розмірами, цінами й доставкою. Без 3D.',
    'ships by ~5 December': 'відправка до ~5 грудня', 'ships early December': 'відправка на початку грудня', 'Ships early December': 'Відправка на початку грудня', 'Pre-order · ships first': 'Передзамовлення · відправимо першими', 'Pre-order · ships later in December': 'Передзамовлення · відправка пізніше в грудні', 'ships mid–late December': 'відправка в середині–кінці грудня',
    'Oversized boxy fit, dropped shoulders. Model 184 cm (6′0″) wears L. Want it less boxy — size down. Flat measurements, ±2 cm; 300 GSM heavyweight cotton, garment-dyed. Final measurements confirmed with Drop 01 samples.':
      'Оверсайз, бокс-фіт, спущене плече. Модель 184 см у розмірі L. Хочеш менш вільно — бери на розмір менше. Заміри в розкладі, ±2 см; щільна бавовна, фарбування готового виробу. Фінальні заміри підтвердимо на семплах Drop 01.',
    'Email · your': 'Email ·', 'founding price is tied to it': '— ціна засновника, прив’язана до нього',
    '€# today. Your': '€# сьогодні. Ціна засновника',
    'founding price is tied to this email: applied automatically at checkout, for 48 h after Drop 01 opens.': 'прив’язана до цього email: застосується автоматично під час оплати протягом 48 год після старту Drop 01.',
    'Next: checkout. Your': 'Далі — оплата. Ціна засновника', 'is tied to this email and applied automatically.': 'прив’язана до цього email і застосується автоматично.',
    'Inspect the photo': 'Роздивитись фото', 'Drag to spin': 'Тягни, щоб покрутити',
    'Memory card (8MB) ·': 'Карта пам’яті (8MB) ·', 'slot 1': 'слот 1',
    '€# founding price + early access': '€# — ціна засновника + ранній доступ',
    /* menu */
    'Start': 'Старт', 'Memory card': 'Карта пам’яті', 'Sound, graphics, intro.': 'Звук, графіка, інтро.',
    'Interface sounds and the boot theme.': 'Звуки інтерфейсу і музика заставки.',
    '480p is the authentic look. HD renders at full sharpness.': '480p — автентичний вигляд. HD — максимальна чіткість.',
    'Replay intro': 'Повторити інтро', 'Watch the boot sequence again.': 'Переглянути заставку ще раз.',
    'Return to the main menu.': 'Повернутися в головне меню.',
    /* tee select */
    'Colour': 'Колір', 'Fit': 'Крій', 'Edition': 'Тираж', 'oversized, boxy': 'оверсайз, бокс-фіт',
    'One batch. Made once. No restock.': 'Одна партія. Шиємо раз. Без дошиву.',
    'washed brown': 'варений коричневий', 'brown': 'коричневий', 'sky blue': 'небесно-блакитний', 'bone': 'молочний',
    'washed sand': 'варений пісочний', 'light gray': 'світло-сірий',
    '$0 MRR, hand-written': '$0 MRR, від руки', 'BOOK A DeMO + your own number': 'BOOK A DeMO + твій номер',
    '1 of 1 · personalised by you': '1 з 1 · персоналізуєш сам',
    'Out of stock. Hand-dyed ombré takes longer. Back in Drop 02.': 'Немає в наявності. Ручне омбре фарбується довше. Повернеться в Drop 02.',
    'Exclusive': 'Ексклюзив', '1 of 1': '1 з 1', 'New drop': 'Новинка',
    'Personal edition. Textile marker in the box. You write your own number on the back, so no two are the same.': 'Персональне видання. Маркер по тканині в коробці. Свій номер пишеш на спині сам, тож двох однакових не буде.',
    'Sample number · yours goes here': 'Номер для прикладу · тут буде твій', 'Your number here': 'Тут твій номер',
    'Front · back is blank': 'Спереду · спина без принта', 'back is blank': 'спина без принта',
    'Pick your size': 'Обери розмір', 'Out of stock': 'Немає в наявності', 'Out of stock · back in Drop 02': 'Немає · повернеться в Drop 02',
    'Hand-dyed ombré · back in Drop 02': 'Ручне омбре · повернеться в Drop 02',
    '€# your locked price ·': '€# — твоя зафіксована ціна ·', '€# founding price ·': '€# — ціна засновника ·', '€# after launch': '€# після запуску',
    'Your locked early price · €# after launch': 'Твоя зафіксована рання ціна · €# після запуску',
    '· €# today': '· €# сьогодні', '· ships in 2–3 weeks': '· відправка за 2–3 тижні',
    'Pick a size first.': 'Спершу обери розмір.', 'Saving…': 'Зберігаємо…',
    'That email looks incomplete. Check for a typo.': 'Схоже, email неповний. Перевір, чи немає помилки.',
    'Enter your email to reserve.': 'Введи email, щоб зарезервувати.', 'Enter your email to join.': 'Введи email, щоб приєднатися.',
    'Couldn\'t send the confirm email. Try again in a minute.': 'Не вдалося надіслати лист-підтвердження. Спробуй за хвилину.',
    'Couldn\'t save right now. Try again in a minute.': 'Зараз не вдалося зберегти. Спробуй за хвилину.',
    'Couldn\'t save that. Try again in a minute.': 'Не вдалося зберегти. Спробуй за хвилину.',
    '📩 1 more step': '📩 Ще 1 крок', 'Open the email from club@zeromrr.club and tap': 'Відкрий лист від club@zeromrr.club і натисни',
    '. Not there? Check spam / Promotions.': '. Немає листа? Перевір «Спам» / «Промоакції».',
    'Demo mode: saved in this browser only.': 'Демо-режим: збережено лише в цьому браузері.',
    /* memory card */
    'Check your inbox': 'Перевір пошту', 'GAME SAVED.': 'ГРУ ЗБЕРЕЖЕНО.', 'Reserving': 'Резервуємо',
    'No spam. One email when the drop goes live.': 'Без спаму. Один лист, коли дроп стартує.',
    'Join the founding members': 'Стати засновником', 'Not now': 'Не зараз',
    'Saving data. Do not remove the memory card.': 'Зберігаємо дані. Не виймай карту пам’яті.',
    'We sent an email to': 'Ми надіслали лист на', 'from club@zeromrr.club. Tap': 'з club@zeromrr.club. Натисни',
    'in it to lock your founding price and get your founding member number.': 'у листі — так ти зафіксуєш ціну засновника й отримаєш номер учасника.',
    'Demo mode: no email is sent from this preview.': 'Демо-режим: з цього прев’ю листи не надсилаються.',
    'Not there in 2 minutes? Check spam / Promotions.': 'Немає за 2 хвилини? Перевір «Спам» / «Промоакції».',
    'Open Gmail': 'Відкрити Gmail', 'Open Outlook': 'Відкрити Outlook', 'Open Yahoo Mail': 'Відкрити Yahoo Mail', 'Open Mail': 'Відкрити Пошту', 'Open email app': 'Відкрити пошту', 'Open iCloud Mail': 'Відкрити iCloud Mail', 'Did you mean': 'Можливо, ти мав на увазі',
    'Reserve my size': 'Зарезервувати мій розмір', 'Use another email': 'Інший email',
    'You\'re on the list.': 'Ти у списку.', 'Welcome to the club.': 'Ласкаво просимо до клубу.',
    'Follow on IG': 'Стежити в IG', 'Follow on X': 'Стежити в X',
    'That confirm link expired or was already replaced. Enter your email again for a fresh one.': 'Посилання для підтвердження застаріло або вже замінене. Введи email ще раз — надішлемо нове.',

    /* checkout */
    'Checkout · $0 MRR CLUB': 'Оформлення · $0 MRR CLUB',
    'TESTNET · test tokens only · no real money': 'TESTNET · лише тестові токени · без реальних грошей',
    'Save point · checkout': 'Точка збереження · оформлення', 'Save point · inventory': 'Точка збереження · інвентар',
    'Save point · payment': 'Точка збереження · оплата', 'Monthly recurring revenue': 'Щомісячна регулярна виручка',
    'Loading your order…': 'Завантажуємо замовлення…', 'Loading your save': 'Завантажуємо сейв', '01 / 03 · Load save': '01 / 03 · Завантажити сейв',
    'Load your': 'Завантаж свій', 'save.': 'сейв.',
    'Enter the email you reserved with. Your reserved tees become your cart, founding price included.': 'Введи email, з яким резервував. Зарезервовані футболки стануть твоїм кошиком, з ціною засновника.',
    '02 / 03 · Inventory': '02 / 03 · Інвентар', 'Your': 'Твій', 'cart.': 'кошик.', 'Add a tee': 'Додати футболку',
    '+ Add': '+ Додати', 'Ship to': 'Доставка', 'Full name': 'Ім’я та прізвище', 'Country': 'Країна', 'Your country isn’t listed? Email': 'Немає твоєї країни? Напиши на', 'or DM us on Instagram, we’ll check.': 'або в DM в Instagram, перевіримо.', 'Address': 'Адреса',
    'Apartment, suite (optional)': 'Квартира, офіс (необов’язково)', 'Address line 2': 'Адреса, рядок 2',
    'City': 'Місто', 'ZIP': 'Індекс', 'State / province': 'Штат / провінція', 'Phone · for the courier': 'Телефон · для кур’єра',
    'Select…': 'Обери…', '0% fees': '0% комісії',
    'Cards · opening soon': 'Картки · скоро', 'Your founding price is held for you': 'Твою ціну засновника збережено',
    'until 48 hours after card payments open. We\'ll email you the moment they do.': 'до 48 годин після відкриття оплати карткою. Напишемо, щойно це станеться.',
    'Want it now?': 'Хочеш уже зараз?',
    'Buy USDC with your card in an app like Coinbase, then send it on Base: the network fee is about $0.01.': 'Купи USDC карткою в застосунку на кшталт Coinbase і надішли в мережі Base: комісія мережі близько $0.01.',
    'Notify me when cards open': 'Повідомити, коли відкриються картки', 'Pay with crypto now': 'Оплатити криптою зараз',
    'any time until it ships.': 'будь-коли до відправки.',
    'Crypto is final': 'Крипто-платіж незворотний', 'Exact amount.': 'Рівно ця сума.',
    'Less = not confirmed. Exchanges often subtract a fee: add it on top.': 'Менше = не підтверджено. Біржі часто віднімають комісію: додай її зверху.',
    'Only this token on this network.': 'Лише цей токен у цій мережі.', 'Anything else can be lost for good.': 'Інакше кошти можна втратити назавжди.',
    'Price fixed for 60 min.': 'Ціна фіксується на 60 хв.', 'Refunds go back in the same token and network.': 'Повернення — тим самим токеном у тій самій мережі.',
    'I get it:': 'Розумію:', 'underpaid = not confirmed': 'недоплата = не підтверджено', 'wrong network or token = may be lost': 'не та мережа чи токен = кошти можуть пропасти',
    '. I agree to the': '. Погоджуюсь з', 'I agree to the': 'Погоджуюсь з', 'terms': 'умовами', 'and': 'і', 'shipping': 'умовами доставки',
    '. Drop 01 is a pre-order.': '. Drop 01 — це передзамовлення.', '. Drop 01 is a pre-order:': '. Drop 01 — це передзамовлення:',
    'full refund until it ships': 'повне повернення до відправки',
    'Get payment details': 'Отримати реквізити', 'Pay by card': 'Оплатити карткою', 'Opening PayPal…': 'Відкриваємо сторінку оплати…',
    /* v3.62: Western Bid disclaimers (their letter 23.11.2026) */
    'International customers are responsible for any customs duties, import taxes, VAT, brokerage fees, or other charges imposed by their country\'s customs authorities unless duties and taxes are explicitly stated as prepaid (DDP).': 'Покупці з-за кордону самі сплачують мито, імпортні податки, ПДВ, брокерські та інші збори митних органів своєї країни, якщо мито й податки прямо не зазначено як передплачені (DDP).',
    'Details': 'Детальніше', 'Card': 'Картка', 'PayPal': 'PayPal', 'Crypto': 'Крипта', 'Pay with PayPal': 'Оплатити через PayPal',
    'Card or PayPal · via Western Bid': 'Картка чи PayPal · через Western Bid', 'Charged in euro (€).': 'Списання в євро (€).',
    'Card: Stripe\'s secure page (Visa · Mastercard · Amex · Apple Pay · Google Pay). PayPal: PayPal\'s page. We never see your card.': 'Картка — захищена сторінка Stripe (Visa · Mastercard · Amex · Apple Pay · Google Pay). PayPal — сторінка PayPal. Дані картки ми не бачимо.',
    'Western Bid, Inc. is the Merchant of Record:': 'Western Bid, Inc. — продавець облікового запису (Merchant of Record):',
    'you\'ll see "WESTERN BID" as the payee on your PayPal account and card statement. Your bank may add a fee if your card isn\'t in euro.': 'одержувачем у PayPal і у виписці по картці буде «WESTERN BID». Якщо картка не в євро, банк може взяти комісію.',
    'Not available for delivery to Ukraine:': 'Недоступно для доставки в Україну:', 'pay with crypto.': 'оплати криптою.',
    'Full refund': 'Повне повернення', 'to your PayPal or card any time until it ships.': 'на PayPal чи картку будь-коли до відправки.',
    'Card and PayPal aren\'t available for delivery to Ukraine. Pay with crypto.': 'Картка й PayPal недоступні для доставки в Україну. Оплати криптою.',
    'Waiting for Stripe': 'Чекаємо на платіжний сервіс', 'Opening Stripe…': 'Відкриваємо сторінку оплати…',
    'Visa · Mastercard · Amex · Apple Pay · Google Pay': 'Visa · Mastercard · Amex · Apple Pay · Google Pay', 'PayPal account or card': 'PayPal-акаунт або картка',
    '03 / 03 · Insert coin': '03 / 03 · Кинь монетку', 'Insert': 'Кинь', 'coin.': 'монетку.', 'Waiting for block': 'Чекаємо на блок',
    'Send exactly': 'Надішли рівно', 'To this address ·': 'На цю адресу ·', 'Self-custody wallet': 'Власний гаманець (self-custody)',
    'Sent it? Check payment now': 'Надіслав? Перевірити оплату', 'Checking the chain…': 'Перевіряємо блокчейн…',
    'Pay with wallet': 'Оплатити з гаманця', 'Open in wallet app': 'Відкрити в гаманці',
    'The QR is the address only. Enter the exact amount yourself. Paying from an exchange? It may take its fee from the amount: make sure we receive the full amount.': 'QR містить лише адресу. Суму введи сам, точно. Платиш з біржі? Вона може відняти комісію з суми — подбай, щоб до нас дійшла повна сума.',
    'Wrong network = lost funds': 'Не та мережа = втрачені кошти',
    '. Not on any other network, and not another token, even if your wallet or exchange shows the same name. Funds sent that way may never arrive and may not be recoverable.': '. Не в іншій мережі й не іншим токеном, навіть якщо гаманець чи біржа показує ту саму назву. Такі кошти можуть не дійти, і повернути їх може бути неможливо.',
    'Underpaid = not confirmed': 'Недоплата = не підтверджено',
    '. Paying from an exchange (Binance, Coinbase…)? Add their withdrawal fee on top, so the amount that arrives is exact.': '. Платиш з біржі (Binance, Coinbase…)? Додай їхню комісію за виведення зверху, щоб дійшла точна сума.',
    'Sent less by mistake?': 'Випадково надіслав менше?', 'Don\'t send a new full payment.': 'Не надсилай повну суму ще раз.',
    'with order': 'з номером замовлення', 'and the transaction link. We\'ll sort it out by hand.': 'і посиланням на транзакцію. Розберемося вручну.',
    'We confirm automatically, usually within a minute. You can close this page: the link is in your email.': 'Підтверджуємо автоматично, зазвичай за хвилину. Сторінку можна закрити: посилання є в листі.',
    'Achievement unlocked': 'Досягнення відкрито', 'First revenue': 'Перша виручка', 'You\'re': 'Ти', 'in.': 'в клубі.',
    'Payment received. A confirmation is on its way to your inbox. We\'ll email the tracking number when Drop 01 ships.': 'Оплату отримано. Підтвердження вже летить на пошту. Трек-номер надішлемо, коли Drop 01 вирушить.',
    'Transaction': 'Транзакція', 'Back to the garage': 'Назад у гараж',
    'Confirming': 'Підтверджуємо', 'payment.': 'оплату.', 'Waiting for PayPal': 'Чекаємо на платіжний сервіс',
    'This usually takes a few seconds. You can close this page: we email the receipt as soon as the bank confirms.': 'Зазвичай це кілька секунд. Сторінку можна закрити: чек надішлемо, щойно банк підтвердить.',
    'Almost': 'Майже', 'there.': 'готово.', 'We received': 'Ми отримали', 'of': 'з',
    'is missing, usually an exchange fee.': 'бракує — зазвичай це комісія біржі.',
    'Check your email: you can top up the difference or get a refund.': 'Перевір пошту: можна доплатити різницю або отримати повернення.',
    'Don\'t send the full amount again.': 'Не надсилай повну суму ще раз.',
    'We sent back': 'Ми повернули', '. It can take a few minutes to show up in your wallet.': '. У гаманці кошти можуть з’явитися за кілька хвилин.',
    'Refund transaction': 'Транзакція повернення', 'the full amount to your card': 'повну суму на твою картку',
    'Time\'s up on this window.': 'Час на оплату минув.',
    'Already sent it? We still confirm payments for 24 hours after the order, you can close this page. Not sent yet?': 'Уже надіслав? Ми підтверджуємо оплати ще 24 години після замовлення, сторінку можна закрити. Ще не надіслав?',
    'Start a new order': 'Почни нове замовлення', ': the price is recalculated at today\'s rate.': ': ціну перерахуємо за сьогоднішнім курсом.',
    'This order has expired.': 'Це замовлення застаріло.', 'Nothing was paid on it.': 'Оплати за ним не було.',
    '. Sent a payment and don\'t see it? Email club@zeromrr.club with the order number and the transaction link.': '. Надіслав оплату, але її не видно? Напиши на club@zeromrr.club з номером замовлення і посиланням на транзакцію.',
    'Controls': 'Керування', 'No reservations on this email yet.': 'На цей email ще немає резервів.',
    'Founding price': 'Ціна засновника', 'Founding price · locked': 'Ціна засновника · зафіксована', '€# / tee · €# after launch': '€# / шт · €# після запуску',
    'founding': 'ціна засновника', 'Your cart is empty. Pick a tee below and press Add.': 'Кошик порожній. Обери футболку нижче й натисни «Додати».',
    'Inventory empty. Add a tee.': 'Інвентар порожній. Додай футболку.', 'pick country': 'обери країну',
    'Delivered, all in': 'З доставкою, усе включно', 'Import duty · prepaid': 'Імпортне мито · сплачено наперед',
    'Nothing to pay on arrival: import duty is already included and paid by us at dispatch.': 'При отриманні нічого не платиш: імпортне мито вже включене, ми сплачуємо його при відправці.',
    'Nothing to pay on arrival: import VAT and duties are already included and paid by us at dispatch.': 'При отриманні нічого не платиш: імпортний ПДВ і мито вже включені, ми сплачуємо їх при відправці.',
    'Import VAT, duties and fees, if any, are charged by your country on delivery. Not included above.': 'Імпортний ПДВ, мито й збори (якщо є) стягує твоя країна при отриманні. У суму вище не входять.',
    'Card · soon': 'Картка · скоро', 'Card': 'Картка', 'Crypto': 'Крипта', 'Online payments are not enabled yet.': 'Онлайн-оплату ще не ввімкнено.',
    'You\'re on the list ✓': 'Ти у списку ✓',
    'We\'ll email you when cards open. Your founding price stays until 48 hours after that.': 'Напишемо, коли відкриються картки. Ціна засновника діятиме ще 48 годин після цього.',
    'Too many attempts. Try again in an hour.': 'Забагато спроб. Спробуй за годину.', 'Busy right now. Try again in a minute.': 'Зараз завантажено. Спробуй за хвилину.',
    'We don\'t ship there yet. Email us.': 'Туди ми поки не доставляємо. Напиши нам.', 'Fill in the full address and phone.': 'Заповни повну адресу й телефон.',
    'Add your state / province.': 'Додай штат / провінцію.', 'Enter a valid email.': 'Введи коректний email.',
    'Extra-tee discount': 'Знижка за додаткову футболку', 'Game saved': 'Гру збережено', 'Save incomplete': 'Сейв не завершено',
    '03 / 03 · Card': '03 / 03 · Картка', 'Declined': 'Відхилено', 'Not paid': 'Не оплачено', 'Needs a check': 'Потрібна перевірка',
    'declined.': 'відхилено.', 'Not': 'Не', 'paid.': 'оплачено.', 'Needs a': 'Потрібна', 'check.': 'перевірка.',
    'This payment was not completed. Nothing was charged. Start again: your cart is saved to your email.': 'Оплату не завершено. Нічого не списано. Почни знову: кошик збережено за твоїм email.',
    'Paid': 'Оплачено', 'Expired · still watching': 'Час минув · ще стежимо',
    'Confirm in your wallet…': 'Підтверди в гаманці…', 'Sent · waiting for the block': 'Надіслано · чекаємо на блок',
    'Cancelled in the wallet.': 'Скасовано в гаманці.',
    'Not on the chain yet. Exchanges can take 1–10 minutes to send. You can close this page: we confirm every payment and email you, at the latest within 24 hours.': 'У блокчейні ще немає. Біржі можуть надсилати 1–10 хвилин. Сторінку можна закрити: ми підтверджуємо кожну оплату й пишемо на пошту — щонайпізніше за 24 години.',
    'Could not check right now. Try again in a minute.': 'Зараз не вдалося перевірити. Спробуй за хвилину.',
    'Checkout is unavailable right now.': 'Оформлення зараз недоступне.',

    /* legal page titles */
    'Terms of sale · $0 MRR CLUB': 'Умови продажу · $0 MRR CLUB'
  };
  /* same English, different meaning by place */
  var CTX = [
    ['#snd-l', { on: 'увімк', off: 'вимк' }],
    ['#sel-kv dt, #insp-tabs, #ti-cap', { Front: 'Спереду', Back: 'Спина' }],
    ['.warn', { Send: 'Надсилай', only: 'лише', on: 'у мережі', 'We must': 'Має надійти', 'receive exactly': 'рівно', Email: 'Напиши на' }],
    ['#hints, .hints', { Back: 'Назад' }]
  ];
  /* patterns (run on text with prices normalised to €#) */
  var SZ = '(S|M|L|XL)';
  var R = [
    [/^Drop 01: (\d+) tees\. One batch\. Made once\. No restock\. (Pre-order open\.|Coming soon\.)$/, function (m) { return 'Drop 01: ' + m[1] + ' футболок. Одна партія. Шиємо раз. Без дошиву. ' + (m[2][0] === 'P' ? 'Передзамовлення відкрито.' : 'Незабаром.'); }],
    [/^Founding member (#\S+)\. founding price €# on Drop 01 \(€# after launch\) \+ early access\.$/, 'Засновник $1. Ціна засновника €# на Drop 01 (€# після запуску) + ранній доступ.'],
    [/^Save pending: confirm (\S+) from your inbox\.$/, 'Збереження чекає: підтверди $1 у листі.'],
    [/^Join the founding members: €# founding price on Drop 01 \+ early access\.$/, 'Стань засновником: ціна засновника €# на Drop 01 + ранній доступ.'],
    [/^Sound: (on|off)$/, function (m) { return 'Звук: ' + (m[1] === 'on' ? 'увімк' : 'вимк'); }],
    [/^Graphics: (480p|HD)$/, 'Графіка: $1'],
    [/^(.+) · tap to flip$/, function (m) { return tr(m[1], { ctx: { Front: 'Спереду', Back: 'Спина' } }) + ' · торкнись, щоб перевернути'; }],
    [/^P(\d) · (Hero|Friend) ·$/, function (m) { return 'P' + m[1] + ' · ' + (m[2] === 'Hero' ? 'Герой' : 'Друг') + ' · '; }],
    [/^(Exclusive|New drop) ·$/, function (m) { return (m[1] === 'Exclusive' ? 'Ексклюзив' : 'Новинка') + ' · '; }],
    [/^Founding price · (one batch|1 of 1) · €# after launch$/, function (m) { return 'Ціна засновника · ' + (m[1] === 'one batch' ? 'одна партія' : '1 з 1') + ' · €# після запуску'; }],
    [/^Checkout · size (\S+)$/, 'Оплата · розмір $1'],
    [/^Pre-order size (\S+)( →)?$/, 'Передзамовити розмір $1$2'],
    [/^Reserve size (\S+)( →)?$/, 'Зарезервувати розмір $1$2'],
    [/^Reserved · (\S+) ✓$/, 'Зарезервовано · $1 ✓'],
    [/^Switch to size (\S+)$/, 'Змінити на розмір $1'],
    [/^Size (\S+) saved\. Opening checkout…$/, 'Розмір $1 збережено. Відкриваємо оплату…'],
    [/^Size (\S+) reserved for (.+)\.$/, 'Розмір $1 зарезервовано для $2.'],
    [new RegExp('^(.+) · size ' + SZ + '$'), '$1 · розмір $2'],
    [/^Drop 01 is the full first collection, all (\d+) tees in one launch\. Founding members pay €# per tee on their first order for the first 48 hours \(€# after that\), plus early access\. No code needed: it's tied to your email\.$/,
      'Drop 01 — це вся перша колекція, усі $1 футболок одним запуском. Засновники платять €# за футболку в першому замовленні протягом перших 48 годин (далі €#), плюс ранній доступ. Промокод не потрібен: ціна прив’язана до твого email.'],
    [/^Founding member (#\S+)$/, 'Засновник $1'],
    [/^Founding price €# on Drop 01 for the first 48 hours \(€# after that\) \+ early access\.( Your early price stays locked\.)? No code needed: use the same email at checkout\.$/,
      function (m) { return 'Ціна засновника €# на Drop 01 перші 48 годин (далі €#) + ранній доступ.' + (m[1] ? ' Твоя рання ціна залишається зафіксованою.' : '') + ' Промокод не потрібен: під час оплати вкажи той самий email.'; }],
    [/^Game saved · founding member (#\S+)$/, 'Гру збережено · засновник $1'],
    [/^Lock my €#$/, { keepEur: true }],
    /* checkout */
    [/^Save loaded\. (\d+) reserved tees? found\. Change sizes or drop what you don't want\.$/, 'Сейв завантажено. Знайдено зарезервованих футболок: $1. Зміни розміри або прибери зайве.'],
    [/^You already have (an order|orders): $/, function (m) { return m[1] === 'orders' ? 'У тебе вже є замовлення: ' : 'У тебе вже є замовлення: '; }],
    [/^ \((\d+) tees?, paid\)(, |\. The receipt is in your inbox\. Want another tee\? The founding discount was for the first order, so this one is at the regular price\.)$/,
      function (m) { return ' (футболок: ' + m[1] + ', оплачено)' + (m[2] === ', ' ? ', ' : '. Чек у тебе на пошті. Хочеш ще одну? Знижка засновника діяла на перше замовлення, тож ця — за звичайною ціною.'); }],
    [/^\+ Add · −€#$/, '+ Додати · −€#'],
    [/^\+ Add a second tee · −€#$/, '+ Додати другу футболку · −€#'],
    [/^(\d+) tees? × €#$/, '$1 шт × €#'],
    [/^Extra tee −€# each$/, 'Кожна наступна −€#'],
    [/^Import VAT & duty · prepaid(, (\d+)% on us)?$/, function (m) { return 'Імпортний ПДВ і мито · сплачено наперед' + (m[1] ? ', ' + m[2] + '% беремо на себе' : ''); }],
    [/^Nothing to pay on arrival: import VAT and duties are already included and paid by us at dispatch\. We cover the other half \(€#\)\.$/,
      'При отриманні нічого не платиш: імпортний ПДВ і мито вже включені, ми сплачуємо їх при відправці. Другу половину (€#) покриваємо ми.'],
    [/^(USDC|USDT) on (.+)$/, '$1 у мережі $2'],
    [/^Network fee (.*)$/, 'Комісія мережі $1'],
    [/^€# × ([\d.]+) \(EUR→USD, ECB rate\)( \+ a few cents to tell orders apart)?$/, function (m) { return { t: '€# × ' + m[1] + ' (EUR→USD, курс ЄЦБ)' + (m[2] ? ' + кілька центів, щоб розрізняти замовлення' : ''), keepEur: true }; }],
    [/^The bank didn't approve the payment( \((.+)\))?\. Nothing was charged\. Try again, use another card, or pay with crypto\.$/, function (m) { return 'Банк не схвалив оплату' + (m[1] ? ' (' + m[2] + ')' : '') + '. Нічого не списано. Спробуй ще, іншою карткою або криптою.'; }],
    [/^We received the payment but need to check the amount by hand\. We'll email you shortly\. Questions: club@zeromrr\.club, order (\S+)\.$/, 'Оплату отримано, але суму треба перевірити вручну. Скоро напишемо. Питання: club@zeromrr.club, замовлення $1.'],
    [/^Check again in (\d+)s$/, 'Перевірити знову через $1 с'],
    [/^TIME (\d+:\d+)$/, 'ЧАС $1'],
    [/^Order (\S+) not found\. Check the link in your email, or load your save below\.$/, 'Замовлення $1 не знайдено. Перевір посилання в листі або завантаж сейв нижче.'],
    [/^Wallet error: (.*)$/, 'Помилка гаманця: $1'],
    [/^(\d+) × (.+)$/, null]   /* cart line "1 × Tee name" — keep as is */
  ];

  /* ---------- engine ---------- */
  var ORIG = new WeakMap(), OUT = new WeakMap(), AORIG = new WeakMap();
  var SKIP = 'script,style,textarea,code,pre,[data-noi18n],.addr,#p-amt,#p-to,#p-tx,#r-tx';
  function ctxFor(el) {
    var o = null;
    for (var i = 0; i < CTX.length; i++) if (el && el.closest && el.closest(CTX[i][0])) { o = o || {}; for (var k in CTX[i][1]) o[k] = CTX[i][1][k]; }
    return o;
  }
  function tr(s, opt) {
    var m = /^(\s*)([\s\S]*?)(\s*)$/.exec(s), core = m[2];
    if (!core || !/[A-Za-z€]/.test(core)) return s;
    var prices = [], key = core.replace(/€\s?(\d+(?:[.,]\d+)?)/g, function (_, n) { prices.push(n); return '€#'; });
    var out = null, keep = false, ctx = opt && opt.ctx;
    if (ctx && ctx[key] != null) out = ctx[key];
    else if (D[key] != null) out = D[key];
    else {
      for (var i = 0; i < R.length; i++) {
        var mm = R[i][0].exec(key); if (!mm) continue;
        var v = R[i][1];
        if (v === null) { out = key; break; }
        if (typeof v === 'function') v = v(mm);
        if (typeof v === 'object') { keep = !!v.keepEur; out = v.t != null ? v.t : key; }
        else out = key.replace(R[i][0], v);
        break;
      }
      if (out == null && key.indexOf(' · ') > 0) {   /* "Shipping · Germany", "Visa · Mastercard" … */
        out = key.split(' · ').map(function (p) { return D[p] != null ? D[p] : p; }).join(' · ');
      }
      if (out == null) out = key;
    }
    var j = 0;
    out = out.replace(/€#/g, function () { var n = prices[j++]; return keep ? '€' + n : uah(n); });
    out = out.replace(/€(\d+(?:[.,]\d+)?)/g, function (_, n) { return keep ? '€' + n : uah(n); });   /* any price left in the text */
    return m[1] + out + m[3];
  }
  window.ZM_tr = tr;

  function doText(n) {
    var p = n.parentElement; if (!p || p.closest(SKIP)) return;
    if (OUT.has(n) && OUT.get(n) === n.data) return;            /* our own write */
    var en = n.data; ORIG.set(n, en);
    var t = tr(en, { ctx: ctxFor(p) });
    OUT.set(n, t); if (t !== en) n.data = t;
  }
  var ATTRS = ['placeholder', 'aria-label', 'title'];
  function doAttrs(el) {
    if (el.closest(SKIP)) return;
    var rec = AORIG.get(el) || {};
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute(a); if (v == null) continue;
      if (rec[a] && rec[a].out === v) continue;
      var t = tr(v); rec[a] = { en: v, out: t }; if (t !== v) el.setAttribute(a, t);
    }
    AORIG.set(el, rec);
  }
  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    if (root.matches && root.matches(SKIP)) return;
    doAttrs(root);
    var w = document.createTreeWalker(root, 5 /* element + text */), x;
    while ((x = w.nextNode())) { if (x.nodeType === 3) doText(x); else doAttrs(x); }
  }
  function retranslateAll() {
    var w = document.createTreeWalker(document.body, 4), x;
    while ((x = w.nextNode())) {
      if (!ORIG.has(x) || OUT.get(x) !== x.data) continue;
      var t = tr(ORIG.get(x), { ctx: ctxFor(x.parentElement) }); OUT.set(x, t); x.data = t;
    }
    if (document.title && TITLE) document.title = tr(TITLE);
  }
  var TITLE = '';
  function doTitle() { var t = document.title; if (!t) return; if (t === LASTT) return; TITLE = t; LASTT = tr(t); document.title = LASTT; }
  var LASTT = '';

  /* legal pages: a <template id="uk"> holds the Ukrainian text of <main> */
  function swapLegal() {
    var t = document.getElementById('uk'), m = document.querySelector('main');
    if (t && m && !m.dataset.uk) { m.innerHTML = t.innerHTML; m.dataset.uk = '1'; var d = t.getAttribute('data-title'); if (d) document.title = d; }
  }

  var mo = new MutationObserver(function (list) {
    for (var i = 0; i < list.length; i++) {
      var r = list[i];
      if (r.type === 'characterData') doText(r.target);
      else if (r.type === 'attributes') { if (r.target.nodeType === 1) doAttrs(r.target); }
      else for (var k = 0; k < r.addedNodes.length; k++) walk(r.addedNodes[k]);
      if (r.target && r.target.nodeName === 'TITLE') doTitle();
    }
  });
  mo.observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  document.addEventListener('DOMContentLoaded', function () { swapLegal(); doTitle(); walk(document.body); });
  if (document.readyState !== 'loading') { swapLegal(); doTitle(); walk(document.body); }
})();
