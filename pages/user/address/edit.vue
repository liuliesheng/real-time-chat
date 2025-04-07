<template>
	<custom-page class="page" :loaded="loaded">

		<!-- #ifdef MP-WEIXIN -->
		<view class="text-blue margin-lr margin-top" @tap="importWechatAddress">
			导入微信地址
		</view>
		<!-- #endif -->

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
			<view class="flex-sub">
				<picker mode="region" @change="onRegionChange">{{info.province}}{{info.city}}{{info.district}}</picker>
			</view>
			<!-- <text class='cuIcon-locationfill text-orange' @click="chooseLocation"></text> -->
		</view>
		<view class="cu-form-group align-start">
			<view class="title">详细地址</view>
			<textarea maxlength="255" v-model="info.address" placeholder="请输入详细地址"></textarea>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">设为默认</view>
			<switch value="1" :checked="!!info.is_default"
					@change="setField('is_default', $event.detail.value)"></switch>
		</view>

		<view class="padding">
			<button class="cu-btn block bg-gradual-red lg" @click="confirm">提交</button>
		</view>

	</custom-page>
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
					is_default: 0,
				},
				loaded: false,
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
				return uni.$models.address.getDetail(this.id, {
					hint: this
				}).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 切换默认地址
			switchDefault(e) {
				this.info.is_default = e.detail ? 1 : 0;
			},
			
			// 设置值
			setField(name, value) {
				this.info[name] = value;
			},

			// 选择地区
			onRegionChange(e) {
				const values = e.detail.value;
				this.info.province = values[0];
				this.info.city = values[1];
				this.info.district = values[2];
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

			// 导入微信地址库
			importWechatAddress() {
				uni.chooseAddress({
					success: (res) => {
						this.info.name = res.userName;
						this.info.phone = res.telNumber;
						this.info.province = res.provinceName;
						this.info.city = res.cityName;
						this.info.district = res.countyName;
						this.info.address = res.detailInfo;
					}
				});
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
					promise = uni.$models.address.update(this.id, data, {
						loading: this,
						hint: this
					});
				} else {
					promise = uni.$models.address.create(data, {
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
					uni.$back();
				});
			},
		}
	}
</script>

<style scoped>

</style>
