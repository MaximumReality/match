const CACHE_NAME = 'azulos-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'hard-cyberpunk.mp3',
  'litter-box.png',
  'smokin.png',
  'mochkil-burger.png',
  // Add all your cereal .png filenames here!
  'winter_azulos.png',
  'azulos_galaxy_mix.png',
  'azulos_neon_crunch.png',
  'azulo_blueberry_vanilla.jpg',
  'azulos_glitch_cereal.png',
  'summer_azulos.png',
  'mochkil_puffs_orange.png',
  'mochkil_puffs_dessert_edition.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
