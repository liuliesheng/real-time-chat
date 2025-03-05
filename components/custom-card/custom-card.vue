<template>
	<view class="card">
		<view class="cu-bar bg-white solid-bottom" v-if="title">
			<view class="action">
				<text class="cuIcon-title text-green"></text>
				<text>{{title}}</text>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: "custom-card",
		props: {
			title: String
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.card {}
</style>
