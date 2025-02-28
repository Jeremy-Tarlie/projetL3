// store/musicStore.js
import { defineStore } from 'pinia';
import { getAccessToken } from '../../services/spotify'; // Ajoutez cette ligne

export const useMusicStore = defineStore('music', {
  state: () => ({
    currentAlbum: null,
    albumTracks: [],
    currentTrack: null
  }),
  
  actions: {
    async fetchAlbum(albumId) {
      // Récupérer les détails de l'album depuis l'API Spotify
      const token = await getAccessToken();
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const data = await response.json();
      this.currentAlbum = data;
      this.albumTracks = data.tracks.items;
      return data;
    },
    
    setCurrentTrack(track) {
      this.currentTrack = track;
    }
  }
});