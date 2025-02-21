<template>
	<view class="page">
		<XLoading />
		<Hint />

		<view class="bg-white">
			<view class="solid-bottom">
				<view class="flex align-center padding-sm">
					<view class="flex-sub">
						<view class="cu-avatar xl round" :style="'background-image:url('+info.avatar+');'"></view>
					</view>

					<view class="flex-treble padding-left padding-right">
						<view class="text-bold text-lg">{{info.nickname}}</view>
						<view class="text-gray text-df margin-top-xs">
							{{info.is_identity?'已认证':'未认证'}}
						</view>
					</view>
					<view @tap="syncWechat">
						<text class="cuIcon-refresh" :class="syncLoading?'turn':''"></text>
						<text class="margin-left-xs">同步微信</text>
					</view>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title required">性别</view>
				<picker @change="pickerChange($event,'genderIndex')" :value="genderIndex"
				        :range="genders" range-key="text">
					<view class="picker">
						{{ genderIndex > -1 ? genders[genderIndex].text : '请选择性别' }}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title required">生日</view>
				<picker mode="date" @change="info.birthday = $event.detail.value"
				        :value="info.birthday">
					<view class="picker">
						{{ info.birthday ? info.birthday : '请选择您的生日' }}
					</view>
				</picker>
			</view>

			<view class="cu-form-group">
				<view class="title required">城市</view>
				<picker mode="region">
					<view class="picker">
						{{ info.province && info.city ? info.province+info.city : '请选择你生活的城市' }}
					</view>
				</picker>
			</view>
			<!-- <view class="cu-form-group">
				<view class="title required">学习/从事行业/领域</view>
				<picker>
					<view class="picker">
						{{ index > -1 ? genders[index] : '请选择你从事行业' }}
					</view>
				</picker>
			</view> -->
			<view class="cu-form-group">
				<view class="title">实名认证</view>
				<view @tap="linkTo" data-url="/pages/auth/certification">
					<text class="margin-right-xs">立即认证</text>
					<text class="cuIcon-question text-cyan"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},

				index: 0,
				genders: [{
					text: '男',
					value: 1
				}, {
					text: '女',
					value: 2
				}],
				genderIndex: -1,

				syncLoading: false
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			//加载用户信息
			loadData() {
				return uni.$model.user.get().then((res) => {
					this.info = res;
				});
			},

			// 同步微信信息
			syncWechat() {
				this.syncLoading = true;
				return uni.$model.user.syncWechat({
					hint: this
				}).finally(() => {
					this.syncLoading = false;
				});
			},

			pickerChange(e, name) {
				this[name] = e.detail.value;
			},
		}
	}
</script>

<style>
	.turn {
		display: inline-block;
		animation: turn 1s linear infinite;
	}

	@keyframes turn {
		0% {
			-webkit-transform: rotate(0deg);
		}

		25% {
			-webkit-transform: rotate(90deg);
		}

		50% {
			-webkit-transform: rotate(180deg);
		}

		75% {
			-webkit-transform: rotate(270deg);
		}

		100% {
			-webkit-transform: rotate(360deg);
		}
	}
</style>
