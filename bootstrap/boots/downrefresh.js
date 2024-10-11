import $ from "../$";

// 重写停止下拉刷新方法
let innerAudioContext = $.$config.stopPullDownRefreshAudio;
if (!innerAudioContext) return;

if (typeof innerAudioContext !== 'object') {
	innerAudioContext = $.createInnerAudioContext();
	innerAudioContext.src = $.$config.stopPullDownRefreshAudio;
}

const stopPullDownRefresh = $.stopPullDownRefresh;
$.$$define($, 'stopPullDownRefresh', function(isPlay) {
	if (isPlay) innerAudioContext.play();
	stopPullDownRefresh.call(this);
});
