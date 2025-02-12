<template>
	<view class="cu-list menu-avatar comment">
		<view class="cu-item" v-for="(item,index) in list" :key="item.id">
			<view class="cu-avatar round" :style="'background-image:url('+item.user_avatar+');'"></view>
			<view class="content">
				<view class="text-grey">
					<text v-if="item.is_anonymous">匿名用户</text>
					<text v-else>{{item.user_nickname||"匿名用户"}}</text>
				</view>
				<view class="text-gray text-content text-df">{{item.content}}</view>

				<view class="grid col-3 grid-square margin-top-sm" v-if="item.images.length" @tap="onPreview" :data-item-index="index">
					<view class="bg-img" v-for="(image,imageIndex) in item.images" :key="imageIndex"
					      :style="[{ backgroundImage:'url(' + image + ')' }]" :data-image-index="imageIndex"></view>
				</view>

				<!-- <view class="bg-grey padding-sm radius margin-top-sm  text-sm">
					<view class="flex">
						<view>凯尔：</view>
						<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
					</view>
				</view> -->
				<view class="flex justify-between">
					<view class="text-gray text-df">{{item.create_time}}</view>
					<!-- <view>
						<text class="cuIcon-appreciatefill text-red"></text>
						<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {};
		},
		methods: {
			onPreview(e) {
				const itemIndex = e.currentTarget.dataset.itemIndex,
					imageIndex = e.target.dataset.imageIndex;
				console.log(e)
				if (itemIndex == undefined && imageIndex === undefined) {
					return;
				}

				const items = this.list[itemIndex].images;
				uni.previewImage({
					urls: items,
					current: imageIndex
				})
			}
		}
	}
</script>

<style>
</style>
