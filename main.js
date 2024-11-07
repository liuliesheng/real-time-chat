import './bootstrap';

import Vue from 'vue';
import App from './App';

import "./plugins/init";
import "./plugins/vue.ext";

// #ifdef H5
import "./plugins/h5.adapter";
// #endif

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});

app.$mount();
