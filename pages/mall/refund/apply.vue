<template>
	<view class="page">
		<XLoading />
		<Hint />

		<view class="cu-form-group margin-top">
			<view class="title required">申请类型</view>
			<picker mode="selector" :range="typeList" range-key="text"
			        @change="typeIndex = $event.detail.value">
				<view class="picker">
					{{typeList[typeIndex].text}}
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title required">收货状态</view>
			<picker mode="selector" :range="receiptStatusList" range-key="text"
			        @change="receiptStatusIndex = $event.detail.value">
				<view class="picker">
					<text v-if="receiptStatusIndex!=-1">{{receiptStatusList[receiptStatusIndex].text}}</text>
					<text v-else>请选择</text>
				</view>
			</picker>
		</view>
		<view class="cu-form-group">
			<view class="title required">申请原因</view>
			<picker mode="selector" :range="info.apply_desc_list" range-key="text"
			        @change="applyDescIndex = $event.detail.value" v-if="info">
				<view class="picker">
					<text v-if="applyDescIndex!=-1">{{info.apply_desc_list[applyDescIndex].text}}</text>
					<text v-else>请选择</text>
				</view>
			</picker>
		</view>
		<view class="cu-form-group margin-top">
			<view class="title">退款金额</view>
			<view class="flex-sub">
				<view class="flex">
					<text style="margin-top: 22rpx;vertical-align: middle;">￥</text>
					<input type="number" style="color: #e54d42;font-size: 24px;" v-model="form.amount" :disabled="true" />
				</view>
				<view class="text-grey text-xs">
					若退款成功，将退还给你￥{{form.amount}}现金
				</view>
			</view>
		</view>

		<view class="cu-form-group align-start">
			<view class="title">申请说明</view>
			<textarea maxlength="255" v-model="form.desc" placeholder="请输入申请说明"></textarea>
		</view>
		<view class="cu-form-group">
			<custom-uploader v-model="form.desc_imgs"></custom-uploader>
		</view>

		<view class="cu-form-group margin-top">
			<view class="title required">联系电话</view>
			<input type="number" v-model="form.phone" placeholder="请输入联系电话" />
		</view>

		<view class="padding">
			<button class="cu-btn block bg-gradual-red lg" @click="confirm" :disabled="!info">提交申请</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderGoodsId: 0,
				info: null,
				applyDescIndex: -1,

				typeList: [
					{ value: 10, text: '仅退款' },
					{ value: 20, text: '退货退款' },
				],
				typeIndex: 0,

				receiptStatusList: [
					{ value: 0, text: '未收到货' },
					{ value: 1, text: '已收得到货' },
				],
				receiptStatusIndex: -1,

				form: {
					type: 0,
					receipt_status: 0,
					amount: 0.00
				},
			};
		},
		onLoad(options) {
			if (!options.order_goods_id) {
				uni.$back()
				return uni.$hintError('参数错误！');
			}

			this.orderGoodsId = options.order_goods_id;

			this.loadData();
		},
		methods: {
			// 加载预退款申请信息
			loadData() {
				return uni.$models.mall.getRefundApplyInfo({
					order_goods_id: this.orderGoodsId
				}).then((res) => {
					this.info = res;
					this.form.amount = res.order_goods.goods_price;
				});
			},
			// 提交申请
			confirm() {
				if (parseInt(this.receiptStatusIndex) === -1) {
					return uni.$hintError("请选择收货状态！");
				}

				if (parseInt(this.applyDescIndex) === -1) {
					return uni.$hintError("请选择退款原因！");
				}

				const data = Object.assign({}, this.form);
				data.order_goods_id = this.orderGoodsId;
				data.type = this.typeList[this.typeIndex].value;
				data.receipt_status = this.receiptStatusList[this.receiptStatusIndex].value;
				data.apply_desc = this.info.apply_desc_list[this.applyDescIndex].value;
				uni.$models.mall.applyRefund(data, {
					loading: this,
					hint: this
				}).then((res) => {
					uni.redirectTo({
						url: './detail?id=' + res.id
					})
				});
			}
		}
	}
</script>

<style scoped>

</style>
