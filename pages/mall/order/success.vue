<template>
	<custom-page class="page" :loaded="true">
		<view class="status-desc" v-if="status!==-1">
			<view class="icon">
				<text class="text-blue cuIcon-timefill" v-if="status===0"></text>
				<text class="text-green cuIcon-roundcheckfill" v-else-if="status===1"></text>
				<text class="text-red cuIcon-roundclosefill" v-else></text>
			</view>
			<view v-if="status===0" class="text-blue text-lg">处理中...</view>
			<view v-else-if="status===1" class="text-green text-lg">下单成功</view>
			<view v-else class="text-red text-lg">下单失败</view>
		</view>
		<view class="margin">
			<template v-if="status===1">
				<button class="cu-btn block lg bg-red round" @tap="linkTo"
						data-url="/pages/user/order/list">查看订单</button>
				<button class="cu-btn block lg margin-top round" @tap="toHome">继续转转</button>
			</template>
			<template v-else>
				<button class="cu-btn block lg bg-red margin-top round" @tap="toHome">返回首页</button>
			</template>
		</view>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				status: 1
			}
		},
		onLoad(options) {
			this.status = parseInt(options.status) || 1;
		},
		methods: {
			toHome() {
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
		}
	}
</script>

<style>
	.page {
		background-color: white;
	}

	.status-desc {
		margin-top: 15%;
		padding: 30rpx;
		text-align: center;
	}

	.status-desc .icon {
		font-size: 128rpx;
	}
</style>
