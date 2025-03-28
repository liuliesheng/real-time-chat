<template>
	<view class="page">
		<XLoading />
		<Hint />

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

		<view class="cu-bar">
			<view class="action text-bold">基本信息填写</view>
		</view>
		<view class="cu-form-group">
			<view class="title required">联系人</view>
			<input type="text" v-model="info.realname" placeholder="请输入申请人姓名" />
		</view>
		<view class="cu-form-group">
			<view class="title required">联系电话</view>
			<input type="number" v-model="info.phone" placeholder="请输入申请人手机号码" />
		</view>
		<view class="cu-form-group">
			<view class="title required">店铺位置</view>
			<view class="flex-sub" @tap="chooseLocation">
				{{info.address||'请选择店铺位置'}}
			</view>
			<view class="action">
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<view class="cu-form-group">
			<view class="title required">店铺名称</view>
			<input type="text" v-model="info.title" placeholder="请输入店铺名称" />
		</view>


		<view class="cu-bar">
			<view class="action text-bold">提现账户填写</view>
		</view>
		<view class="cu-form-group">
			<view class="title required">卡名称</view>
			<input type="text" v-model="info.bank_name" placeholder="请输入银行卡名称:建设银行" />
		</view>
		<view class="cu-form-group">
			<view class="title required">持卡人</view>
			<input type="text" v-model="info.bank_realname" placeholder="请输入持卡人姓名" />
		</view>
		<view class="cu-form-group">
			<view class="title required">卡号</view>
			<input type="number" v-model="info.bank_account" placeholder="请输入银行卡号" />
		</view>
		<view class="cu-form-group text-red">
			<view class="text-right flex-sub">用于后期提现时使用</view>
		</view>

		<view class="padding">
			<button class="cu-btn block bg-gradual-orange lg shadow radius" @click="confirm"
					:disabled="info.status===0 || info.status===1">提交审核</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					title: '',
					realname: '',
					phone: '',
					province: "河南省",
					city: "郑州市",
					district: "金水区",
					address: "",
					latitude: 0,
					longitude: 0,
					bank_realname: '',
					bank_account: '',

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
				return uni.$models.store.getApplyInfo().then((res) => {
					if (res) {
						this.info = res;
					}
					this.loaded = true;
				});
			},
			// 提交申请
			confirm() {
				uni.$models.store.apply(this.info).then((res) => {
					this.info.status = res.status;
				});
			},

			// 选择店铺位置
			chooseLocation() {
				uni.$chooseLocation({
					lng: this.lng,
					lat: this.lat
				}).then((res) => {
					this.info.lng = res.longitude;
					this.info.lat = res.latitude;
					this.info.address = res.address;
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
