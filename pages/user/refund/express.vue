<template>
	<view class="page" v-if="isLoaded">
		<XLoading />
		<Hint />

		<form>
			<view class="cu-form-group margin-top">
				<view class="title">物流公司</view>
				<input type="text" placeholder="请输入物流公司" v-model="form.express_name" />
				<view class="action text-sm">
					<picker mode="selector" :range="expressList" range-key="title"
					        @change="onSelectedExpress" style="padding-right: 0;">
						<text class="text-blue">选择</text>
					</picker>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">物流单号</view>
				<input type="text" placeholder="请输入物流单号" v-model="form.express_no" />
				<view class="action text-sm">
					<text class="text-blue">粘贴</text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">物流说明</view>
				<input type="text" placeholder="选填" v-model="form.express_remark" />
			</view>
			<view class="padding">
				<button class="cu-btn block bg-gradual-red lg" @click="confirm">提交</button>
			</view>
		</form>
	</view>
	<PageLoad v-else />
</template>

<script>
	export default {
		data() {
			return {
				isLoaded: true,
				form: {
					express_name: '',
					express_no: '',
					express_remark: '',
				},
				expressList: []
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);

			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$back();
			}

			this.loadExpressList();
		},
		methods: {
			// 加载物流公司
			loadExpressList() {
				return uni.$models.getExpressList().then((res) => {
					this.expressList = res;
				});
			},
			// 选择物流公司
			onSelectedExpress(e) {
				const index = e.detail.value;
				this.form.express_name = this.expressList[index].title;
			},

			// 粘贴
			onPaste() {
				uni.getClipboardData({
					success: (res) => {
						this.form.express_no = res.data;
					}
				});
			},

			// 提交
			confirm() {
				const data = Object.assign({}, this.form);
				if (!(data.express_name = data.express_name.trim())) {
					return this.hintError('物流公司必须！');
				}

				if (!(data.express_no = data.express_no.trim())) {
					return this.hintError('物流单号必须！');
				}

				data.id = this.id;
				uni.$models.order.submitRefundDelivery(data, {
					loading: this,
					hint: this
				}).then((res) => {
					this.hintSuccess(`提交成功！`);
					uni.$back();
				});
			}
		}
	}
</script>

<style>

</style>
