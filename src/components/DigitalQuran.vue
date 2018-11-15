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
                    v-model="page"
                    :total-visible="5"
                    :length="604"
                    @input="next"
                     circle
                  ></v-pagination>
                </v-card-text >
                  </v-flex>
                   <v-flex xs4>
                  <v-card-text class="px-0">{{items[0].juz}}</v-card-text>
                  </v-flex>
                </v-layout>
                <hr style="margin-bottom:5px;">
                <ul>
                  <li v-for="(item,index) in items" :key="index">
                     <span >{{item.text}}</span>
                     <!-- {{item.text}} -->                    
                     <span class="ayah-number">﴿ {{item.numberInSurah | arabicNumber }} ﴾</span>
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
          },
          pagination: {},
          page:2,
      
    };
  },
  created() {
    this.next(this.page=1);
  },
  computed: {
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
        this.items = response.data.data.ayahs;
      })
      .catch(e => {
        this.errors.push(e);
        // console.log(e)
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
  padding: 8px;
  margin:  5px;
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
  font-size: 25px;
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
span :last-of-type {
  padding-right: 50px;
}
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
</style>
