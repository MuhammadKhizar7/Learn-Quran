<template>
      <v-container grid-list-md text-xs-center>
          <v-layout row wrap>     
            <v-flex md9 xs12>
              <v-card color="white" class="">
                <v-card-text class="px-0">{{surahName}}</v-card-text>
                <hr >
                <ul>
                  <li v-for="(item,index) in items" :key="index">
                     <span >{{item.text}}</span>
                     <!-- {{item.text}} -->                    
                     <span class="ayah-number">{{"﴿"+(index+1)+"﴾"}}</span>
                  </li>
                </ul>
              </v-card>
            </v-flex>
            <v-flex  md3 xs12>
              <v-card dark color="primary">
                <v-card-text class="px-0">4</v-card-text>
              </v-card>
            </v-flex> 
          </v-layout>
    <a-player :music="audioQuran" ref="player"></a-player>
        </v-container>
        
</template>

<script>
import axios from "axios";
import VueAplayer from 'vue-aplayer';
export default {
  components:{
     'a-player': VueAplayer
  },
  data() {
    return {
      surahName: "",
      items: [],
      errors: [],
      bottomNav: 'recent',
      audioQuran: 
          {
            title: 'Al Quran',
            artist: 'Abdul Samad',
            src: 'http://cdn.alquran.cloud/media/audio/ayah/ar.abdulsamad/689',
            pic: 'http://annisa-today.ru/wp-content/uploads/2017/10/islamic_wallpaper_6.jpg',
            // lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
          }
      
    };
  },
  created() {
    const url = "http://api.alquran.cloud/page/1/quran-uthmani"; // Get 10 random users
    axios
      .get(url) // Call the fetch function passing the url of the API as a parameter
      .then(response => {
        // JSON responses are automatically parsed.
        // console.log(response.data.data.ayahs[0].surah.name);
        this.surahName = response.data.data.ayahs[0].surah.name;
        this.items = response.data.data.ayahs;
      })
      .catch(e => {
        this.errors.push(e);
        // console.log(e)
      });
  }
};
</script>

<style scoped>
.v-card {
  /* background-color: #f9f9f9 !important; */
}
ul {
  padding-left: 0px;
}
li {
  /* font-family: Scheherazade, Scheheraza; */
  font-size: 1.5em;
  padding: 0px 5px;
  margin: 0px 5px;
  list-style: none;
  direction: ltr;
  text-align: center;
  font-family: "AmiriQuranRegular", sans-serif;
  font-weight: normal;
  line-height: 2.5em;
  word-spacing: 2px;
  display: inline;
  cursor: pointer;
  /* word-wrap: break-word; */
}
li:hover {
  background-color: rgb(231, 223, 176) !important;
  /* color: #ffffff; */
  cursor: pointer;
}
.v-card__text {
  font-size: 25px;
  font-weight: bold;
  font-family: "LateefRegular", sans-serif;
}
.ayah-number {
  direction: rtl;
  display: inline-flex;
  font-size: 0.85em;
  white-space: nowrap;
  color: #050;
  cursor: pointer;
}
span :last-of-type {
  padding-right: 50px;
}
.aplayer{
    position: absolute;
    bottom: 0;
    left: -5px;
    right: 7px;
    width: 100%;
    margin-bottom: 0px;
}
</style>