<template>
	<view class="">
		<custom-titlebar title="二维码"></custom-titlebar>
		<custom-qrcode></custom-qrcode>

		<custom-titlebar title="商品海报"></custom-titlebar>
		<custom-poster></custom-poster>

		<custom-titlebar title="PK"></custom-titlebar>
		<custom-pk :title="title" :status="PKStatus" :progress="PKProgress" @choose="choose"></custom-pk>

		<custom-titlebar title="富文本编辑器"></custom-titlebar>
		<custom-editor />
		<editor :show-img-toolbar="true" />

		<custom-titlebar title="数字键盘"></custom-titlebar>
		<custom-number-keyboard></custom-number-keyboard>
	</view>
</template>

<script>
</script>

<style>
</style>
