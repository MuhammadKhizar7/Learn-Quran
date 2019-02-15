<template>
      <v-container grid-list-md text-xs-center>
          <v-layout row wrap>     
            <v-flex md9 xs12>
              <div dir="rtl" lang="ar">
              <v-card color="white" class="" >
                <v-layout>
                   <v-flex xs4>
                  <v-card-text class="px-0">{{surahName}}</v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text  class="px-0">
                  <v-pagination
                    prev-icon="mdi-menu-right"
                    next-icon="mdi-menu-left"
                    color="teal"
                    v-model="pagination.page"
                    :total-visible="pagination.totalVisible"
                    :length="pagination.total"
                    @input="next"
                     circle
                  ></v-pagination>
                </v-card-text >
                  </v-flex>
                   <v-flex xs4>
                  <v-card-text class="px-0"> الجزء {{juz | arabicNumber}}</v-card-text>
                  </v-flex>
                </v-layout>
                <hr style="margin-bottom:5px;">
                <ul>
                  <li v-for="(ayah,index) in ayahs" :key="index">
                     <span >{{ayah.text}}</span>                  
                     <span class="ayah-number">﴿ {{ayah.numberInSurah | arabicNumber }} ﴾</span>
                     <!-- <hr> -->
                  </li>
                </ul>
              </v-card>
              </div>
            </v-flex>
            <v-flex  md3 xs12>
              <v-card dark color="primary">
                <v-card-text class="px-0">4</v-card-text>
              </v-card>
            </v-flex> 
          </v-layout>
  <div v-if="isLoaded">
      <a-player 
        autoplay
        controls
        preload=false
        :muted.sync="muted"
        :volume.sync="volume" 
        :music="currentAudio"  
        :list="audioQuran"
        :listFolded=true
        :shuffledList="audioQuran"
         ref="player"/>
  </div>
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
      surahName: '',
      ayahs: [],
      juz:'',
      errors: [],
      bottomNav: 'recent',
      audioQuran:[],
        volume: 1,
        muted: false,
        pagination: {
            page:1,
            total:604,
            totalVisible:5
          },
          isLoaded:false   
    };
  },
  created() {
    this.next(this.page=1);
  },
  computed: {
    currentAudio:function(){
     return this.audioQuran[0] !==null ? this.audioQuran[0] : {src:''}
    }
  },
  methods:{
    next(page){
      const url = "http://api.alquran.cloud/page/"+page+"/quran-uthmani"; // Get 10 random users
    axios
      .get(url) // Call the fetch function passing the url of the API as a parameter
      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response.data.data);
        this.surahName = response.data.data.ayahs[0].surah.name;
        this.ayahs = response.data.data.ayahs;
        this.juz = response.data.data.ayahs[0].juz;
        this.audioQuran=[];
         response.data.data.ayahs.forEach(element => {
           this.audioQuran.push({
             title: element.surah.englishName,
             artist: 'Abdul Samad',
             src: 'http://cdn.alquran.cloud/media/audio/ayah/ar.abdulsamad/'+element.number,
             pic:'http://annisa-today.ru/wp-content/uploads/2017/10/islamic_wallpaper_6.jpg'
           })
        });
        // this.isLoaded=true

      }).then(()=>{
        this.isLoaded=true
      })
      .catch(e => {
        this.errors.push(e);
        console.log(e)
      });
    }
  }
};
</script>

<style scoped>
.container{
  padding-bottom: 30px;
  margin-bottom: 30px;
}
.v-card {
  /* background-color: #f9f9f9 !important; */
  padding: 10px;
}
/* ul {
  padding-left: 0px;
} */
li {
  /* font-family: Scheherazade, Scheheraza; */
  font-size: 1.5em;
  /* padding: 2px; */
  margin:  2px;
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
  background-color: rgb(201, 231, 176) !important;
  color: black;
  /* font-weight: bold;
  font-size: 2em; */
  cursor: pointer;
}
.v-card__text {
  font-size: 20px;
  font-weight: bold;
  font-family: "LateefRegular", sans-serif;
  padding: 0px;
}
.ayah-number {
  direction: rtl;
  display: inline-flex;
  font-size: 0.6em;
  white-space: nowrap;
  color: rgb(116, 86, 4);
  cursor: pointer;
}
/* span :last-of-type {
  padding-right: 50px;
} */
.aplayer{
    position: fixed;
    bottom: 0;
    left: -5px;
    right: 0px;
    width: 100%;
    margin-bottom: 0px;
    z-index: 20;
}

</style>
<style>
.theme--light.v-pagination li{
  visibility: hidden;
  display: inline;
}
.theme--light.v-pagination .v-pagination__item {
    /* visibility: hidden !important; */
    display:none
}
.theme--light.v-pagination .v-pagination__item--active {
     visibility: visible !important;
     display:block;

}
.theme--light.v-pagination .v-pagination__navigation .v-icon{
  visibility: visible !important;
}
.theme--light.v-pagination li .v-pagination__more{
 display:none
}
.v-pagination__item--active {
    -webkit-box-shadow: none;
    box-shadow: none;
    color:black;
}
</style>
