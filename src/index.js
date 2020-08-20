import './css/style.css';
import './css/blue.scss';
const hello = require('./hello');
document.querySelector("#root").appendChild(hello());
// import Vue from 'vue';
// import App from './App.vue';

// new Vue({
//     el: '#root',
//     render: h => h(App)
// })