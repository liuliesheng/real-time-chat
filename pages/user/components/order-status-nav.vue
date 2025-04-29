<template>
	<view class="order-status margin radius">
		<view class="flex padding-lr padding-top" @tap="linkTo" data-url="/pages/user/order/list" data-logged>
			<text class="flex-sub text-bold">我的订单</text>
			<view class="text-sm text-gray">
				<text>全部订单</text>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="cu-list grid col-5 no-border">
			<view class="cu-item" @tap="linkTo" data-url="/pages/user/order/list?state=1" data-logged>
				<view class="cuIcon-pay text-red lg"></view>
				<text class="text-sm">待付款</text>
			</view>
			<view class="cu-item" @tap="linkTo" data-url="/pages/user/order/list?state=2" data-logged>
				<view class="cuIcon-deliver text-red lg"></view>
				<text class="text-sm">待发货</text>
			</view>
			<view class="cu-item" @tap="linkTo" data-url="/pages/user/order/list?state=3" data-logged>
				<view class="cuIcon-send text-red"></view>
				<text class="text-sm">待收货</text>
			</view>
			<view class="cu-item" @tap="linkTo" data-url="/pages/user/order/list?state=4" data-logged>
				<view class="cuIcon-evaluate text-red"></view>
				<text class="text-sm">待评价</text>
			</view>
			<view class="cu-item" @tap="linkTo" data-url="/pages/user/refund/list" data-logged>
				<view class="cuIcon-refund text-red"></view>
				<text class="text-sm">退款/售后</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
