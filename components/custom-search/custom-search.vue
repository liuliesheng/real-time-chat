<template>
	<view class="cu-bar search bg-white">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input type="text" :adjust-position="adjustPosition" :placeholder="placeholder"
				   :maxlength="maxLength" confirm-type="search"
				   v-model="search"
				   @search="toSearch" />
		</view>
		<view class="action">
			<button class="cu-btn round" @tap="toSearch">搜索</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-search",
		props: {
			adjustPosition: Boolean,
			placeholder: {
				type: String,
				default: '搜索...'
			},
			maxLength: {
				type: Number,
				default: 255
			},
			value: String,
		},
		data() {
			return {
				search: ''
			};
		},
		methods: {
			// 去搜索
			toSearch() {
				const detail = {
					value: this.search
				};
				this.$emit('input', this.search);
				this.$emit('search', detail);
			},
		},
		watch: {
			value(newVal) {
				this.search = newVal;
			}
		}
	}
</script>

<style scoped>
	.cu-btn {
		font-size: 12px;
	}
</style>
