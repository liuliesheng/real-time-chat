<template>
	<view v-show="showMsg" class="hint padding text-center shadow-blur animated"
		  :class="{
				'bg-grey': showType === '',
				'bg-red': showType === 'error',
				'bg-green': showType === 'success',
				'bg-blue': showType==='info',
				'bg-yellow': showType==='warn',
				slideInDown: isShow,
				slideOutUp: !isShow
			}"
		  :style="{
				top:offsetTop+'px'
			}">
		{{ showMsg }}
	</view>
</template>

<script>
	// const successAudioContext = uni.createInnerAudioContext();
	// successAudioContext.src = uni.$config.successTipsAudio;
	// const failAudioContext = uni.createInnerAudioContext();
	// failAudioContext.src = uni.$config.failTipsAudio;
	export default {
		props: {
			offsetTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				showMsg: '',
				isShow: 0,
				showType: 'error',
				timeId: 0,
			}
		},
		created: function() {
			this.$root.hint = this.hint;
			this.$root.hintError = this.hintError;
			this.$root.hintSuccess = this.hintSuccess;
		},
		methods: {
			hint: function(msg, type = '') {
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
				this.hint(msg, 'error');
				// failAudioContext.play();
			},

			hintSuccess: function(msg) {
				this.hint(msg, 'success');
				// successAudioContext.play();
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

<style scoped>
	.hint {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 2000;
	}
</style>
