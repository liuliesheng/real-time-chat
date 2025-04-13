<template>
	<view class="cu-bar search bg-white">
		<view class="search-form round">
			<text class="cuIcon-search"></text>
			<input type="text" :adjust-position="adjustPosition" :placeholder="placeholder"
				   :maxlength="maxLength" confirm-type="search"
				   v-model="search" :disabled="disabled"
				   @search="toSearch" />
		</view>
		<view class="action">
			<button class="cu-btn round" @tap="toSearch" v-if="showSearchBtn">搜索</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "custom-search",
		props: {
			value: String,
			adjustPosition: Boolean,
			disabled: Boolean,
			placeholder: {
				type: String,
				default: '搜索...'
			},
			maxLength: {
				type: Number,
				default: 255
			},
			showSearchBtn: {
				type: Boolean,
				default: true
			}
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
			// 被点击
			onTap(){
				this.$emit('tap1');
			}
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
