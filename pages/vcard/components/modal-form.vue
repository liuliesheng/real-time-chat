<template>
	<view class="cu-modal bottom-modal text-left" :class="{show:isShow}" @tap="close">
		<view class="cu-dialog" @tap.stop="">
			<view class="cu-form-group" v-for="(item,index) in items" :key="index">
				<view class="title">{{item.label}}</view>
				<input :type="item.type||'text'"
					   :name="item.name"
					   :placeholder="item.placeholder"
					   :maxlength="item.maxlength"
					   :value="form[item.name]"
					   @input="form[item.name] = $event.detail.value"
					   v-if="isInputType(item.type)" />

				<view class="" @tap="onUpload" v-if="item.type==='image'">
					上传
				</view>
			</view>

			<view class="padding">
				<button form-type="submit" class="cu-btn block bg-gradual-green lg"
						@tap="submit">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			items: {
				type: Array,
				default: () => ([])
			},
			data: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			// const form = JSON.parse(JSON.stringify(this.data));
			const form = {};
			this.items.forEach((item) => {
				if (item.name) {
					form[item.name] = item.value || "";
				}
			});
			return {
				form: form,
				isShow: false,
			};
		},
		mounted() {
			setTimeout(() => {
				this.isShow = true;
			}, 0);
		},
		methods: {
			close() {
				this.isShow = false;
				setTimeout(() => {
					this.$emit('close');
				}, 200);
			},
			submit() {
				this.$emit('submit', this.form);
			},

			// 是否是输入框类型
			isInputType(type) {
				return [
					'text', 'number'
				].indexOf(type) !== -1;
			},

			// 上传图片
			onUpload() {
				uni.chooseImage({
					success: (res) => {
						const path = res.tempFilePaths[0];
						if (!path) {
							return;
						}

						uni.$upload({
							files: [path],
						});
						console.log(res)
					}
				})
			},
		}
	}
</script>

<style>
</style>
