<template>
	<view class="padding text-center bg-white">
		<!-- <video src="https://video-qn.ibaotu.com/19/68/82/32r888piCzMR.mp4_10s.mp4"></video> -->
		<view class="cu-avatar xl round" :style="'background-image:url('+info.avatar+');'"></view>
		<view class="text-bold">{{info.name}}</view>
		<view class="">{{info.description}}</view>
		<view class="text-sm text-gray">{{info.address}}</view>

		<view class="flex text-center margin-top">
			<view class="flex-sub">
				<view class="text-xxl"><text class="cuIcon-attentionfill"></text></view>
				<view class="">{{info.view_count}}</view>
			</view>
			<view class="flex-sub" @tap="toggleFavorite">
				<view class="text-xxl"><text :class="info.is_favorite?'cuIcon-favorfill':'cuIcon-favor'"></text></view>
				<view class="">{{info.collect_count}}</view>
			</view>
			<view class="flex-sub" @tap="onLike">
				<view class="text-xxl"><text :class="info.is_like?'cuIcon-appreciatefill':'cuIcon-appreciate'"></text>
				</view>
				<view class="">{{info.like_count}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import model from '../model.js';
	export default {
		props: {
			info: {
				type: Object,
				default: () => ({})
			}
		},
		methods: {
			// 去收藏
			toggleFavorite() {
				const options = {
					hint: this.$root,
					loading: this.$root
				};

				if (this.info.is_favorite) {
					model.unfavoriteVCard(this.info.id, options).then(() => {
						this.info.is_favorite = false;
						if (this.info.collect_count > 0) {
							this.info.collect_count--;
						}
					});
				} else {
					model.favoriteVCard(this.info.id, options).then(() => {
						this.info.is_favorite = true;
						this.info.collect_count++;
					});
				}
			},

			// 去点赞
			onLike() {
				if (this.info.is_like) {
					return;
				}
				
				model.like(this.info.id, {
					hint: this.$root,
					loading: this.$root
				}).then(() => {
					this.info.is_like = true;
					this.info.like_count++;
				});
			},
		}
	}
</script>

<style>
</style>
