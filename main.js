import './bootstrap/index.js';

import Vue from 'vue'
import App from './App'

import "./plugins/init"

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

app.$mount()
