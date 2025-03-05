<template>
	<view class="map-wrapper">
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude"></map>
		<view class="padding-sm">{{address}}</view>
	</view>
</template>

<script>
	export default {
		name: "custom-map",
		props: {
			address: String,
			latitude: Number,
			longitude: Number,
			lng: Number,
		},
		data() {
			return {

			};
		}
	}
</script>

<style>
	.map-wrapper {
		background-color: white;
		overflow: hidden;
	}
</style>
