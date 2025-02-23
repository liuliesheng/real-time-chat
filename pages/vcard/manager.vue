<template>
	<view class="page">
		<XLoading />
		<Hint />

		<template v-if="loaded">
			<template v-if="info">
				<view class="padding text-center bg-white">
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
							<view class="text-xxl"><text
									  :class="info.is_favorite?'cuIcon-favorfill':'cuIcon-favor'"></text>
							</view>
							<view class="">{{info.collect_count}}</view>
						</view>
						<view class="flex-sub">
							<view class="text-xxl"><text
									  :class="info.is_good?'cuIcon-appreciatefill':'cuIcon-appreciate'"></text></view>
							<view class="">{{info.good_count}}</view>
						</view>
					</view>
				</view>

				<view class="flex text-center bg-white margin-top padding-top padding-bottom">
					<view class="flex-sub" @tap="setPhoneForm">
						<text class="cuIcon-phone text-xxl"></text>
						<view class="">设置手机号</view>
					</view>
					<view class="flex-sub" @tap="setWechatForm">
						<text class="cuIcon-weixin text-xxl"></text>
						<view class="">设置微信</view>
					</view>
					<view class="flex-sub" @tap="setWechatForm">
						<text class="cuIcon-qr_code text-xxl" :data-current="0"></text>
						<view class="">设置微信二维码</view>
					</view>
				</view>

				<!-- 获客工具 -->
				<view class="bg-white margin-top">
					<view class="cu-bar">
						<view class="action"><text class="cuIcon-titles text-blue"></text>获客工具</view>
					</view>
					<view class="grid col-4 grid-square text-center text-sm">
						<view class="padding-sm">
							每日海报
						</view>
						<view class="padding-sm">
							营销文档
						</view>
						<view class="padding-sm">
							拓客好文
						</view>
						<view class="padding-sm">
							群通讯录
						</view>
					</view>
				</view>

				<!-- 更多场景 -->
				<view class="bg-white margin-top">
					<view class="cu-bar">
						<view class="action"><text class="cuIcon-titles text-blue"></text>更多场景</view>
					</view>
					<view class="grid col-4 grid-square text-center text-sm">
						<view class="padding-sm" @tap="makeVCardWeappQrcode">
							交换名片
						</view>
						<view class="padding-sm">
							拍名片
						</view>
						<view class="padding-sm">
							名片印刷
						</view>
						<view class="padding-sm">
							邀请同事
						</view>
						<view class="padding-sm">
							公众号推广
						</view>
					</view>
				</view>
			</template>
			<VCardBasicEdit @change="onInfoChange" v-else />

			<ModalForm :items="modifyFormItems"
					   @close="modifyFormItems=[]"
					   @submit="modifyVCard"
					   v-if="modifyFormItems.length" />

			<view class="cu-modal show">
				<view class="cu-dialog bg-white">
					<view class="padding-top">
						<image :src="info.weapp_qrcode.url" mode="widthFix"
							   :show-menu-by-longpress="true"></image>
					</view>
					<view class="cu-bar bg-white">
						<view class="action margin-0 flex-sub  solid-left" @tap="saveWeappQrcodeAlbum">保存到相册</view>
					</view>
				</view>
			</view>

		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import model from './model.js';
	import VCardBasicEdit from './components/vcard-basic-edit.vue';
	import ModalForm from './components/modal-form.vue';
	export default {
		components: {
			VCardBasicEdit,
			ModalForm
		},
		data() {
			return {
				info: null,
				loaded: false,

				isSubmitting: false,
				modifyFormItems: []
			}
		},

		onLoad(options) {
			this.loadData();
		},

		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			// 加载数据
			loadData() {
				return model.getSelfVCard(this.id).then(res => {
					this.info = res;
					this.loaded = true;
				});
			},

			// 名片信息被改变
			onInfoChange(info) {
				this.info = Object.assign(this.info || {}, info);
			},

			// 设置手机号
			setPhoneForm() {
				this.modifyFormItems = [{
					label: '手机号',
					name: 'phone',
					type: 'number',
					value: this.info.phone
				}];
			},

			// 设置微信表单
			setWechatForm() {
				this.modifyFormItems = [{
					label: '微信号',
					name: 'wechat_account',
					type: 'text',
					value: this.info.wechat_account,
					maxlength: 50,
				}, {
					label: '微信二维码',
					name: 'wechat_qrcode',
					type: 'image',
					value: this.info.wechat_qrcode
				}];
			},

			// 修改名片
			modifyVCard(info) {
				if (this.isSubmitting) {
					return;
				}

				this.isSubmitting = true;
				model.updateVCard(info, {
					hint: this.$root,
					loading: this.$root
				}).then(() => {
					this.modifyFormItems = [];
					this.onInfoChange(info);
				}).finally(() => {
					this.isSubmitting = false;
				});
			},

			// 生成小程序码
			makeVCardWeappQrcode() {
				if (this.isSubmitting) {
					return;
				}

				this.isSubmitting = true;
				model.makeVCardWeappQrcode().then((res) => {
					console.log(res);
					this.$set(this.info, 'weapp_qrcode', res);
				}).finally(() => {
					this.isSubmitting = false;
				});
			},

			// 保存小程序码到相册
			saveWeappQrcodeAlbum() {
				uni.downloadFile({
					url: this.info.weapp_qrcode.url,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							fail: () => {
								uni.showModal({
									content: '图片保存失败，请确认是否开启相册权限！'
								});
							}
						});
					},
					fail: () => {
						this.hintError('图片下载失败！');
					}
				});
			},
		}
	}
</script>

<style>

</style>
