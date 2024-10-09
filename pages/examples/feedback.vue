<template>
	<view class="feedback">
		<view class="form-group">
			<view class="form-item">
				<textarea @input="onRemarkInput" maxlength="500" placeholder="感谢提出建议"></textarea>
				<view class="form-item-counter">
					<text>{{remark_length}}</text>
					<text>/500</text>
				</view>
			</view>
		</view>

		<view class="form-group">

			<view class="form-item">
				<label for='wechat'>微信号</label>
				<input @input="onWechatInput" id='wechat' placeholder="请输微信号(可选)" type="text"/>
			</view>

			<view class="form-item">
				<label for='email'>邮箱</label>
				<input @input="onEmailInput" id='email' maxlength="48" placeholder="请输入邮箱地址(可选)" type="text" v-model="email"/>
			</view>

		</view>

		<view class="form-btn-group">
			<button @tap="onSubmit">提交</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			remark: "",
			remark_length: 0,
			wechat: "",
			email: "",
		};
	},
	onLoad() {
	},
	methods: {
		onWechatInput: function(e) {
			this.wechat = e.detail.value;
		},
		onEmailInput: function(e) {
			this.email = e.detail.value;
		},
		onRemarkInput: function(e) {
			this.remark = e.detail.value;
			this.remark_length = e.detail.value.length;
		},
		onSubmit: function() {
			if (!this.remark) {
				return uni.showModal({
					content: "请输入您宝贵的意见",
					showCancel: false
				});
			}
			const data = {
				wechat: this.wechat,
				remark: this.remark,
				system_info: uni.getSystemInfoSync(),
				email: this.email,
			};
			console.log(data);

			uni.showLoading();
			setTimeout(() => {
				uni.$showTips('已提交');
				uni.$delayNavigateBack(1200);
				// wx.showTips('提交失败，请稍后重试~');
			}, 1000);
		}
	}
};
</script>

<style>
	.feedback {
	}
</style>
