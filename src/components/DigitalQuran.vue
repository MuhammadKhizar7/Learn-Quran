<template>
      <v-container grid-list-md text-xs-center>
          <v-layout row wrap>     
            <v-flex md9 xs12>
              <v-card dark color="teal">
                <v-card-text class="px-0"></v-card-text>
                <ul>
                  <li v-for="(item,index) in items" :key="index">{{item}}</li>
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
export default {
  data() {
     return{
          items: [
    //   "﻿بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    //   "ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ",
    //   "ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    //   "مَٰلِكِ يَوْمِ ٱلدِّينِ",
    //   "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    //   "ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ",
    //   "صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ"
    ],
    data: {
    a: 1
  }
     }
  },
    created: function(){
         console.log('a is: ' + this.a)
         const url = "http://api.alquran.cloud/page/2/quran-uthmani"; // Get 10 random users

      fetch(url) // Call the fetch function passing the url of the API as a parameter
        .then(resp => resp.json())
        .then(function(data) {
          let quran = data.data; // Get the results
          console.log(quran.ayahs);
          // return quran.surahs.map(function(surah){
          //     console.log(surah)
          // CreateSurahTitle(quran)
           quran.ayahs.map(function(q) { // Map through the results and for each run the code below
        //   var array = [...quran.ayahs];
        //   console.log(q.text)
        
            this.items.push(q.text)
            console.log(items)
        
          // let li = createNode('li'), //  Create the elements we need
          //     span = createNode('span');
          // span.innerHTML = `${q.text} `; // Make the HTML of our span to be the first and last name of our ayat
          // append(li, span);
          // append(ul, li);
          })
        
        // console.log(array[0].text)
          // })
        })
        .catch(function(error) {
          // This is where you run code if the server returns any errors
          console.log(error);
        });
    }
    
}
    
</script>

<style scoped>
li,
h1 {
  text-align: right;
  font-family: Scheherazade, Scheheraza;
  direction: rtl;
  font-size: 28px;
  padding: 10px;
  list-style: none;
  text-align: justify;
  text-justify: inter-word;
  /* background-color: #EEF8E5; border: 1px solid #D4DDCC; border-top: 0px; */
}
li:hover {
  background-color: #f7fce3;
  color: black;
}
</style>
