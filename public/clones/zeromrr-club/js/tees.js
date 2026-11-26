/* $0 MRR CLUB · v3.45 · ONE source of truth for the catalog (Roman 19.11).
   Price, founding discount, the pre-order switch, tees, sizes, size charts, status, dispatch.
   Used by:  /            the game (index.html reads price/off/sale/colour/oos/sizes/size chart from here)
             /shop, /shop/<slug>   static pages generated from this file: node tools/build-shop.mjs
             /checkout    size labels (S/M, L/XL)
   The server charges by api/_crypto.js (BASE_EUR, ON_SALE). tools/build-shop.mjs stops if they disagree.
   Old €34 reservations: api/_founding.js (founding_members.off_pct) — not touched here.
   After editing: node tools/build-shop.mjs  (rebuilds /shop pages), then deploy. */
(function (root) {
  'use strict';

  /* Sizes. z = the code stored in the DB (S/M/L/XL — DB checks allow only these), l = what the buyer sees,
     c = DB codes that mean this size (old reservations of the two-size tees were made in S/M/L/XL). */
  var SZ4 = [{ l: 'S', z: 'S', c: ['S'] }, { l: 'M', z: 'M', c: ['M'] }, { l: 'L', z: 'L', c: ['L'] }, { l: 'XL', z: 'XL', c: ['XL'] }];
  var SZ2 = [{ l: 'S/M', z: 'M', c: ['S', 'M'] }, { l: 'L/XL', z: 'L', c: ['L', 'XL'] }];
  /* Size charts, flat, cm (19.11, real product) */
  var GRID4 = { cols: ['S', 'M', 'L', 'XL'], w: [54, 58, 62, 66], len: [70, 72, 74, 76] };
  var GRID2 = { cols: ['S/M', 'L/XL'], w: [54, 59], len: [72, 75] };

  var STOCK = { k: 'stock', s: 'Pre-order', l: 'Pre-order · ships first', avail: 'PreOrder' };   // Roman 23.11: everything is a pre-order, all ships in December
  var MAKING = { k: 'making', s: 'Pre-order', l: 'Pre-order · ships later in December', avail: 'PreOrder' };
  var OOS = { k: 'oos', s: 'Out of stock', l: 'Out of stock', avail: 'OutOfStock' };

  /* Dispatch estimates (Roman 19.11). /terms §4 and /shipping list both waves (23.11). */
  var WAVE1 = { d: 'Ships early December', s: 'ships early December' };
  var WAVE2 = { d: 'Ships mid–late December', s: 'ships mid–late December' };

  var ZM = {
    v: '3.45',
    price: 49,            // € full price
    off: 20,              // % founding discount for new founding members → €39
    legacyOff: 30,        // reserved before 13.11 → €34 (server decides: api/_founding.js)
    sale: true,           // true = pre-order open: Buy goes to /checkout (same switch for the game and the shop)
    currency: 'EUR',
    material: 'Heavyweight oversized cotton tee',
    /* TODO(Roman): composition and fabric weight — only after the factory confirms. Shown to buyers as "confirmed with the production sample". */
    composition: null,
    print: 'Screen print, water-based inks',
    fit: 'Oversized, boxy, dropped shoulders',
    tees: [
      { id: 'book-a-demo', name: 'BOOK A DeMO', title: 'Book a DeMO tee', n1: 'Book a', n2: 'DeMO tee',
        colour: 'sky blue', blank: 'Ray Oversize', status: STOCK, ship: WAVE1, sizes: SZ2, grid: GRID2,
        front: '/shop/img/book-a-demo-front.webp', back: '/shop/img/book-a-demo-back.webp', og: '/mail/book-a-demo.jpg',
        printFront: '$0 MRR, hand-written', printBack: 'BOOK A DeMO + your own phone number',
        tag: '1 of 1 · you write the number',
        blurb: 'The only demo anyone has ever actually booked.',
        copy: ['The back says BOOK A DeMO and a phone number. Yours. A textile marker comes in the box: write your own number, iron it, and you have a sales team of one walking around the city.',
               'No two exist, because nobody else has your number. The one in the photo is a sample (please don’t call it).'],
        photoNote: 'Photo: sample number on the back, yours goes there.' },

      { id: 'ceo-of-nothing', name: 'CEO OF NOTHING', title: 'CEO of Nothing tee', n1: 'CEO of', n2: 'Nothing tee',
        colour: 'brown', blank: 'Ray Oversize', status: STOCK, ship: WAVE1, sizes: SZ2, grid: GRID2,
        front: '/shop/img/ceo-of-nothing-front.webp', back: '/shop/img/ceo-of-nothing-back.webp', og: '/mail/ceo-of-nothing.jpg',
        printFront: '$0 MRR, small, left chest', printBack: 'CEO OF NOTHING',
        tag: 'Title. No team. Full authority.',
        blurb: 'Full title, zero direct reports, unlimited authority over nothing.',
        copy: ['A small $0 MRR on the chest for the people you talk to. CEO OF NOTHING on the back for everyone walking behind you at the coworking.',
               'Board meetings are held in the mirror. Quorum is always reached.'],
        photoNote: '' },   // 23.11: new photos in plain solid brown (not garment-dyed)

      { id: 'you-met-me', name: 'YOU MET ME AT A VERY $0 MRR TIME IN MY LIFE', title: 'You Met Me tee', n1: 'You met me', n2: '$0 MRR tee',
        colour: 'champagne', blank: 'Ray Oversize Premium Unisex, two-thread knit', status: MAKING, ship: WAVE2, sizes: SZ4, grid: GRID4,
        front: '/shop/img/you-met-me-front.webp', back: '/shop/img/you-met-me-back.webp', og: '/mail/you-met-me.jpg',
        printFront: 'YOU MET ME AT A VERY $0 MRR TIME IN MY LIFE.', printBack: '$0 MRR CLUB, small',
        tag: 'The HERO tee from the reels',
        blurb: 'For when someone asks what you do. Answer before they finish the question.',
        copy: ['The big front print from the reels: YOU MET ME AT A VERY $0 MRR TIME IN MY LIFE, with $0 MRR in red. A small $0 MRR CLUB on the back.',
               'Wear it now, so in five years you can say you were there. At the very $0 MRR time.'],
        /* TODO(Roman): mockup is light gray; production colour is champagne → replace photo */
        photoNote: 'Photo shows the light-gray sample. The real tee is champagne: a warm off-white that looks almost white in person.', photoTodo: 1 },

      { id: 'tell-your-investors', name: 'TELL YOUR INVESTORS', title: 'Tell Your Investors tee', n1: 'Tell your', n2: 'investors tee',
        colour: 'champagne', blank: 'Ray Oversize Premium Unisex, two-thread knit', status: MAKING, ship: WAVE2, sizes: SZ4, grid: GRID4,
        front: '/shop/img/tell-your-investors-front.webp', back: '/shop/img/tell-your-investors-back.webp', og: '/mail/tell-your-investors.jpg',
        printFront: '$0 MRR CLUB, small', printBack: 'TELL YOUR INVESTORS THAT I’M A BIG FAN OF THEIR MONEY',
        tag: 'Six lines. Zero ambiguity.',
        blurb: 'Big red letters on the back. A compliment, technically.',
        copy: ['TELL YOUR INVESTORS THAT I’M A BIG FAN OF THEIR MONEY, six lines in red bold grotesk on the back. Small $0 MRR CLUB on the front.',
               'Wear it to the pitch. Or wear it after the pitch, depending on how the pitch went.'],
        /* TODO(Roman): mockup is bone/light; production colour is champagne → replace photo */
        photoNote: 'Photo shows the earlier bone sample. The real tee is champagne: a warm off-white that looks almost white in person.', photoTodo: 1 },

      { id: 'all-revenue-reserved', name: 'ALL REVENUE RESERVED', title: 'All Revenue Reserved tee', n1: 'All revenue', n2: 'reserved tee',
        colour: 'washed sand ombré', blank: null, status: OOS, ship: null, sizes: [], grid: null, oos: 1,
        front: '/shop/img/all-revenue-reserved-front.webp', back: '/shop/img/all-revenue-reserved-back.webp', og: '/mail/all-revenue-reserved.jpg',
        printFront: '$0 MRR CLUB, small', printBack: 'A big red 0 made of “© 2026, designed in a garage, all revenue reserved”',
        tag: 'Back in Drop 02',
        blurb: 'Hand-dyed ombré took longer than our runway.',
        copy: ['A big red 0 filled with “© 2026, designed in a garage, all revenue reserved”. Fitting, since all the revenue is indeed reserved. For later.',
               'The hand-dyed ombré takes longer than the rest of Drop 01, so this one is out of stock. Back in Drop 02.'],
        photoNote: '' }
    ]
  };

  ZM.fprice = Math.round(ZM.price * (100 - ZM.off) / 100);           // €39
  ZM.find = function (id) { for (var i = 0; i < ZM.tees.length; i++) if (ZM.tees[i].id === id) return ZM.tees[i]; return null; };
  ZM.sizes = function (id) { var t = ZM.find(id); return t && t.sizes.length ? t.sizes : SZ4; };
  /* any stored code (S/M/L/XL) → the code of the size this tee really has */
  ZM.norm = function (id, z) { var s = ZM.sizes(id); for (var i = 0; i < s.length; i++) if (s[i].c.indexOf(z) >= 0) return s[i].z; return z || null; };
  ZM.label = function (id, z) { var s = ZM.sizes(id); for (var i = 0; i < s.length; i++) if (s[i].c.indexOf(z) >= 0) return s[i].l; return z || ''; };
  ZM.onSale = function () { return ZM.tees.filter(function (t) { return !t.oos; }).map(function (t) { return t.id; }); };

  root.ZM_SHOP = ZM;
  if (typeof module !== 'undefined' && module.exports) module.exports = ZM;
})(typeof window !== 'undefined' ? window : globalThis);
