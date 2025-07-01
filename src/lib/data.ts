
import type { LocaleContent } from '@/lib/types';

const heroImageUrl = 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/Art%20Beauty%20Zone%20%D1%84%D0%BE%D0%BD%20%D0%BD%D0%B0%20%D1%85%D0%B5%D0%B0%D0%B4%D0%B5%D1%80.jpg?alt=media&token=909e2189-a5ea-41eb-bf05-c392f65e8de0';

const galleryImageUrls = {
    laser: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/d5745632-0ab7-4b7d-b5df-a68c7b9d9f5d.jpeg?alt=media&token=a114f26a-f89d-4315-a54f-33d05c7f82a3',
    lpg: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/IMG_4143.jpeg?alt=media&token=c57613be-2f51-4430-9834-0fd86f487933',
    madero: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/IMG_2839.jpeg?alt=media&token=5d1b2971-b092-4609-9d97-7dda6e25bfcd',
    rf: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/IMG_4140.jpeg?alt=media&token=34d80f09-9ca3-4218-8d70-d42f85a008d0',
    physio: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/IMG_3582.jpeg?alt=media&token=057826c2-55fe-4ae4-92ba-b667f7412d6d',
    cupping: 'https://firebasestorage.googleapis.com/v0/b/artbeautyzonesalon.firebasestorage.app/o/IMG_2838.jpeg?alt=media&token=47950c84-920a-4e75-98a4-e422a8bf62cf',
};


export const locales: Record<string, LocaleContent> = {
  bg: {
    navLinks: [
      { href: '#services', label: 'Процедури' },
      { href: '#promotions', label: 'Промоции' },
      { href: '#about', label: 'За нас' },
      { href: '#gallery', label: 'Галерия' },
      { href: '#contact', label: 'Контакти' },
      { href: '#faq', label: 'Въпроси' },
    ],
    hero: {
      title: 'Където науката среща изкуството',
      subtitle: 'Открийте ново ниво на красота и увереност с нашите модерни процедури за лазерна епилация и грижа за тялото.',
      primaryCta: 'Запази час',
      secondaryCta: 'Нашите процедури',
      imageUrl: heroImageUrl
    },
    services: {
      title: 'Нашите специални процедури',
      subtitle: 'Предлагаме подбрана селекция от процедури, използвайки само най-добрите технологии и техники.',
      learnMore: 'Научи повече',
      categories: [
          {
            category: 'Лазерна епилация жени',
            icon: 'LaserIcon',
            items: [
              {
                name: '',
                prices: [
                  { type: 'Цели крака 30–45 минути', price: '125' },
                  { type: 'Подбедрици 15–30 минути', price: '55' },
                  { type: 'Бедра 20–40 минути', price: '65' },
                  { type: 'Пръсти крака 5-10 минути', price: '16' },
                  { type: 'Цели ръце 15-30 минути', price: '45' },
                  { type: '1/2 ръце 10-20 минути', price: '25' },
                  { type: 'Китки 5-10 минути', price: '16' },
                  { type: 'Пръсти ръце 5-10 минути', price: '14' },
                  { type: 'Цяло лице(горна устна,брадичка,бакембарди,скули) 10-20 минути', price: '40' },
                  { type: 'Горна устна 5-10 минути', price: '14' },
                  { type: 'Скули 5-10 минути', price: '14' },
                  { type: 'Бакенбарди 5–10 минути', price: '15' },
                  { type: 'Брадичка 5–10 минути', price: '16' },
                  { type: 'Брадичка + горна устна 5–10 минути', price: '23' },
                  { type: 'Брадичка + шия 5–10 минути', price: '23' },
                  { type: 'Шия 5–10 минути', price: '14' },
                  { type: 'Подмишници 5–10 минути', price: '16' },
                  { type: 'Общи бикини(цял интим) 10-20 минути', price: '45' },
                  { type: 'Външни бикини 10-20 минути', price: '25' },
                  { type: 'Седалище 10-15 минути', price: '35' },
                  { type: 'Гърди 20-30 минути', price: '35' },
                  { type: 'Гърди лента 5-10 минути', price: '14' },
                  { type: 'Корем 10-20 минути', price: '35' },
                  { type: 'Корем лента 5–10 минути', price: '14' },
                  { type: 'Гръб 20–40 минути', price: '70' },
                  { type: 'Гръб + рамене 20–40 минути', price: '95' },
                  { type: 'Рамене 10–20 минути', price: '25' },
                  { type: 'Врат 5-10 минути', price: '16' },
                  { type: 'Кръст 10-20 минути', price: '35' },
                ],
              },
            ],
          },
           {
            category: 'Лазерна епилация мъже',
            icon: 'LaserIcon',
            items: [
              {
                name: '',
                prices: [
                  { type: 'Цели крака 30–45 минути', price: '160' },
                  { type: 'Подбедрици 15–30 минути', price: '80' },
                  { type: 'Бедра 20–40 минути', price: '85' },
                  { type: 'Пръсти крака 5-10 минути', price: '16' },
                  { type: 'Цели ръце 15-30 минути', price: '65' },
                  { type: '1/2 ръце 10-20 минути', price: '40' },
                  { type: 'Китки 5-10 минути', price: '16' },
                  { type: 'Пръсти ръце 5-10 минути', price: '14' },
                  { type: 'Цяло лице(горна устна,брадичка,бакембарди,скули) 10-20 минути', price: '40' },
                  { type: 'Горна устна 5-10 минути', price: '14' },
                  { type: 'Скули 5-10 минути', price: '14' },
                  { type: 'Бакенбарди 5–10 минути', price: '15' },
                  { type: 'Брадичка 5–10 минути', price: '16' },
                  { type: 'Брадичка + горна устна 5–10 минути', price: '23' },
                  { type: 'Брадичка + шия 5–10 минути', price: '23' },
                  { type: 'Шия 5–10 минути', price: '14' },
                  { type: 'Подмишници 5–10 минути', price: '16' },
                  { type: 'Слип 10-15 минути', price: '35' },
                  { type: 'Седалище 10-15 минути', price: '40' },
                  { type: 'Гърди 20-30 минути', price: '50' },
                  { type: 'Гърди лента 5-10 минути', price: '14' },
                  { type: 'Корем 10-20 минути', price: '50' },
                  { type: 'Корем лента 5–10 минути', price: '14' },
                  { type: 'Гръб 20–40 минути', price: '100' },
                  { type: 'Гръб + рамене 20–40 минути', price: '120' },
                  { type: 'Рамене 10–20 минути', price: '35' },
                  { type: 'Врат 5-10 минути', price: '20' },
                  { type: 'Кръст 10-20 минути', price: '50' },
                ],
              },
            ],
          },
          {
            category: 'LPG антицелулитна процедура',
            icon: 'LpgIcon',
            items: [
              { name: 'Тяло', price: '40', description: '40-50 минути. Извършва се с апарат "LPG Lipo M6".' },
            ],
          },
          {
            category: 'Радиочестотен лифтинг',
            icon: 'RadioFrequencyIcon',
            items: [
              { name: 'Лице', price: '25', description: '30 минути' },
              { name: 'Шия и деколте', price: '25', description: '30 минути' },
              { name: 'Корем', price: '25', description: '30 минути' },
              { name: 'Седалище', price: '25', description: '30 минути' },
            ],
          },
          {
            category: 'Вендузотерапия',
            icon: 'CuppingIcon',
            items: [
                { name: 'Гръб', price: '30', description: '40 минути' },
                { name: 'Гръб + крака', price: '40', description: '50 минути' }
            ],
          },
          {
            category: 'Физиотерапия',
            icon: 'PhysioIcon',
            items: [
              { name: 'Ултразвукова терапия с медикамент', price: '20', description: '15-30 минути' },
              { name: 'Кинезио тейпинг', price: '15', description: '' },
              { name: 'Рехабилитационна програма', price: '50', description: 'Консултация+изготвяне на индивидуална програма(комплекс упражнения и терапия) с времетраене 60-90 минути' },
            ],
          },
      ]
    },
    promotions: {
        title: "Промоционални пакети",
        subtitle: "Възползвайте се от нашите специални оферти",
        noPromotions: "В момента няма активни промоции.",
        packages: [
            {
                id: 'promo-1',
                icon: 'Gift',
                title: 'Цели крака – жени',
                description: 'от 125лв. намален на 75 лв.',
                cta: 'Запази сега',
                visible: true,
            },
            {
                id: 'promo-2',
                icon: 'Package',
                title: 'Цял интим + подмишници жени',
                description: 'от 61лв. намален на 45 лв.',
                cta: 'Запази сега',
                visible: true,
            },
            {
                id: 'promo-3',
                icon: 'Sparkles',
                title: 'Цял интим + подбедрици – жени',
                description: 'от 100лв. намален на 70 лв.',
                cta: 'Запази сега',
                visible: true,
            },
            {
                id: 'promo-4',
                icon: 'ShieldCheck',
                title: 'Корем + гърди + подмишници - мъже',
                description: 'от 116лв. намален на 90 лв.',
                cta: 'Запази сега',
                visible: true,
            },
            {
                id: 'promo-5',
                icon: 'Award',
                title: 'Цяло тяло жени',
                description: '(цели крака, цели ръце, цял интим, подмишници) – от 231лв. намален на 150 лв.',
                cta: 'Запази сега',
                visible: true,
            },
            {
                id: 'promo-6',
                icon: 'ShieldCheck',
                title: 'Цяло тяло мъже',
                description: '(цели крака, цели ръце, подмишници, корем, гърди) – от 341лв. намален на 260 лв.',
                cta: 'Запази сега',
                visible: true,
            },
        ]
    },
    about: {
      title: 'За Art Beauty Zone',
      heading: 'За Art Beauty Zone',
      p1: 'Основана на принципите на иновации, изкуство и грижа за клиента, Art Beauty Zone е повече от салон. Вярваме в подчертаването на вашата естествена красота чрез персонализирани, научно-обосновани процедури.',
      p2: 'Нашият екип от сертифицирани терапевти, включително и дипломиран рехабилитатор, е посветен на предоставянето на максимална грижа, отношение и качество. Инвестираме в най-новите технологии, за да осигурим безопасни, ефективни и комфортни процедури за всички наши клиенти, като използваме PrimeLase HR Exellence - най-мощният диоден лазер.',
      cta: 'Запознай се с екипа',
      noStaff: 'Екипът ни ще бъде представен скоро.',
    },
    gallery: {
        title: 'Нашата Галерия',
        images: [
            { id: 1, src: galleryImageUrls.laser, alt: 'Резултат от лазерна епилация', hint: 'legs skin', title: 'Лазерна епилация', description: 'Гладка кожа и дълготрайни резултати с нашата модерна лазерна технология.' },
            { id: 2, src: galleryImageUrls.lpg, alt: 'LPG антицелулитна процедура в процес', hint: 'woman abdomen', title: 'LPG антицелулитна процедура', description: 'Ефективно оформяне на тялото и намаляване на целулита с апарат "LPG Lipo M6".' },
            { id: 3, src: galleryImageUrls.madero, alt: 'Мадеротерапия за тяло', hint: 'body contouring', title: 'Мадеротерапия', description: 'Натурален метод за извайване на фигурата и тонизиране на кожата.' },
            { id: 4, src: galleryImageUrls.rf, alt: 'Радиочастотен лифтинг на лице', hint: 'face lifting', title: 'Радиочастотен лифтинг', description: 'Неинвазивна процедура за стягане и подмладяване на кожата.' },
            { id: 5, src: galleryImageUrls.physio, alt: 'Апаратура за ултразвукова терапия', hint: 'ultrasound therapy', title: 'Физиотерапия', description: 'Модерна апаратура за ефективни физиотерапевтични процедури.' },
            { id: 6, src: galleryImageUrls.cupping, alt: 'Вендузотерапия', hint: 'cupping therapy', title: 'Вендузотерапия', description: 'Традиционен метод за облекчаване на болка и напрежение.' },
        ],
    },
    location: {
      title: 'Посетете ни',
      subtitle: 'Намерете своя оазис на красота и спокойствие в сърцето на града.',
      address: 'гр. Варна, ул. Генерал Столипин 22, България',
      phone: '+359 87 770 1929',
      email: 'artbeautyzonevarna@gmail.com',
      openInMaps: 'Отвори в Google Maps'
    },
    contact: {
      title: 'Запазете час',
      subtitle: 'Имате въпроси или искате да запазите час? Попълнете формата и ще се свържем с вас.',
      namePlaceholder: 'Вашето име',
      emailPlaceholder: 'Вашият имейл',
      messagePlaceholder: 'Вашето съобщение',
      sendButton: 'Изпрати съобщение',
      successTitle: 'Съобщението е изпратено!',
      successDescription: 'Получихме съобщението ви и ще се свържем с вас скоро.',
    },
    footer: {
      quickLinks: 'Бързи връзки',
      sanctuary: 'Вашето светилище за модерни процедури за красота и здраве.',
      copyright: 'Всички права запазени.',
    },
    faq: {
        title: "Често задавани въпроси",
        subtitle: "Намерете отговори на най-често задаваните въпроси тук.",
        items: [
            {
                question: "Болезнена ли е лазерната епилация?",
                answer: "Нашата технология е от последно поколение и е проектирана да бъде максимално безболезнена. Повечето клиенти усещат леко затопляне или пощипване."
            },
            {
                question: "Колко процедури са необходими за траен ефект?",
                answer: "Броят на процедурите варира в зависимост от зоната, типа кожа и косъм. Обикновено са необходими между 6 и 8 сесии за оптимални резултати."
            },
            {
                question: "Как да се подготвя за процедура?",
                answer: "За лазерна епилация, зоната трябва да бъде избръсната 24 часа преди процедурата. За нашата лазерна технология не трябва да сте се излагали на силно слънце, солариум и сауна 3 дни преди процедурата и 3 дни след процедурата. Също така не трябва да използвате ексфолианти, автобронзанти и химичен пилинг поне 7 дни преди процедурата за зоната, която желаете да третирате с лазерна епилация."
            },
             {
                question: "Какво трябва да направя преди да започна процедури лазерна епилация?",
                answer: "Преди да започнете лазерна епилация, е важно да следвате няколко стъпки, за да се подготвите правилно и да постигнете най-добрите резултати.\n\nИзбягвайте слънцето: 4 дни преди процедурата трябва да избягвате излагането на кожата на слънце, солариуми и други загряващи процедури.\n14 дни за тялото и 10 дни за лицето – косъмчетата не трябва да бъдат отскубвани с кола-маска, епилатор, пинсета. В деня преди процедурата зоната трябва гладко да бъде избръсната. Зоните от лице, по възможност не се премахват, те ще бъдат обработени от нас преди процедурата. Запомнете – за зони от лице не използвайте бръснач!\nАко приемате някакви медикаменти – трябва да уведомите вашият специалист, тъй като някои от медикаментите правят кожата чувствителна към светлината на лазера.\nИзбягвайте лосиони, автобронзанти, пилинги и кремове: Преди процедурата избягвайте използването на лосиони, кремове, дезодоранти или други продукти, които може да съдържат съставки, които правят кожата чувствителна или увеличават риска от раздразнения.\nСпазвайте инструкциите на специалиста: След консултацията и преди процедурата, спазете инструкциите и указанията на лазерния специалист относно как да се подготвите и какво да очаквате след терапията.\nПланирайте няколко сесии: Обикновено са необходими няколко сесии (6-8 броя), разположени на интервали от около 6-9 седмици, за да се постигнат желаните резултати. След процедурата е важно да следвате инструкциите за грижа за кожата и защита от слънцето."
            },
            {
                question: "През колко време се прави лазерна епилация?",
                answer: "Това е един изключително важен въпрос и е в основата за добрите резултати. Периодите не зависят от лазера, с който се извършват процедурите, а от активната фаза на растеж на косъма, когато коренът се е образувал и лазерът е най-ефективен. Периодите са: зони от лице – 30-40 дни, Зони от торс (интим, ръце, корем, гърди, гръб, подмишници и тн.) – 45-65 дни, зона крака – 60-90 дни. Всеки, по-къс период от тези, е загуба за вашите пари и време. За по-кратки периоди от тези, косменият фоликул не може да се образува в кожата, което означава че няма да има какво да се третира в зоната. Качествените лазерни центрове работят с тези интервали. Останалите китайски технологии с ниска мощност работят през къси интервали от 20-30 дни независимо от зоната, тъй като те не унищожават косменият фоликул, а само приспиват и забавят растежа."
            },
            {
                question: "Има ли риск от рак на кожата?",
                answer: "Лазерната епилация се предлага в световен мащаб като метод за отстраняване на нежелано окосмяване повече от 20 години и досега няма известен случай на рак на кожата вследствие третиране с лазер за епилация. Импулсът на лазера има свойството да се привлича от меланина (пигмента) в косъма, където светлината на импулса се превръща в топлина и унищожава луковицата на косъма. Не засяга околни тъкани. При третиране с лазер бенките задължително се покриват с бял молив, така че разпръснатата светлина от лазера да не ги засегне по никакъв начин. Така правим допълнителна защита на проблемните зони по кожата като бенките. Кожата има много физиологични функции като потене, регулиране на телесната температура, усещане и т.н. Лазерът няма да повреди нормалната функция на кожата. Той е напълно безопасен за вашата кожа."
            },
            {
                question: "Ползите от най-мощния лазер в естетиката, с който работим - PrimeLase HR Excellence?",
                answer: "1. Дълготрайни резултати: Лазерната епилация може да предостави дълготрайни резултати. След завършване на пълен курс от сесии се постига перманентно премахване на космите с ефект над 90%\n2. По-гладка и нежна кожа: Лазерната епилация не само премахва космите, но и подобрява текстурата на кожата. Кожата става по-гладка, по-млада и нежна след процедурата.\n3. Без раздразнения и пигментации: В сравнение с други методи за премахване на космите, като кола-маска и бръснене, лазерната епилация елиминира тези проблеми.\nПредимството ни, че работим с най-съвременната и най-мощната лазерна технология в световен мащаб, ни дава абсолютно предимство с изключителни резултати с много малко на брой процедури. Заради голямата му пикова мощност, можем да третираме еднакво ефективно както плътни и тъмни косъмчета, така и светли и тънки косъмчета."
            },
            {
                question: "Има ли възрастови ограничения за лазерна епилация?",
                answer: "Няма възрастово ограничение, но процедурите при деца под 18 години се извършват със съгласие от родител."
            }
        ]
    },
  },
  en: {
    navLinks: [
      { href: '#services', label: 'Procedures' },
      { href: '#promotions', label: 'Promotions' },
      { href: '#about', label: 'About Us' },
      { href: '#gallery', label: 'Gallery' },
      { href: '#contact', label: 'Contact' },
      { href: '#faq', label: 'FAQ' },
    ],
    hero: {
      title: 'Where Science Meets Art',
      subtitle: 'Discover a new level of beauty and confidence with our advanced laser and body care treatments.',
      primaryCta: 'Book Now',
      secondaryCta: 'Our Procedures',
      imageUrl: heroImageUrl
    },
    services: {
      title: 'Our Signature Procedures',
      subtitle: 'We provide a curated selection of treatments using only the best technology and techniques.',
      learnMore: 'Learn More',
      categories: [],
    },
    promotions: {
        title: "Promotional Packages",
        subtitle: "Take advantage of our special offers",
        noPromotions: "There are currently no active promotions.",
        packages: []
    },
    about: {
      title: 'About Art Beauty Zone',
      heading: 'About Art Beauty Zone',
      p1: 'Founded on the principles of innovation, art, and client care, Art Beauty Zone is more than a salon. We believe in enhancing your natural beauty through personalized, science-based procedures.',
      p2: 'Our team of certified therapists, including a certified rehabilitator, is dedicated to providing maximum care, a professional attitude, and quality service. We invest in the latest technologies to ensure safe, effective, and comfortable treatments for all our clients, using PrimeLase HR Exellence - the most powerful diode laser.',
      cta: 'Meet The Team',
      noStaff: 'Our team will be introduced soon.',
    },
    gallery: {
        title: 'Our Gallery',
        images: [
            { id: 1, src: galleryImageUrls.laser, alt: 'Result from laser hair removal', hint: 'legs skin', title: 'Laser Hair Removal', description: 'Smooth skin and long-lasting results with our modern laser technology.' },
            { id: 2, src: galleryImageUrls.lpg, alt: 'LPG anti-cellulite procedure in progress', hint: 'woman abdomen', title: 'LPG Anti-Cellulite Procedure', description: 'Effective body shaping and cellulite reduction with the "LPG Lipo M6" device.' },
            { id: 3, src: galleryImageUrls.madero, alt: 'Maderotherapy for body', hint: 'body contouring', title: 'Maderotherapy', description: 'A natural method for sculpting the body and toning the skin.' },
            { id: 4, src: galleryImageUrls.rf, alt: 'Radiofrequency face lifting', hint: 'face lifting', title: 'Radiofrequency Lifting', description: 'A non-invasive procedure for skin tightening and rejuvenation.' },
            { id: 5, src: galleryImageUrls.physio, alt: 'Ultrasound therapy equipment', hint: 'ultrasound therapy', title: 'Physiotherapy', description: 'Modern equipment for effective physiotherapy procedures.' },
            { id: 6, src: galleryImageUrls.cupping, alt: 'Cupping therapy', hint: 'cupping therapy', title: 'Cupping Therapy', description: 'A traditional method for relieving pain and tension.' },
        ],
    },
    location: {
      title: 'Visit Us',
      subtitle: 'Find your oasis of beauty and tranquility in the heart of the city.',
      address: 'Varna, 22 General Stolipin Str, Bulgaria',
      phone: '+359 87 770 1929',
      email: 'artbeautyzonevarna@gmail.com',
      openInMaps: 'Open in Google Maps'
    },
    contact: {
      title: 'Book an Appointment',
      subtitle: 'Have questions or want to book? Fill out the form and we\'ll be in touch.',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      messagePlaceholder: 'Your Message',
      sendButton: 'Send Message',
      successTitle: 'Message Sent!',
      successDescription: 'We\'ve received your message and will get back to you shortly.',
    },
    footer: {
      quickLinks: 'Quick Links',
      sanctuary: 'Your sanctuary for advanced beauty and wellness treatments.',
      copyright: 'All rights reserved.',
    },
     faq: {
        title: "Frequently Asked Questions",
        subtitle: "Find answers to the most common questions here.",
        items: [
            {
                question: "Is laser hair removal painful?",
                answer: "Our latest generation technology is designed to be as painless as possible. Most clients feel a slight warming or tingling sensation."
            },
            {
                question: "How many procedures are needed for a lasting effect?",
                answer: "The number of procedures varies depending on the area, skin type, and hair. Typically, between 6 and 8 sessions are needed for optimal results."
            },
            {
                question: "How do I prepare for a procedure?",
                answer: "For laser hair removal, the area must be shaved 24 hours before the procedure. With our laser technology, you should not expose yourself to strong sun, solariums, or saunas for 3 days before and 3 days after the procedure. You should also not use exfoliants, self-tanners, or chemical peels for at least 7 days before the procedure on the area you wish to treat with laser hair removal."
            },
            {
                question: "What should I do before starting laser hair removal procedures?",
                answer: "Before starting laser hair removal, it's important to follow a few steps to prepare properly and achieve the best results. Here are the main things to do:\n\nAvoid the sun: 4 days before the procedure, you should avoid exposing the skin to the sun, solariums, and other heating procedures.\nFor the body, do not pluck hairs with wax, epilator, or tweezers for 14 days, and for the face, for 10 days. The day before the procedure, the area must be smoothly shaved. Facial areas, if possible, are not removed; they will be treated by us before the procedure. Remember – do not use a razor for facial areas!\nIf you are taking any medications, you must inform your specialist, as some medications make the skin sensitive to the laser light.\nAvoid lotions, self-tanners, peels, and creams: Before the procedure, avoid using lotions, creams, deodorants, or other products that may contain ingredients that make the skin sensitive or increase the risk of irritation.\nFollow the specialist's instructions: After the consultation and before the procedure, follow the instructions and guidance of the laser specialist on how to prepare and what to expect after the therapy.\nPlan several sessions: Usually, several sessions (6-8) are needed, spaced at intervals of about 6-9 weeks, to achieve the desired results. After the procedure, it is important to follow the instructions for skin care and sun protection."
            },
            {
                question: "How often is laser hair removal done?",
                answer: "This is an extremely important question and is fundamental for good results. The periods do not depend on the laser used for the procedures, but on the active growth phase of the hair, when the root has formed and the laser is most effective. The periods are: facial areas – 30-40 days, Torso areas (bikini, arms, abdomen, chest, back, underarms, etc.) – 45-65 days, Leg area – 60-90 days. Any shorter period than these is a waste of your money and time. For shorter periods, the hair follicle cannot form in the skin, which means there will be nothing to treat in the area. Quality laser centers work with these intervals. Other low-power Chinese technologies work at short intervals of 20-30 days regardless of the area, as they do not destroy the hair follicle, but only put it to sleep and slow down growth."
            },
            {
                question: "Is there a risk of skin cancer?",
                answer: "Laser hair removal has been offered worldwide as a method for removing unwanted hair for more than 20 years, and so far there is no known case of skin cancer as a result of treatment with a hair removal laser. The laser pulse is attracted to the melanin (pigment) in the hair, where the light of the pulse is converted into heat and destroys the hair bulb. It does not affect surrounding tissues. When treating with a laser, moles are mandatory covered with a white pencil so that the scattered light from the laser does not affect them in any way. This provides additional protection to problematic skin areas like moles. The skin has many physiological functions such as sweating, regulating body temperature, sensation, etc. The laser will not damage the normal function of the skin. It is completely safe for your skin."
            },
            {
                question: "What are the benefits of the most powerful laser in aesthetics we work with - PrimeLase HR Excellence?",
                answer: "1. Long-lasting results: Laser hair removal can provide long-lasting results. After completing a full course of sessions, permanent hair removal with an effect of over 90% is achieved.\n2. Smoother and gentler skin: Laser hair removal not only removes hair but also improves the texture of the skin. The skin becomes smoother, younger, and more delicate after the procedure.\n3. No irritation and pigmentation: Compared to other hair removal methods, such as waxing and shaving, laser hair removal eliminates these problems.\nOur advantage of working with the most advanced and powerful laser technology worldwide gives us an absolute edge with exceptional results in a very small number of procedures. Due to its high peak power, we can treat both thick and dark hairs as well as light and thin hairs with equal effectiveness."
            },
            {
                question: "Are there age restrictions for laser hair removal?",
                answer: "There is no age restriction, but procedures on children under 18 are performed with parental consent."
            }
        ]
    },
  },
  ru: {
    navLinks: [
      { href: '#services', label: 'Процедуры' },
      { href: '#promotions', label: 'Акции' },
      { href: '#about', label: 'О нас' },
      { href: '#gallery', label: 'Галерея' },
      { href: '#contact', label: 'Контакты' },
      { href: '#faq', label: 'Вопросы' },
    ],
    hero: {
      title: 'Где наука встречается с искусством',
      subtitle: 'Откройте для себя новый уровень красоты и уверенности с нашими передовыми процедурами лазерной эпиляции и ухода за телом.',
      primaryCta: 'Записаться',
      secondaryCta: 'Наши процедуры',
      imageUrl: heroImageUrl
    },
    services: {
      title: 'Наши фирменные процедуры',
      subtitle: 'Мы предлагаем тщательно подобранный выбор процедур с использованием только лучших технологий и методик.',
      learnMore: 'Узнать больше',
      categories: [],
    },
     promotions: {
        title: "Акции и пакеты",
        subtitle: "Воспользуйтесь нашими специальными предложениями",
        noPromotions: "На данный момент активных акций нет.",
        packages: []
    },
    about: {
      title: 'О Art Beauty Zone',
      heading: 'О Art Beauty Zone',
      p1: 'Основанная на принципах инноваций, искусства и заботы о клиенте, Art Beauty Zone - это больше, чем салон. Мы верим в подчеркивание вашей естественной красоты с помощью персонализированных, научно-обоснованных процедур.',
      p2: 'Наша команда сертифицированных терапевтов, включая дипломированного реабилитолога, посвящена предоставлению максимального ухода, профессионального отношения и качественного обслуживания. Мы инвестируем в новейшие технологии, чтобы обеспечить безопасные, эффективные и комфортные процедуры для всех наших клиентов, используя PrimeLase HR Exellence - самый мощный диодный лазер.',
      cta: 'Познакомиться с командой',
      noStaff: 'Наша команда будет представлена в ближайшее время.',
    },
    gallery: {
        title: 'Наша Галерея',
        images: [
            { id: 1, src: galleryImageUrls.laser, alt: 'Результат лазерной эпиляции', hint: 'legs skin', title: 'Лазерная эпиляция', description: 'Гладкая кожа и долговременные результаты с нашей современной лазерной технологией.' },
            { id: 2, src: galleryImageUrls.lpg, alt: 'LPG антицеллюлитная процедура в процессе', hint: 'woman abdomen', title: 'LPG антицеллюлитная процедура', description: 'Эффективное формирование тела и уменьшение целлюлита с аппаратом "LPG Lipo M6".' },
            { id: 3, src: galleryImageUrls.madero, alt: 'Мадеротерапия для тела', hint: 'body contouring', title: 'Мадеротерапия', description: 'Натуральный метод для моделирования фигуры и тонизирования кожи.' },
            { id: 4, src: galleryImageUrls.rf, alt: 'Радиочастотный лифтинг лица', hint: 'face lifting', title: 'Радиочастотный лифтинг', description: 'Неинвазивная процедура для подтяжки и омоложения кожи.' },
            { id: 5, src: galleryImageUrls.physio, alt: 'Оборудование для ультразвуковой терапии', hint: 'ultrasound therapy', title: 'Физиотерапия', description: 'Современное оборудование для эффективных физиотерапевтических процедур.' },
            { id: 6, src: galleryImageUrls.cupping, alt: 'Баночная терапия', hint: 'cupping therapy', title: 'Баночная терапия', description: 'Традиционный метод для облегчения боли и напряжения.' },
        ],
    },
    location: {
      title: 'Посетите нас',
      subtitle: 'Найдите свой оазис красоты и спокойствия в самом сердце города.',
      address: 'Варна, ул. Генерал Столипин 22, Болгария',
      phone: '+359 87 770 1929',
      email: 'artbeautyzonevarna@gmail.com',
      openInMaps: 'Открыть в Google Maps'
    },
    contact: {
      title: 'Записаться на прием',
      subtitle: 'Есть вопросы или хотите записаться? Заполните форму, и мы свяжемся с вами.',
      namePlaceholder: 'Ваше имя',
      emailPlaceholder: 'Ваш email',
      messagePlaceholder: 'Ваше сообщение',
      sendButton: 'Отправить сообщение',
      successTitle: 'Сообщение отправлено!',
      successDescription: 'Мы получили ваше сообщение и скоро свяжемся с вами.',
    },
    footer: {
      quickLinks: 'Быстрые ссылки',
      sanctuary: 'Ваше святилище для передовых процедур красоты и здоровья.',
      copyright: 'Все права защищены.',
    },
     faq: {
        title: "Часто задаваемые вопросы",
        subtitle: "Найдите ответы на самые распространенные вопросы здесь.",
        items: [
            {
                question: "Болезненна ли лазерная эпиляция?",
                answer: "Наша технология последнего поколения разработана таким образом, чтобы быть максимально безболезненной. Большинство клиентов ощущают легкое тепло или покалывание."
            },
            {
                question: "Сколько процедур необходимо для стойкого эффекта?",
                answer: "Количество процедур варьируется в зависимости от зоны, типа кожи и волос. Обычно для достижения оптимальных результатов требуется от 6 до 8 сеансов."
            },
            {
                question: "Как мне подготовиться к процедуре?",
                answer: "Для лазерной эпиляции область необходимо побрить за 24 часа до процедуры. С нашей лазерной технологией вам не следует подвергаться воздействию сильного солнца, солярия или сауны за 3 дня до и 3 дня после процедуры. Также не следует использовать эксфолианты, автозагары или химические пилинги в течение как минимум 7 дней до процедуры на области, которую вы хотите обработать лазером."
            },
            {
                question: "Что мне нужно сделать перед началом процедур лазерной эпиляции?",
                answer: "Преди да започнете лазерна епилация, е важно да следвате няколко стъпки, за да се подготвите правилно и да постигнете най-добрите резултати. Ето основните неща, които трябва да направите:\n\nИзбягвайте слънцето: 4 дни преди процедурата трябва да избягвате излагането на кожата на слънце, солариуми и други загряващи процедури.\n14 дни за тялото и 10 дни за лицето – косъмчетата не трябва да бъдат отскубвани с кола-маска, епилатор, пинсета.  В деня преди процедурата зоната трябва гладко да бъде избръсната. Зоните от лице, по възможност не се премахват, те ще бъдат обработени от нас преди процедурата. Запомнете – за зони от лице не използвайте бръснач!\nАко приемате някакви медикаменти – трябва да уведомите вашият специалист, тъй като някои от медикаментите правят кожата чувствителна към светлината на лазера.\nИзбягвайте лосиони, автобронзанти, пилинги и кремове: Преди процедурата избягвайте използването на лосиони, кремове, дезодоранти или други продукти, които може да съдържат съставки, които правят кожата чувствителна или увеличават риска от раздразнения.\nСпазвайте инструкциите на специалиста: След консултацията и преди процедурата, спазете инструкциите и указанията на лазерния специалист относно как да се подготвите и какво да очаквате след терапията.\nПланирайте няколко сесии: Обикновено са необходими няколко сесии (6-8 броя), разположени на интервали от около 6-9 седмици, за да се постигнат желаните резултати. След процедурата е важно да следвате инструкциите за грижа за кожата и защита от слънцето."
            },
            {
                question: "Как часто проводится лазерная эпиляция?",
                answer: "Това е един изключително важен въпрос и е в основата за добрите резултати. Периодите не зависят от лазера, с който се извършват процедурите, а от активната фаза на растеж на косъма, когато коренът се е образувал и лазерът е най-ефективен.  Периодите са: зони от лице – 30-40 дни, Зони от торс (интим, ръце, корем, гърди, гръб, подмишници и тн.) – 45-65 дни, зона крака – 60-90 дни. Всеки, по-къс период от тези, е загуба за вашите пари и време. За по-кратки периоди от тези, косменият фоликул не може да се образува в кожата, което означава че няма да има какво да се третира в зоната. Качествените лазерни центрове работят с тези интервали. Останалите китайски технологии с ниска мощност работят през къси интервали от 20-30 дни независимо от зоната, тъй като те не унищожават косменият фоликул, а само приспиват и забавят растежа."
            },
            {
                question: "Существует ли риск рака кожи?",
                answer: "Лазерната епилация се предлага в световен мащаб като метод за отстраняване на нежелано окосмяване повече от 20 години и досега няма известен случай на рак на кожата вследствие третиране с лазер за епилация. Импулсът на лазера има свойството да се привлича от меланина (пигмента) в косъма, където светлината на импулса се превръща в топлина и унищожава луковицата на косъма. Не засяга околни тъкани. При третиране с лазер бенките задължително се покриват с бял молив, така че разпръснатата светлина от лазера да не ги засегне по никакъв начин. Така правим допълнителна защита на проблемните зони по кожата като бенките. Кожата има много физиологични функции като потене, регулиране на телесната температура, усещане и т.н. Лазерът няма да повреди нормалната функция на кожата. Той е напълно безопасен за вашата кожа."
            },
            {
                question: "Каковы преимущества самого мощного лазера в эстетике, с которым мы работаем - PrimeLase HR Excellence?",
                answer: "1. Дълготрайни резултати: Лазерната епилация може да предостави дълготрайни резултати. След завършване на пълен курс от сесии се постига перманентно премахване на космите с ефект над 90%\n2. По-гладка и нежна кожа: Лазерната епилация не само премахва космите, но и подобрява текстурата на кожата. Кожата става по-гладка, по-млада и нежна след процедурата.\n3. Без раздразнения и пигментации: В сравнение с други методи за премахване на космите, като кола-маска и бръснене, лазерната епилация елиминира тези проблеми.\nПредимството ни, че работим с най-съвременната и най-мощната лазерна технология в световен мащаб, ни дава абсолютно предимство с изключителни резултати с много малко на брой процедури. Заради голямата му пикова мощност, можем да третираме еднакво ефективно както плътни и тъмни косъмчета, така и светли и тънки косъмчета."
            },
            {
                question: "Есть ли возрастные ограничения для лазерной эпиляции?",
                answer: "Няма възрастово ограничение, но процедурите при деца под 18 години се извършват със съгласие от родител."
            }
        ]
    },
  },
};
