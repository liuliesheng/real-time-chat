export default {
	data() {
		return {
			tabCur: 0,
			navList: [{
				state: 0,
				text: '全部',
			}, {
				state: 1,
				text: '待付款',
			}, {
				state: 2,
				text: '待发货',
			}, {
				state: 3,
				text: '待收货',
			}, {
				state: 4,
				text: '待评价',
			}, ].map(it => Object.assign(it, {
				page: 1,
				more: true,
				data: [],
				loaded: false,
				loading: false,
			}))
		}
	},
	computed: {
		choiceNav() {
			return this.navList[this.tabCur];
		}
	},
	methods: {
		//swiper 切换
		changeTab(e) {
			const index = this.tabCur = parseInt(e.target.current);
			const navItem = this.navList[index];
			this.useFrame(index);

			//tab切换只有第一次需要加载数据
			if (navItem.loaded === true) {
				return;
			}

			this.loadData();
		},

		//顶部tab点击
		tabClick(index) {
			this.tabCur = index;
		},
	}
};
