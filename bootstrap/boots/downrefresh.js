import $ from "../$";

// 重写停止下拉刷新方法
const stopPullDownRefresh = $.stopPullDownRefresh;
$.$$define($, 'stopPullDownRefresh', function(options = {}) {
	if (options.sound) {
		playAudio();
	}

	stopPullDownRefresh.call(this);
});

// 播放提示音
function playAudio() {
	let innerAudioContext = $.$config.stopPullDownRefreshAudio;
	if (!innerAudioContext) {
		return;
	}

	if (typeof innerAudioContext !== 'object') {
		playAudio.innerAudioContext = $.createInnerAudioContext();
		playAudio.innerAudioContext.src = $.$config.stopPullDownRefreshAudio;
	}

	playAudio.innerAudioContext.play();
}
