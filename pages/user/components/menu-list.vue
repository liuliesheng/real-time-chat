<template>
	<view class="cu-list menu sm-border card-menu radius-lg margin-top">
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/team/index" data-logged>
				<text class="cuIcon-group_fill text-grey"></text>
				<text>分销团队</text>
			</view>
		</view>
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/vip/apply" data-logged>
				<text class="cuIcon-crownfill text-grey"></text>
				<text>申请会员</text>
			</view>
		</view>
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/wallet/index" data-logged>
				<text class="cuIcon-circlefill text-grey"></text>
				<text>我的钱包</text>
			</view>
		</view>
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/coupon" data-logged>
				<text class="cuIcon-cardboardfill text-grey"></text>
				<text>优惠券</text>
			</view>
		</view>
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/address/list" data-logged>
				<text class="cuIcon-locationfill text-grey"></text>
				<text>收货地址</text>
			</view>
		</view>
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/user/favorite" data-logged>
				<text class="cuIcon-favorfill text-grey"></text>
				<text>我的收藏</text>
			</view>
		</view>
		<!-- #ifndef MP -->
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/auth/rest.password" data-logged>
				<text class="cuIcon-circlefill text-grey"></text>
				<text>修改密码</text>
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP -->
		<view class="cu-item arrow">
			<button open-type="feedback" class="content text-left">
				<text class="cuIcon-commentfill text-grey"></text>
				<text>意见反馈</text>
			</button>
		</view>
		<!-- #endif -->
		<!-- #ifndef MP -->
		<view class="cu-item arrow">
			<view class="content" @tap="linkTo" data-url="/pages/index/feedback">
				<text class="cuIcon-circlefill text-grey"></text>
				<text>意见反馈</text>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
</script>

<style>
</style>
