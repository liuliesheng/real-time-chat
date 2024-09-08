<template>
	<div class="edit">
		<form @submit="onSubmit">
			<view class="form-group">
				<view class="form-item"><input id="nickname" name="nickname" placeholder="昵称" type="text"/></view>
				<view class="form-item"><textarea id="remark" name="remark" placeholder="个人简介"></textarea></view>
			</view>

			<view class="form-btn-group">
				<button>保存</button>
			</view>
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

</style>
