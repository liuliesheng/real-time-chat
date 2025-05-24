<template>
	<view class="flex nowrap align-center">
		<slot name="icon">
			<view class="block cuIcon-notificationfill text-orange margin-right-sm" @tap="iconTap"></view>
		</slot>
		<view class="flex-sub">
			<swiper :style="styles"
					:vertical="vertical" @change="change" autoplay="true" :circular="true"
					:interval="interval" :current="current" class="speaker-in">
				<swiper-item v-for="(item, index) in items" :key="index">
					<navigator :style="styles" :url="item.url" :open-type="item.opentype">
						<text :style="styles" class="block ellipsis">{{item.title}}</text>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>
<script>
	export default {
		name: "custom-notice",
		props: {
			items: { type: Array, default: function() { return []; } },
			current: { type: Number, default: 0 },
			vertical: { type: Boolean, default: false },
			interval: { type: Number, default: 5000 },
			styles: { type: String, default: 'overflow:hidden; height:76rpx; line-height:76rpx; font-size:28rpx;' }
		},
		data() {
			return {}
		},
		methods: {
			change: function(index) {
				this.$emit('change', index.detail.current);
			},
			iconTap: function(e) {
				this.$emit('icontap', e);
			}
		}
	}
</script>
<style scoped>
</style>
