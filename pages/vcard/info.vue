<template>
	<view class="page">
		<XLoading />
		<Hint />

		<template v-if="loaded">
			<!-- <video src="https://video-qn.ibaotu.com/19/68/82/32r888piCzMR.mp4_10s.mp4"></video> -->
			<VCard :info="info" class="card" />

			<view class="flex text-center bg-white margin-top padding-top padding-bottom">
				<view class="flex-sub text-xxl" v-if="info.phone" @tap="callPhone">
					<text class="cuIcon-phone"></text>
				</view>
				<view class="flex-sub text-xxl" v-if="info.wechat_account" @tap="copy(info.wechat_account)">
					<text class="cuIcon-weixin"></text>
				</view>
				<view class="flex-sub text-xxl" v-if="info.wechat_qrcode" @tap="previewImage"
					  :data-urls="info.wechat_qrcode" :data-current="0">
					<text class="cuIcon-qr_code" :data-current="0"></text>
				</view>
				<view class="flex-sub text-xxl" v-if="info.qq">{{info.qq}}</view>
			</view>

			<view class="bg-white margin-top">
				<view class="cu-bar">
					<view class="action"><text class="cuIcon-titles text-blue"></text>Ta 的简介</view>
				</view>
				<view class="padding" style="padding-top: 0;">
					从事6年SAP Business One ERP销售工作，在这6年时间内接触了大量的微型，中小型，中大型企业，结识了大量的企业老板和职业经理人，积累了丰富经验。
					本人性格外向，具有良好的亲和力，喜欢把客户当作朋友来进行维护，对所有客户，无论大小都一视同仁，全心负责！
				</view>
			</view>

			<view class="bg-white margin-top">
				<view class="cu-bar">
					<view class="action"><text class="cuIcon-titles text-blue"></text>Ta 的动态</view>
				</view>
				<template v-if="!isDynamicDataEmpty">
					<view class="cu-timeline" v-for="(list,key) in dynamicData" :key="key">
						<view class="cu-time">
							<view v-if="currentYear!=list.time.getFullYear()">{{list.time.getFullYear()}}年</view>
							<view class="text-lg">{{list.time.getMonth()+1}}月{{list.time.getDate()}}日</view>
						</view>
						<view class="cu-item" v-for="(item,index) in list.items" :key="item.id">
							<view class="content bg-white" style="word-wrap: break-word;">
								<view class="text-content">{{item.content}}</view>
								<view class="grid col-3 grid-square margin-top" @tap="previewImage"
									  :data-urls="item.images"
									  v-if="item.images.length">
									<view class="bg-img" v-for="(item,index) in item.images" :key="index"
										  :data-current="index"
										  :style="[{ backgroundImage:'url(' + item + ')' }]"></view>
								</view>
							</view>
						</view>
					</view>
				</template>
				<Empty v-else />
			</view>
		</template>
		<PageLoad @refresh="loadData" v-else />
	</view>
</template>

<script>
	import model from './model.js';
	import VCard from './components/vcard.vue';
	export default {
		components: { VCard, },
		data() {
			return {
				id: 0,
				info: null,
				loaded: false,

				currentYear: new Date().getFullYear(),
				dynamicData: {},
				isDynamicDataEmpty: true,
				page: 1,
				more: true,
				keywords: '',
			}
		},
		onLoad(options) {
			this.id = parseInt(options.id);
			if (isNaN(this.id)) {
				uni.$hintError('参数错误！');
				return uni.$delayNavigateBack();
			}

			this.loadData();
		},

		onPullDownRefresh() {
			this.loadData().finally(() => {
				uni.stopPullDownRefresh();
			});
		},

		onReachBottom() {
			if (!this.more) {
				return;
			}

			this.loadDynamicData(this.page + 1);
		},

		methods: {
			// 加载数据
			loadData() {
				return model.getVCardDetail(this.id).then(res => {
					this.info = res;
					this.loaded = true;

					this.loadDynamicData();
				});
			},

			// 加载动态数据
			loadDynamicData(page = 1) {
				return model.getDynamicList(this.id, {
					page: page
				}).then(res => {
					const dynamicData = page === 1 ? {} : this.dynamicData;
					res.data.forEach(item => {
						const itemCreateTime = new Date(item.create_time);
						const itemKey = uni.$timeUtil.format.date(itemCreateTime);
						if (!dynamicData[itemKey]) {
							this.$set(dynamicData, itemKey, {
								time: itemCreateTime,
								items: []
							});
						}

						dynamicData[itemKey].items.push(item);
					});

					if (page === 1) {
						this.dynamicData = dynamicData;
						this.isDynamicDataEmpty = res.data.length === 0;
					}

					this.more = res.data.length >= res.per_page;
					this.page = page;
				});
			},



			// 拨打手机号
			callPhone() {
				uni.makePhoneCall({
					phoneNumber: this.info.phone
				})
			},

			// 添加手机号到通讯录里面
			addPhoneContact() {
				uni.addPhoneContact({
					firstName: this.info.name,
					mobilePhoneNumber: this.info.phone,
					weChatNumber: this.info.wechat_account,
					organization: this.info.organization,
					title: this.info.title,
				})
			},
		}
	}
</script>

<style>
	.cu-timeline .cu-time {
		width: 160rpx;
		color: #000000;
	}

	.cu-timeline>.cu-item>.content {
		padding: 0;
	}

	.cu-timeline>.cu-item .text-content {
		max-height: 134rpx;
		overflow: hidden;

		text-overflow: ellipsis;
		white-space: normal !important;
		word-wrap: break-word;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.card {
		/* position: absolute; */
		/* top: 100px; */
	}
</style>
