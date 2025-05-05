<template>
	<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft"
				 :id="'tab-'+(random+'')">
		<view class="cu-item" v-for="(item, index) in itemsIn" :key="index"
			  @tap="change" :data-index="index" :class="currentIndexIn == index?'text-green cur':''">
			{{item.name}}
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "custom-tab",
		props: {
			items: { type: Array, default: function() { return [] } },
			isCenter: { type: Boolean, default: false },
			currentIndex: { type: Number, default: 0 },
		},
		data() {
			return {
				currentIndexIn: 0,
				itemsIn: [],
				random: 1,
				scrollLeft: 0,
				scrllTimer: null
			};
		},
		created: function() {
			this.currentIndexIn = this.currentIndex;
			this.itemsIn = this.items;
			this.random = this.randomNum();
		},
		watch: {
			currentIndex: function(value) {
				this.currentIndexIn = value;
			},
			currentIndexIn: function(val) {
				if (this.isCenter) { return; }
				if (this.scrllTimer != null) { clearTimeout(this.scrllTimer); }
				this.scrllTimer = setTimeout(() => { this.setLeft(); }, 200);
			},
			items: function(value) { this.itemsIn = value; }
		},
		methods: {
			randomNum: function() {
				return parseInt(Math.random() * 1000);
			},
			change: function(e) {
				this.currentIndexIn = e.currentTarget.dataset.index;
				this.$emit('change', Number(e.currentTarget.dataset.index))
			},
			setLeft: function() {
				if (this.isCenter) { return; }
				var itemWidth = Number(this.margin) + Number(this.size);
				var left = (Number(this.currentIndexIn) + 1) * itemWidth - Number(this.width) / 2 - itemWidth / 2;
				var maxLeft = Number(this.itemsIn.length) * itemWidth - this.width;
				maxLeft = uni.upx2px(maxLeft - 30);
				left = uni.upx2px(left);
				if (left > maxLeft) { left = maxLeft; }
				if (left < 0) { left = 0; }
				this.scrollLeft = left;
			}
		}
	}
</script>

<style>

</style>
