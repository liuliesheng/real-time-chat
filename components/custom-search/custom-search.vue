<template>
	<view class="search" :style="[{height:CustomBar + 'px'}]">
		<view class="cu-bar search bg-white" :style="style">
			<view class="action" @tap="BackPage" v-if="isBackButton">
				<text class="cuIcon-back"></text>
			</view>
			<view class="search-form round" @tap="onSearchTap">
				<text class="cuIcon-search"></text>
				<input type="text" :adjust-position="adjustPosition" :placeholder="placeholder"
					   :maxlength="maxLength" confirm-type="search"
					   v-model="search" :disabled="disabled"
					   @search="toSearch" />
			</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="action" v-if="showSearchBtn">
				<button class="cu-btn round" @tap="toSearch">搜索</button>
			</view>
			<!-- #endif -->
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
				search: '',
				CustomBar: this.CustomBar,
				isBackButton: false
			};
		},
		created() {
			this.isBackButton = !uni.$isShowHomeButton();
		},
		computed: {
			style() {
				const StatusBar = this.StatusBar;
				const CustomBar = this.CustomBar;

				let style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;

				// #ifdef MP
				const MenuButtonRect = this.MenuButtonRect;
				style += `padding-right:${MenuButtonRect.width}px;`;
				// #endif

				return style;
			}
		},
		methods: {
			// 去搜索
			toSearch() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif

				const detail = {
					value: this.search
				};
				this.$emit('input', this.search);
				this.$emit('search', detail);
			},

			// 被点击
			onSearchTap(e) {
				this.$emit('searchtap', e);
			},

			// 返回上一页
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
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

	.cu-bar {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0;
		z-index: 1024;
	}
</style>
