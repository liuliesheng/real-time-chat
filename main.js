import Vue from 'vue';
import App from './App';

import './bootstrap';
import "./common/services";

// 组件区
import Loading from '@/components/loading';
import Hint from '@/components/hint';
import Empty from '@/components/empty.vue';
import LoadMore from '@/components/load-more.vue';
import PageLoad from '@/components/page-load.vue';
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue";
import MescrollUNI from "@/components/mescroll-uni/mescroll-uni.vue";
import cuCustom from '@/common/colorui/components/cu-custom.vue';


Vue.component('Hint', Hint);
Vue.component('XLoading', Loading);
Vue.component('Empty', Empty);
Vue.component('LoadMore', LoadMore);
Vue.component('PageLoad', PageLoad);
Vue.component('mescroll-body', MescrollBody);
Vue.component('mescroll-uni', MescrollUNI);
Vue.component('cu-custom',cuCustom);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});

app.$mount();
