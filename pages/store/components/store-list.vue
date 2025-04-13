<template>
	<view class="cu-list menu-avatar" v-if="list.length">
		<view class="cu-item"
			  v-for="(item, index) in list"
			  :key="index"
			  @tap="linkTo" :data-url="'/pages/store/detail?id='+item.id">

			<view class="cu-avatar round lg"
				  :style="'background-image:url('+item.logo+');'">
			</view>
			<view class="content">
				<view class="text-grey">
					<text class="margin-right-xs">{{item.title}}</text>
				</view>
				<view class="text-gray text-sm">
					<view class="text-cut">
						{{item.address}}
					</view>
				</view>
				<view class="text-gray text-sm">
					营业时间：{{item.start_time}} ~ {{item.end_time}}
				</view>
			</view>
			<view class="action" style="width: auto;">
				<view class="text-gray text-sm">
					<text class="cuIcon-locationfill"></text>
					<text>{{item.distance}}km</text>
				</view>
			</view>
		</view>
	</view>
	<custom-empty @refresh="$emit('refresh')" v-else />
</template>

<script>
	export default {
		props: {
			list: Array
		},
		methods: {}
	}
</script>

<style>
</style>
