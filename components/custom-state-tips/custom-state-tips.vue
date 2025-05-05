<template>
	<view class="padding light" :class="stateClass" v-if="state!==-1">
		<view class="text-center">
			<text class="cuIcon-infofill text-xsl"></text>
		</view>
		<view class="text-center margin-top-sm">
			<text>{{showMsg}}</text>
			<text v-if="state===2">{{errorMsg}}</text>
		</view>
	</view>
</template>

<script>
	const MSG_LIST = {
		'0': '审核中...',
		'1': '审核成功！',
		'2': '审核失败：',
	};
	export default {
		name: "custom-state-tips",
		props: {
			state: { type: Number, default: 0 },
			msg: { type: String, default: '' },
			errorMsg: { type: String, default: '' },
		},
		computed: {
			showMsg: function() {
				return this.msg || MSG_LIST[this.state.toString()];
			},
			stateClass() {
				const state = this.state;
				if (state === 1) {
					return 'text-cyan';
				} else if (state === 2) {
					return 'text-red';
				}

				return 'text-yellow';
			}
		},
		data() {
			return {};
		}
	}
</script>

<style>

</style>
