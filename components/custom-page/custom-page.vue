<template>
	<view class="page">
		<cu-custom :bgColor="navbarBackgroundColor"
			:bgImage="navbarBackgroundImage" v-if="showNavbar">
			<block slot="left">
				<slot name="navbar-left"></slot>
			</block>
			<block slot="content">
				<slot name="navbar-title">{{navbarText}}</slot>
			</block>
			<block slot="right">
				<slot name="navbar-right"></slot>
			</block>
		</cu-custom>

		<slot name="default" v-if="loaded"></slot>
		<custom-page-load v-else/>

		<custom-auth-modal />
		<custom-loading/>
		<custom-hint/>
	</view>
</template>

<script>
export default {
	name: "custom-page",
	props: {
		loaded: Boolean,
		showNavbar: Boolean,
		navbarBackgroundColor: String,
		navbarBackgroundImage: String,
		navbarText: String,
	},
	data() {
		return {};
	}
}
</script>

<style>

</style>
