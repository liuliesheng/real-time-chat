<template>
	<view class="cu-modal bottom-modal text-left show" @tap="close">
		<view class="cu-dialog" @tap.stop="">
			<!-- 			<view class="cu-bar bg-white">
				<view class="action text-green">确定</view>
				<view class="action text-blue" @tap="hideModal">取消</view>
			</view> -->
			<view class="cu-form-group" v-for="(item,index) in items" :key="index">
				<view class="title">{{item.label}}</view>
				<input :type="item.type||'text'"
					   :name="item.name"
					   :placeholder="item.placeholder"
					   :maxlength="item.maxlength"
					   :value="form[item.name]"
					   @input="form[item.name] = $event.detail.value" />
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
				form: form
			};
		},
		methods: {
			close() {
				this.$emit('close');
			},
			submit() {
				this.$emit('submit', this.form);
			}
		}
	}
</script>

<style>
</style>
