<template>
	<custom-page class="page" :loaded="loaded">
		<custom-state-tips :state="form.status" :errorMsg="form.audit_msg"></custom-state-tips>

		<form @submit="onSubmit">
			<view class="margin-top padding-lr">
				<text class="idcard-text text-gray">身份证照片 ( 个人信息面 )</text>
			</view>
			<view class="idcard-items img-in flex justify-center">
				<view class="idcard-items-image" @tap="selectImg1">
					<image :src="idCard1" mode="widthFix"></image>
				</view>
			</view>
			<view class="margin-top padding-lr">
				<text class="idcard-text text-gray">身份证照片 ( 国徽图案面 )</text>
			</view>
			<view class="idcard-items flex justify-center">
				<view class="idcard-items-image" @tap="selectImg2">
					<image :src="idCard2" mode="widthFix"></image>
				</view>
			</view>

			<view class="cu-form-group margin-top">
				<view class="title required">真实姓名</view>
				<input v-model="form.realname" placeholder="请输入" />
			</view>
			<view class="cu-form-group">
				<view class="title required">身份证号</view>
				<input v-model="form.card_no" placeholder="请输入" />
			</view>

			<view class="text-gray text-sm margin">
				<text class="cuIcon-safe text-green margin-right-xs"></text>
				<text>我们会保障你的信息安全，信息仅用于实名认证</text>
			</view>

			<view class="padding">
				<button class="cu-btn block bg-blue lg" :disabled="isDisabled">提交</button>
			</view>
		</form>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				loaded: false,

				idCard1: 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/e53bf48607dcf795ab78e419dc5cf432.png',
				idCard2: 'https://img-cdn-tc.dcloud.net.cn/uploads/article/20210107/dac9c5c703b2a0bcd254a919d0da5632.png'
			}
		},
		computed: {
			isDisabled() {
				return !this.loaded || (this.form.status != 2 && this.form.status != -1);
			},
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			// 加载认证
			loadData() {
				uni.$models.user.getIdentityInfo().then((res) => {
					this.form = res || {
						realname: '',
						card_no: '',
						card_hand: '',
						card_front: '',
						card_back: '',
						status: -1,
						audit_time: '',
						audit_msg: '',
						create_time: '',
					};
					this.loaded = true;
				});
			},

			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.idCard1 = res.tempFilePaths[0];
					}
				})
			},
			selectImg2: function() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.idCard2 = res.tempFilePaths[0];
					}
				})
			},

			// 申请认证
			onSubmit() {
				const form = this.form;

				if (!(form.realname = form.realname.trim())) {
					return this.hintError('请填写真实姓名！');
				}

				if (!(form.card_no = form.card_no.trim())) {
					return this.hintError('请填写身份证号！');
				}

				uni.$models.user.applyIdentity(form, {
					hint: this,
					loading: this
				}).then(() => {
					this.form.status = 0;
					this.hintSuccess('已提交！');
					uni.$back();
				});
			},
		}
	}
</script>

<style>
	.page {
		background-color: white;
	}

	.idcard-main {
		margin: 25rpx;
	}

	.idcard-desc {
		background-color: #FFFFFF;
		color: #666666;
		line-height: 56rpx;
		font-size: 26rpx;
		padding: 20rpx;
		border-radius: 10rpx;
	}

	.idcard-text {
		line-height: 1.8em;
		margin-top: 30rpx;
		color: #666666;
	}

	.idcard-items {
		background-color: #FFFFFF;
		padding: 50rpx;
		/* border-radius: 10rpx; */
		margin-top: 15rpx;
	}

	.idcard-items-image {
		width: 80%;
	}
</style>
