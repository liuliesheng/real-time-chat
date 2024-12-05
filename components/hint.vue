<template>
	<view v-show="showMsg" class="hint padding text-center shadow-blur animated"
			:class="classs">
		{{showMsg}}
	</view>
</template>

<script>
export default {
	data() {
		return {
			showMsg: '',
			isShow: 0,
			showType: 'error',
			timeId: 0
		}
	},
	computed: {
		classs: function() {
			return {
				'bg-gradual-red': this.showType !== 'success',
				'bg-gradual-green': this.showType === 'success',
				slideInDown: this.isShow,
				slideOutUp: !this.isShow
			};
		}
	},
	created: function() {
		this.$root.hintError = this.hintError;
		this.$root.hintSuccess = this.hintSuccess;
	},
	methods: {
		hint: function(type, msg) {
			const handler = () => {
				this.showMsg = msg;
				this.showType = type;
				this.isShow = 1;

				this.autoClose();
			};

			if (this.isShow) {
				this.isShow = 0;
				setTimeout(handler, 100);
			} else {
				handler();
			}
		},

		hintError: function(msg) {
			this.hint('error', msg);
		},

		hintSuccess: function(msg) {
			this.hint('success', msg);
		},

		autoClose: function() {
			clearTimeout(this.timeId);
			this.timeId = setTimeout(() => {
				this.isShow = 0;
			}, 1500);
		}
	}
}
</script>

<style>
	.hint {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2000;
	}
</style>
