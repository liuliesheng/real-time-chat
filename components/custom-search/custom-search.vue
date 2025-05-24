<template>
	<view class="search-wrapper" :style="wrapperStyle">
		<view class="cu-bar search" :class="searchClass" :style="innerStyle">
			<view class="action" @tap="BackPage" v-if="isBackButton">
				<text class="cuIcon-back"></text>
			</view>
			<view class="search-form round" @tap="onSearchTap">
				<text class="cuIcon-search"></text>
				<input type="text" :adjust-position="adjustPosition" :placeholder="placeholder"
					   :maxlength="maxLength" confirm-type="search"
					   v-model="search" :disabled="disabled"
					   @search="toSearch" />
				<text class="cuIcon-close clear" v-show="search" @tap="onClearTap"></text>
			</view>
			<view class="action" v-if="showRightActions">
				<button class="cu-btn round" @tap="toSearch" v-if="showSearchBtn">搜索</button>
				<slot name="right"></slot>
			</view>
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
			height: {
				type: Number | Boolean,
				default: true
			},
			placeholder: {
				type: String,
				default: '搜索...'
			},
			maxLength: {
				type: Number,
				default: 255
			},
			showRightActions: {
				type: Boolean,
				default: true,
			},
			showSearchBtn: {
				type: Boolean,
				default: true
			},
			searchClass: {
				type: String | Object,
				default: ''
			}
		},
		computed: {
			wrapperStyle() {
				return {
					height: typeof this.height === 'boolean' ?
						(this.height ? this.CustomBar + 'px' : 0) : this.height + 'px'
				};
			},

			innerStyle() {
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
		methods: {
			// 去搜索
			toSearch() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif

				this.emitInput();
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
			},
			// 清理
			onClearTap() {
				this.search = '';
			},
			// 触发事件
			emitInput() {
				const detail = {
					value: this.search
				};
				this.$emit('input', this.search);
				this.$emit('search', detail);
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
	.search-wrapper {
		position: relative;
		z-index: 1024;
	}

	.search {
		transition: all 0.2s;
		max-width: 1120upx;
		min-height: auto;
	}

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

	.clear {
		display: inline-block;
		background-color: rgba(0, 0, 0, 0.1);
		border-radius: 20px;
		height: 20px;
		width: 20px;
		text-align: center;
		line-height: 20px;
	}

	@media screen and (min-width: 1120upx) {
		.search {
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
