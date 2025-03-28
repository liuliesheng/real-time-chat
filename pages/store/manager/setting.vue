<template>
	<view class="page">
		<view class="cu-list menu">
			<view class="cu-item">
				<view class="content">
					语音播报
				</view>
				<view class="action">
					<switch value="1" :checked="!!info.auto_play" @change="setField('auto_play', $event.detail.value)"></switch>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					auto_play: false,
				}
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			// 加载配置
			loadData() {
				return uni.$models.store.getConfig().then((res) => {
					this.info = res;
				});
			},

			// 设置值
			setField(name, value) {
				this.info[name] = value;
				this.updateData();
			},

			// 更新配置
			updateData() {
				return uni.$models.store.setConfig(this.info);
			}
		}
	}
</script>

<style>

</style>
