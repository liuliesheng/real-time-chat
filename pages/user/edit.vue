<template>
	<div class="edit">
		<view class="title">编辑资料</view>
		<form bindsubmit="onSubmit">
			<view class="form-group">
				<view class="form-item"><input id="nickname" name="nickname" type="text" placeholder="昵称" /></view>
				<view class="form-item"><textarea id="remark" name="remark" placeholder="个人简介"></textarea></view>
			</view>

			<view class="form-btn-group"><button>保存</button></view>
		</form>
	</div>
</template>

<script>
export default {
	name: 'edit',
	data() {
		return {};
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.edit {
}

page {
	padding: 30upx;
}

.title {
	margin: 50upx auto;
	text-align: center;
	font-weight: bold;
}
</style>
