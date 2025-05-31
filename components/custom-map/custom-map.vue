<template>
	<view class="map-wrapper">
		<map style="width: 100%; height: 396rpx;" :latitude="latitude" :longitude="longitude"
			 :markers="markers"
			 show-compass="true" enable-3D="true" enable-poi="true"></map>
		<view class="padding-sm padding-tb flex" @tap="openHandle">
			<text class="cuIcon-locationfill"></text>
			<text class="text-gray text-sm text-cut flex-sub">{{address}}</text>
			<text class="cuIcon-right"></text>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-map",
		props: {
			address: String,
			latitude: Number,
			longitude: Number,
		},
		computed: {
			markers() {
				return [{
					latitude: this.latitude,
					longitude: this.longitude,
					title: this.address,
				}];
			}
		},
		methods: {
			openHandle() {
				uni.openLocation({
					address: this.address,
					latitude: this.latitude,
					longitude: this.longitude,
					fail: console.error
				})
			}
		}
	}
</script>

<style scoped>
	.map-wrapper {
		background-color: white;
		overflow: hidden;
	}
</style>
