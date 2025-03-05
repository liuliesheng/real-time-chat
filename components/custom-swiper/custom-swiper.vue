<template>
	<swiper class="screen-swiper round-dot" style="min-height: 256upx;"
			:indicator-dots="indicatorDots" :circular="circular"
			:autoplay="autoplay" :interval="interval" :duration="duration">
		<swiper-item v-for="(item,index) in list" :key="index">
			<video :src="item.cover" autoplay loop muted :show-play-btn="false" :controls="false"
				   objectFit="cover" v-if="item.type=='video'"></video>
			<image :src="item.cover" mode="aspectFill" v-else></image>
		</swiper-item>
	</swiper>
</template>

<script>
	export default {
		name: "custom-swiper",
		props: {
			list: {
				type: Array,
				default: () => []
			},
			radius: {
				type: Boolean,
				default: false
			},
			indicatorDots: {
				type: Boolean,
				default: true
			},
			circular: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 5000
			},
			duration: {
				type: Number,
				default: 500
			},
		},
		data() {
			return {};
		}
	}
</script>

<style>

</style>
