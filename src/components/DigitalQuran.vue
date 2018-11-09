<template>
      <v-container grid-list-md text-xs-center>
          <v-layout row wrap>     
            <v-flex md9 xs12>
              <v-card color="white" class="border-img ">
                <v-card-text class="px-0">{{surahName}}</v-card-text>
                <hr style="border:0px">
                <!-- <div v-for="(item,index) in items" :key="index">
                 <span>
                    <span >{{item.text}}</span>
                    <span>﴾0﴿<span> 
                    <span>
                </div> -->
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
        </v-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      surahName: "",
      items: []
    };
  },
  created() {
    let arr = [];
    let name = null;
    const url = "http://api.alquran.cloud/page/6/quran-uthmani"; // Get 10 random users
    axios
      .get(url) // Call the fetch function passing the url of the API as a parameter
      .then(response => {
        // JSON responses are automatically parsed.
        console.log(response.data.data.ayahs[0].surah.name);
        this.surahName = response.data.data.ayahs[0].surah.name;
        this.items = response.data.data.ayahs;
      })
      .catch(e => {
        // this.errors.push(e)
        // console.log(e)
      });
    // .then(resp => resp.json())
    // .then(function(data) {
    //   let quran = data.data; // Get the results
    //   name = quran.ayahs[0].surah.name;
    //   // console.log(name);
    //   // return quran.surahs.map(function(surah){
    //   return quran.ayahs.map(function(q) {
    //     // Map through the results and for each run the code below
    //     // console.log(q.text)

    //     arr.push(q.text);
    //     //  console.log(arr)
    //   });

    //   // console.log(array[0].text)
    //   // })
    // })
    // .catch(function(error) {
    //   // This is where you run code if the server returns any errors
    //   // eslint-disable-next-line
    //   console.log(error);
    // });
    // this.items = arr;
    // this.surahName = name;
    // eslint-disable-next-line
    // console.log(this.items.ayahs);
  }
};
</script>

<style scoped>
ul {
  padding-left: 0px;
}
li {
  /* font-family: Scheherazade, Scheheraza; */
  font-size: 1.5em;
  padding: 5px;
  margin: 5px;
  list-style: none;
  direction: ltr;
  text-align: center;
  font-family: "AmiriQuranRegular", sans-serif;
  font-weight: normal;
  line-height: 2.5em;
  word-spacing: 2px;
  display: inline;
  /* word-wrap: break-word; */
}
li:hover {
  background-color: rgb(231, 223, 176) !important;
  /* color: #ffffff; */
}
.v-card__text {
  font-size: 25px;
  font-weight: bold;
  font-family: "LateefRegular", sans-serif;
}
.ayah-number{
  direction: rtl;
     display: inline-flex;
      font-size: .85em;
    white-space: nowrap;
    color: #050;
    cursor: pointer;
}
 span :last-of-type{
   padding-right: 50px;
}
</style>
flex