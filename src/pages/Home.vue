<template>
  <div class="home-container">
    <!-- Bannière de bienvenue -->
    <div class="banner">
      <h1>Bienvenue sur <span class="brand">MusicWave</span> 🎵</h1>
      <p>Découvrez les meilleures playlists, artistes et albums du moment.</p>
    </div>

    <!-- Nouveautés Spotify avec scrollbar horizontale -->
    <section class="section">
      <h2>🎵 Nouveautés Spotify</h2>
      <div v-if="albums.length" class="scroll-container">
        <div v-for="album in albums" :key="album.id" class="card">
          <img :src="album.images[0].url" :alt="album.name" class="cover" />
          <p class="title"><strong>{{ album.name }}</strong> - {{ album.artists[0].name }}</p>
          <div class="button-group">
            
            <router-link :to="'/album/' + album.id" class="album-link">Voir l'album</router-link>
          </div>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    <!-- 
    Mettre les bonnes données dans les sections suivantes

    Artistes en Tendance
     <section class="section">
      <h2>🔥 Musiques de la Playlist</h2>
      <div v-if="trendingArtists.length" class="scroll-container">
        <div v-for="track in trendingArtists" :key="track.id" class="card">
          <img :src="track.album.images[0]?.url" :alt="track.name" class="cover"/> 
          <p class="title"><strong>{{ track.name }}</strong> - {{ track.artists[0].name }}</p>
          <a :href="track.external_urls.spotify" target="_blank">Écouter sur Spotify</a>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>


    Artistes peu connus 
    <section class="section">
      <h2>🚀 Artistes peu connus</h2>
      <div v-if="undergroundArtists.length" class="scroll-container">
        <div v-for="artist in undergroundArtists" :key="artist.id" class="card">
          <img :src="artist.images[0]?.url" :alt="artist.name" class="cover rounded"/>
          <p class="title"><strong>{{ artist.name }}</strong></p>
          <a :href="artist.external_urls.spotify" target="_blank">Découvrir</a>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>

    Albums Populaires 
    <section class="section">
      <h2>💿 Albums Populaires</h2>
      <div v-if="popularAlbums.length" class="scroll-container">
        <div v-for="album in popularAlbums" :key="album.id" class="card">
          <img :src="album.images[0].url" :alt="album.name" class="cover"/>
          <p class="title"><strong>{{ album.name }}</strong> - {{ album.artists[0].name }}</p>
          <a :href="album.external_urls.spotify" target="_blank">Écouter</a>
        </div>
      </div>
      <p v-else>Chargement...</p>
    </section>
    -->
  </div>
</template>

<script>
// Importation des services Spotify pour récupérer les données musicales
import { getNewReleases, getArtists, getRecommandations, getPlaylists } from "../../services/spotify";

export default {
  // Définition des données réactives du composant
  data() {
    return {
      albums: [],              // Stocke les nouveautés d'albums
      trendingArtists: [],     // Stocke les artistes en tendance
      undergroundArtists: [],  // Stocke les artistes peu connus
      popularAlbums: []        // Stocke les albums populaires
    };
  },

  // Hook de cycle de vie exécuté à la création du composant
  async created() {
    // Récupération des données depuis les API Spotify
    this.albums = await getNewReleases();             // Obtient les nouveautés
    this.trendingArtists = await getArtists();        // Obtient les artistes en tendance
    this.undergroundArtists = await getRecommandations(); // Obtient les artistes peu connus
    this.popularAlbums = await getPlaylists();        // Obtient les albums populaires
  }
};
</script>

<style scoped>
.home-container {
  background: linear-gradient(to bottom, #1e1e2e, #15151e);
  color: white;
  min-height: 100vh;
  padding: 2rem;
}

.banner {
  text-align: center;
  padding: 3rem 0;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  margin-bottom: 2rem;
}

.brand {
  color: #a65fdf;
  font-weight: bold;
}

.section {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

/* Styles du conteneur avec scrollbar */
.scroll-container {
  display: flex;
  overflow-x: auto;
  gap: 1rem;
  padding: 0.5rem 0;
  -webkit-overflow-scrolling: touch;
  /* Pour une meilleure expérience sur iOS */
  scrollbar-width: thin;
  /* Pour Firefox */
  scrollbar-color: #a65fdf rgba(255, 255, 255, 0.1);
  /* Pour Firefox */
}

/* Personnalisation de la scrollbar pour Chrome, Edge et Safari */
.scroll-container::-webkit-scrollbar {
  height: 8px;
}

.scroll-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.scroll-container::-webkit-scrollbar-thumb {
  background-color: #a65fdf;
  border-radius: 4px;
}

.card {
  flex: 0 0 auto;
  width: 200px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.2);
}

.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.rounded {
  border-radius: 50%;
}

.title {
  margin-top: 0.5rem;
  font-size: 1rem;
  color: #ffffff;
}

/* Responsive */
@media (max-width: 768px) {
  .card {
    width: 150px;
  }

  .cover {
    height: 120px;
  }
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}

.spotify-link,
.album-link {
  padding: 0.5rem;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  transition: all 0.2s ease;
}

.spotify-link {
  background-color: #1DB954;
  color: white;
}

.album-link {
  background-color: #a65fdf;
  color: white;
}

.spotify-link:hover,
.album-link:hover {
  opacity: 0.9;
  transform: scale(1.05);
}
</style>