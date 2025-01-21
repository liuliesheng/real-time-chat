<template>
	<view class="page">
		<XLoading />
		<Hint />

		<view class="cu-form-group margin-top">
			<view class="title required">联系人</view>
			<input type="text" v-model="info.name" placeholder="请输入收货人姓名" />
		</view>
		<view class="cu-form-group">
			<view class="title required">手机号</view>
			<input type="number" v-model="info.phone" placeholder="请输入收货人手机号码" />
		</view>
		<view class="cu-form-group">
			<view class="title">收货地址</view>
			<view class="flex-sub">{{info.province}}{{info.city}}{{info.district}}</view>
			<text class='cuIcon-locationfill text-orange' @click="chooseLocation"></text>
		</view>
		<view class="cu-form-group align-start">
			<view class="title">详细地址</view>
			<textarea maxlength="255" v-model="info.address" placeholder="请输入多行文本输入框"></textarea>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">设为默认</view>
			<switch @change="switchDefault"
			        :class="info.is_default?'checked':''"
			        :checked="info.is_default?true:false"></switch>
		</view>

		<view class="padding">
			<button class="cu-btn block bg-gradual-red lg" @click="confirm">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0,
				info: {
					name: '',
					phone: '',
					province: "河南省",
					city: "郑州市",
					district: "金水区",
					address: "",
					latitude: 0,
					longitude: 0,
					area: '',
					is_default: 0,
				},
			};
		},
		onLoad(options) {
			this.id = parseInt(options.id);

			let title = '新增收货地址';
			if (!isNaN(this.id)) {
				title = '编辑收货地址';
				this.loadData();
			}

			uni.setNavigationBarTitle({
				title
			});
		},
		methods: {
			// 加载数据
			loadData() {
				return uni.$model.address.getDetail(this.id, {
					loading: this,
					hint: this
				}).then(res => {
					this.info = res;
				});
			},

			// 切换默认地址
			switchDefault(e) {
				this.info.is_default = e.detail ? 1 : 0;
			},

			//地图选择地址
			chooseLocation() {
				uni.chooseLocation({
					success: (data) => {
						console.log(data)
						this.info.addressName = data.name;
						this.info.address = data.name;
					}
				})
			},

			//提交
			confirm() {
				let data = this.info;
				console.log(data)
				if (!data.name) {
					uni.$hintError('请填写收货人姓名');
					return;
				}
				if (!/(^1[0-9]{10}$)/.test(data.phone)) {
					uni.$hintError('请输入正确的手机号码');
					return;
				}
				if (!data.address) {
					uni.$hintError('请填写详细地址');
					return;
				}

				let promise = null;
				if (this.id) {
					promise = uni.$model.address.update(this.id, data, {
						loading: this,
						hint: this
					});
				} else {
					promise = uni.$model.address.create(data, {
						loading: this,
						hint: this
					});
				}
				promise.then(() => {
					uni.$prePage(function(prePage) {
						if (prePage.refreshList) {
							prePage.refreshList(data);
						}
					});

					this.hintSuccess(`收货地址${this.id ? '修改': '添加'}成功`);

					setTimeout(function() {
						uni.navigateBack({});
					}, 500);
				});
			},
		}
	}
</script>

<style scoped>

</style>
