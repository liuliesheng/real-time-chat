<template>
	<button class="cu-btn sm" :disabled="waits > 0" @click="sendCode">
		获取验证码<text v-if="waits > 0">（{{waits}}秒）</text>
	</button>
</template>

<script>
	const waits = {};
	export default {
		props: {
			name: String,
			url: String,
			wait: {
				type: Number,
				default: 60
			},
		},
		data() {
			return {
				waits: 0,
				isOnRequest: false
			};
		},
		created() {
			this.waits = waits[this.name] || 0;
		},
		methods: {
			// 开始倒计时
			startTally() {
				console.log("ssss")
				const timerId = setInterval(() => {
					this.waits--;
					waits[this.name] = this.waits;
					if (this.waits < 1) {
						clearInterval(timerId);
					}
				}, 1000);

				waits[this.name] = this.waits = this.wait;
			},

			// 发送验证码
			sendCode() {
				if (this.isOnRequest) {
					return;
				}

				this.isOnRequest = true;
				uni.$http.get(this.url).then(() => {
					this.startTally();
				}).finally(() => {
					this.isOnRequest = false;
				});
			}
		}
	}
</script>

<style scoped>

</style>
