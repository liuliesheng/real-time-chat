<template>
	<form @submit="confirm">
		<view class="text-center margin-top">
			<view class="cu-avatar xl round" :style="'background-image:url('+info.avatar+');'"></view>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">姓名</view>
			<input type="text" v-model="form.name" placeholder="请输入姓名" maxlength="24" />
		</view>
		<view class="cu-form-group">
			<view class="title">公司全称</view>
			<input type="text" v-model="form.organization" placeholder="请输入公司全称" maxlength="24" />
		</view>
		<view class="cu-form-group">
			<view class="title">担任职务</view>
			<input type="text" v-model="form.title" placeholder="请输入担任职务" maxlength="24" />
		</view>
		<view class="cu-form-group">
			<view class="title">联系方式</view>
			<input type="text" v-model="form.phone" placeholder="请输入联系手机号" maxlength="24" />
		</view>
		<view class="cu-form-group align-start">
			<view class="title">简介</view>
			<textarea maxlength="-1" placeholder="多行文本输入框"></textarea>
		</view>

		<view class="padding">
			<button form-type="submit" class="cu-btn block bg-gradual-green lg">保存</button>
		</view>
	</form>
</template>

<script>
	export default {
		props: {
			info: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				isSubmitting: false,
				form: {}
			}
		},
		created() {
			this.form = Object.assign({
				avatar: '',
				name: '',
				title: '',
				alias: '',
				phone: '',
				organization: '',
			}, this.info);
		},
		methods: {
			confirm() {
				if (this.isSubmitting) {
					return;
				}

				this.isSubmitting = true;
				uni.$models.vcard.saveVCard(this.form, {
					hint: this.$root,
					loading: this.$root
				}).then(() => {
					this.$emit('change', this.form);
				}).finally(() => {
					this.isSubmitting = false;
				});
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
