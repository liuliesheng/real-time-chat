<template>
	<view class="page">
		<XLoading />
		<Hint />

		<view class="padding light" :class="statusClass" v-if="form.status!==-1">
			<text class="cuIcon-infofill margin-right-xs"></text>
			<text v-if="form.status===0">审核中...</text>
			<text v-else-if="form.status===1">审核成功！</text>
			<text v-else-if="form.status===2">审核失败：{{form.audit_msg}}</text>
		</view>

		<form class="bg-white">
			<view class="cu-form-group margin-top">
				<view class="title required">真实姓名</view>
				<input v-model="form.realname" placeholder="请输入" />
			</view>
			<view class="cu-form-group">
				<view class="title required">身份证号</view>
				<input v-model="form.card_no" placeholder="请输入" />
			</view>
		</form>

		<view class="text-gray text-sm margin">
			<text class="cuIcon-safe text-green margin-right-xs"></text>
			<text>我们会保障你的信息安全，信息仅用于实名认证</text>
		</view>

		<view class="padding flex flex-direction">
			<button class="cu-btn bg-blue lg" @tap="onSubmit" :disabled="isDisabled">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {},
				loaded: false
			}
		},
		computed: {
			isDisabled() {
				return !this.loaded || (this.form.status != 2 && this.form.status != -1);
			},
			statusClass() {
				const status = this.form.status;
				if (status === 1) {
					return 'bg-cyan';
				} else if (status === 2) {
					return 'bg-red';
				}

				return 'bg-yellow';
			}
		},
		onLoad() {
			this.loadData();
		},
		methods: {
			// 加载认证
			loadData() {
				uni.$model.user.getIdentityInfo().then((res) => {
					this.form = res || {
						realname: '',
						card_no: '',
						card_hand: '',
						card_front: '',
						card_back: '',
						status: -1,
						audit_time: '',
						audit_msg: '',
						create_time: '',
					};
					this.loaded = true;
				});
			},

			// 申请认证
			onSubmit() {
				const form = this.form;

				if (!(form.realname = form.realname.trim())) {
					return this.hintError('请填写真实姓名！');
				}

				if (!(form.card_no = form.card_no.trim())) {
					return this.hintError('请填写身份证号！');
				}

				uni.$model.user.applyIdentity(form, {
					hint: this,
					loading: this
				}).then(() => {
					this.form.status = 0;
					this.hintSuccess('已提交！');
					uni.$delayNavigateBack();
				});
			},
		}
	}
</script>

<style>

</style>
