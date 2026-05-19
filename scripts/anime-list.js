const axios = require("axios");
const fs = require("fs");

const DELAY = 500;
const RETRY = 3;

const animes = [
  "Naruto",
  "Naruto Shippuden",
  "Avatar: The Last Airbender",
  "Tottoko Hamtarou",
  "Kaichou wa Maid-sama",
  "Ao Haru Ride",
  "Kimi ni Todoke",
  "Tonari no Kaibutsu-kun",
  "Vampire Knight",
  "Strike the Blood",
  "Chihayafuru",
  "Sukitte Ii na yo",
  "Akatsuki no Yona",
  "Itazura na Kiss",
  "Kotoura-san",
  "Kareshi Kanojo no Jijou",
  "Fukumenkei Noise",
  "Clannad",
  "Bokura ga Ita",
  "Yamato Nadeshiko Shichihenge",
  "Fruits Basket",
  "Boruto: Naruto Next Generations",
  "Brothers Conflict",
  "Inu x Boku SS",
  "Kimi no Na wa",
  "Ookami Shoujo to Kuro Ouji",
  "Toradora",
  "Gake no Ue no Ponyo",
  "Sen to Chihiro no Kamikakushi",
  "Akagami no Shirayuki-hime",
  "Free!",
  "Tokyo Ghoul",
  "Meiji Tokyo Renka",
  "Shigatsu wa Kimi no Uso",
  "Sirius the Jaeger",
  "Samurai Champloo",
  "Rurouni Kenshin",
  "InuYasha",
  "Devils Line",
  "Horimiya",
  "Wotaku ni Koi wa Muzukashii",
  "Kamisama Hajimemashita",
  "Kakuriyo no Yadomeshi",
  "Paradise Kiss",
  "Mononoke Hime",
  "Howl no Ugoku Shiro",
  "Diabolik Lovers",
  "Amnesia",
  "Code: Breaker",
  "Hiiro no Kakera",
  "Lovely Complex",
  "Kokoro Connect",
  "Net-juu no Susume",
  "Hakushaku to Yousei",
  "3D Kanojo: Real Girl",
  "Mahoutsukai no Yome",
  "Nisekoi",
  "Nurarihyon no Mago",
  "Bonjour Koiaji Patisserie",
  "Saiunkoku Monogatari",
  "Uta no☆Prince-sama♪",
  "Hakuouki Shinsengumi Kitan",
  "Nijiiro Days",
  "Vampire Princess Miyu",
  "Nil Admirari no Tenbin",
  "Bakemono no Ko",
  "Special A",
  "Kokoro ga Sakebitagatterunda",
  "Koe no Katachi",
  "Uchiage Hanabi",
  "Brave 10",
  "Tamako Love Story",
  "Tada-kun wa Koi wo Shinai",
  "Zutto Mae kara Suki deshita",
  "Ao no Exorcist",
  "Vampire Hunter D",
  "Soredemo Sekai wa Utsukushii",
  "Skip Beat!",
  "Devil May Cry",
  "Chain Chronicle",
  "Shiki",
  "Dance with Devils",
  "Otome Youkai Zakuro",
  "Nanatsu no Taizai",
  "Hyouka",
  "Tsuki ga Kirei",
  "Ookami Kodomo no Ame to Yuki",
  "Magi: Sinbad no Bouken",
  "Gekkan Shoujo Nozaki-kun",
  "Fruits Basket (2019)",
  "Fairy Gone",
  "Nobunaga the Fool",
  "Satsuriku no Tenshi",
  "Hellsing Ultimate",
  "Majo no Takkyuubin",
  "Gedo Senki",
  "Tenkuu no Shiro Laputa",
  "From Up on Poppy Hill",
  "Sengoku Night Blood",
  "Tonari no Totoro",
  "Kekkai Sensen",
  "Kaze Tachinu",
  "Mimi wo Sumaseba",
  "Fullmetal Alchemist: Brotherhood",
  "Neko no Ongaeshi",
  "Karigurashi no Arrietty",
  "Isshuukan Friends",
  "Bleach",
  "Only Yesterday",
  "Umi ga Kikoeru",
  "Kurenai no Buta",
  "Kaguya-hime no Monogatari",
  "Kaze no Stigma",
  "Super Lovers",
  "Dakaretai Otoko 1-i ni Odosarete Imasu",
  "Peach Girl",
  "Dame x Prince Anime Caravan",
  "Golden Time",
  "Cat's Eye",
  "Hitorijime My Hero",
  "Plunderer",
  "Hatenkou Yuugi",
  "Kenka Banchou Otome",
  "Ouran Koukou Host Club",
  "Dororo",
  "Fugou Keiji: Balance Unlimited",
  "Junjou Romantica",
  "Love Stage",
  "Stand My Heroes",
  "Code: Realize",
  "Sekaiichi Hatsukoi",
  "King's Raid",
  "ReLIFE",
  "Blood+",
  "Vanitas no Carte",
  "Blood-C",
  "Jujutsu Kaisen",
  "Natsume Yuujinchou",
  "Koroshi Ai",
  "Sasaki to Miyano",
  "Shingeki no Kyojin",
  "Spy x Family",
  "Koi to Yobu ni wa Kimochi Warui",
  "Koori Zokusei Danshi",
  "Tomo-chan wa Onnanoko",
  "Buddy Daddies",
  "Kaze no Tani no Nausicaa",
  "Mamahaha no Tsurego ga Motokano datta",
  "Yamada-kun to Lv999 no Koi wo Suru",
  "Phantom in the Twilight",
  "Nokemono-tachi no Yoru",
  "Skip to Loafer",
  "Kanojo ga Koushaku-tei ni Itta Riyuu",
  "Rurouni Kenshin (2023)",
  "Bungou Stray Dogs",
  "Watashi no Shiawase na Kekkon",
  "Ryuu to Sobakasu no Hime",
  "Tenki no Ko",
  "Suzume no Tojimari",
  "Noblesse",
  "Orange",
  "Sugar Apple Fairy Tale",
  "Ojoujo",
  "Koukyuu no Karasu",
  "Kusuriya no Hitorigoto",
  "Yubisaki to Renren",
  "Loop 7-kaime no Akuyaku Reijou",
  "Trinity Blood",
  "Momochi-san Chi no Ayakashi Ouji",
  "Sengoku Youko",
  "30-sai made Doutei dato Mahoutsukai ni Nareru Rashii",
  "Niehime to Kemono no Ou",
  "Kamonohashi Ron no Kindan Suiri",
  "Vampire Dormitory",
  "Hananoi-kun to Koi no Yamai",
  "Tadaima, Okaeri",
  "Unnamed Memory",
  "Shinrei Tantei Yakumo",
  "Tasogare Out Focus",
  "Mashiro no Oto",
  "Mushoku Tensei",
  "Rokka no Yuusha",
  "Kono Oto Tomare",
  "Kimitachi wa Dou Ikiru ka",
  "Kekkon Surutte, Hontou desu ka",
  "Yarinaoshi Reijou",
  "Hoshi Furu Oukoku no Nina",
  "Rekishi ni Nokoru Akujo",
  "Ao no Hako",
  "Ao no Miburo",
  "Raise wa Tanin ga Ii",
  "Boushoku no Berserk",
  "Gokusen",
  "Maou no Ore ga Dorei Elf",
  "Saikyou Onmyouji no Isekai Tenseiki",
  "Nanatsu no Maken ga Shihai suru",
  "Kaizoku Oujo",
  "Mars Red",
  "Yuri on Ice",
  "Solo Leveling",
  "Goblin Slayer",
  "Death Note"
];

const delay = (ms) => new Promise(r => setTimeout(r, ms));

function normalize(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

function isMatch(search, anime) {
  const s = normalize(search);

  const titles = [
    anime.title,
    anime.title_english,
    anime.title_japanese
  ].filter(Boolean).map(normalize);

  return titles.some(t => t.includes(s) || s.includes(t));
}

async function fetchAnime(name, attempt = 1) {
  try {
    // 1. SEARCH
    const search = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}&limit=5`
    );

    const results = search.data.data;
    const match = results.find(r => isMatch(name, r));

    if (!match) {
      return {
        original: name,
        title: null,
        image: null,
        episodes: null,
        score: null,
        reviews: null
      };
    }

    const id = match.mal_id;

    const details = await axios.get(
      `https://api.jikan.moe/v4/anime/${id}`
    );

    let reviews = null;

    try {
      const reviewRes = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/reviews`
      );

      reviews = reviewRes.data.data.slice(0, 3).map(r => ({
        user: r.user.username,
        score: r.score,
        text: r.review.substring(0, 200) // corta texto
      }));

    } catch {
      reviews = null;
    }

    return {
      original: name,
      title: match.title,
      image: match.images.jpg.image_url,
      episodes: details.data.data.episodes ?? null,
      score: details.data.data.score ?? null,
      reviews
    };

  } catch (err) {
    if (attempt < RETRY) {
      await delay(1000);
      return fetchAnime(name, attempt + 1);
    }

    return {
      original: name,
      title: null,
      image: null,
      episodes: null,
      score: null,
      reviews: null
    };
  }
}
async function run() {
  const output = [];

  for (const anime of animes) {
    console.log("Buscando:", anime);

    const data = await fetchAnime(anime);
    output.push(data);

    await delay(DELAY);
  }

  fs.writeFileSync(
    "anime-completo.json",
    JSON.stringify(output, null, 2)
  );

  console.log("✔ Finalizado:", output.length);
}

run();