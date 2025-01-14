export default [{
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
},].map(it => Object.assign(it, {
	page: 1,
	more: true,
	data: [],
	loaded: false,
	loading: false,
}));
