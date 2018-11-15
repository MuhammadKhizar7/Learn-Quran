import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import router from './router'

Vue.config.productionTip = false

Vue.filter('arabicNumber', function (value) {
  let enDigit = value.toString();
  let newValue="";
    for (var i=0;i<enDigit.length;i++)
    {
        var ch=enDigit.charCodeAt(i);
        if (ch>=48 && ch<=57)
        {
            // european digit range
            var newChar=ch+1584;
            newValue=newValue+String.fromCharCode(newChar);
        }
        else
            newValue=newValue+String.fromCharCode(ch);
    }
    return newValue;
})

 new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

