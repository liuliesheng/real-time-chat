<template>
	<custom-page class="page" :loaded="loaded">

		<template v-if="loaded">
			<view class="status-desc" v-if="info.status!==-1">
				<view class="icon">
					<text class="text-blue cuIcon-timefill" v-if="info.status===0"></text>
					<text class="text-green cuIcon-roundcheckfill" v-else-if="info.status===1"></text>
					<text class="text-red cuIcon-roundclosefill" v-else></text>
				</view>
				<view v-if="info.status===0" class="text-blue text-lg">申请中</view>
				<view v-else-if="info.status===1" class="text-green text-lg">已通过</view>
				<view v-else-if="info.status===2" class="text-red">
					<view class="text-lg">已拒绝</view>
					<view class="margin-top-xs text-yellow" style="word-break: break-all;">{{info.refuse_msg}}</view>
				</view>
				<view class="text-red text-lg" v-else>{{info.status_text||"审核失败！"}}</view>
			</view>

			<view class="cu-bar bg-white margin-top solid-bottom">
				<view class="action text-bold">基本信息填写</view>
			</view>
			<view class="cu-form-group">
				<view class="title required">申请人</view>
				<input type="text" v-model="info.realname" placeholder="请输入申请人姓名" />
			</view>
			<view class="cu-form-group">
				<view class="title required">联系电话</view>
				<input type="number" v-model="info.mobile" placeholder="请输入申请人手机号码" />
			</view>

			<view class="padding">
				<button class="cu-btn block bg-gradual-orange lg shadow radius" @click="confirm"
						:disabled="info.status===0 || info.status===1">提交申请</button>
			</view>

		</template>
	</custom-page>
</template>

<script>
	export default {
		data() {
			return {
				loaded: false,
				info: {
					realname: '',
					mobile: '',
					status: -1,
				},
			}
		},
		onLoad() {
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
				return uni.$models.user.getApplyVipInfo().then((res) => {
					if (res) {
						this.info = res;
					}
					this.loaded = true;
				});
			},
			// 提交申请
			confirm() {
				uni.$models.user.applyVip({
					realname: this.info.realname,
					mobile: this.info.mobile,
				}).then((res) => {
					this.info.status = res.status;
				});
			}
		}
	}
</script>

<style>
	.status-desc {
		margin-top: 15%;
		padding: 30rpx;
		text-align: center;
	}

	.status-desc .icon {
		font-size: 128rpx;
	}

	.cu-form-group .title {
		width: calc(4em + 44rpx);
	}
</style>
