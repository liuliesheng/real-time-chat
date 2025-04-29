<template>
	<view class="floating-btn-group">
		<template v-for="(item,index) in list">
			<button class="floating-btn-action cu-btn cuIcon"
					:class="item.isCareful?'animated infinite bounceIn':''"
					:open-type="item.type"
					@tap="itemTapHandle(item)"
					v-if="isShow(item.type)">
				<image :src="item.icon" mode="aspectFill" v-if="item.icon"></image>
				<text :class="cuIcon[item.type]" v-else-if="item.type"></text>
				<text class="text" v-else>{{item.text}}</text>
			</button>
		</template>
	</view>
</template>

<script>
	const ICON_MAP = {
		contact: 'cuIcon-service',
		phone: 'cuIcon-phone'
	};
	const WECHAT_TYPE_LIST = ['contact', 'feedback'];
	export default {
		name: "custom-floating-button",
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				cuIcon: ICON_MAP
			};
		},
		methods: {
			isShow(type) {
				if (WECHAT_TYPE_LIST.indexOf(type) !== -1 && !uni.$platform.isWechatWeapp) {
					return false;
				}

				return true;
			},
			itemTapHandle(item) {
				switch (item.type) {
					case "phone":
						uni.makePhoneCall({
							phoneNumber: item.phone
						});
						break;
					case "contact":
					case "feedback":
					case "share":
						break;
					case "miiprogram":
						uni.navigateToMiniProgram(item.miniprogram);
						break;
					default:
						this.navTo(item.path);
				}
			},
		}
	}
</script>

<style>
	.floating-btn-group {
		position: fixed;
		bottom: 120rpx;
		right: 30rpx;
		width: 90rpx;
	}

	.floating-btn-group .floating-btn-action {
		width: 90rpx;
		height: 90rpx;
		border-radius: 250px;
		padding: 0;
		font-size: 28px;
		overflow: hidden;
		background-color: rgba(0, 0, 0, 0.2);
		color: white;
	}

	.floating-btn-group .floating-btn-action:not(:last-child) {
		margin-bottom: 20rpx;
	}

	.floating-btn-action image {
		position: absolute;
		width: 90rpx;
		height: 90rpx;
		left: 0;
		top: 0;
	}

	.floating-btn-action text {
		font-size: 12px;
		line-height: 90rpx;
	}
</style>
