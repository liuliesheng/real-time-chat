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

		<block v-if="loaded">
			<slot name="default" v-if="loaded"></slot>
		</block>
		<custom-page-load @refresh="$emit('refresh',$event)" v-else />

		<custom-technical-support v-if="showTechnicalSupport" :class="!loaded?'fixed-bottom':''" />

		<custom-auth-modal />
		<custom-loading />
		<custom-hint />
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
			showTechnicalSupport: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {};
		}
	}
</script>

<style scoped>
	.fixed-bottom {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 30rpx;
	}
</style>
