<template>
	<view class="editor">
		<view class="border-b">
			<textarea class="editor-title" maxlength="-1"
					  v-model="article.title" placeholder="# 请输入标题" auto-height />
		</view>
		<!-- 空内容提示 -->
		<view v-if="article.contents.length < 1">
			<text class="text-gray editor-empty">请点击下面的按钮，添加内容。</text>
		</view>
		<!-- 内容区域 -->
		<view v-for="(item, index) in article.contents" :key="index"
			  class="editor-items">
			<!-- 加粗 -->
			<view v-if="item.type == 'h3'">
				<textarea class="editor-strong"
						  :data-index="index" maxlength="-1" :focus="item.focusin"
						  @input="graceEditorInput" :value="item.content" @blur="blur"
						  placeholder="请输入标题" />
			</view>
			<!-- 普通文本 -->
			<view v-else-if="item.type == 'txt'">
				<textarea class="editor-txt"
						  maxlength="-1" @blur="blur"
						  :data-index="index" :focus="item.focusin"
						  @input="graceEditorInput" :value="item.content"
						  placeholder="请填写文本内容" />
			</view>
			<!-- 居中文本 -->
			<view v-else-if="item.type == 'center'"
				  class="flex justify-center"
				  style="background-color:#F8F8F8; padding:20rpx;">
				<input type="text" class="editor-center"
					   @blur="blur" maxlength="-1" :data-index="index"
					   :focus="item.focusin" @input="graceEditorInput"
					   :value="item.content" placeholder="请填写居中文本" />
			</view>
			<!-- 图片 -->
			<view v-else-if="item.type == 'img'"
				  class="editor-img-wrap">
				<image :src="item.content" class="editor-img"
					   :data-index="index" mode="aspectFit"></image>
				<view v-if="item.error"
					  class="editor-img-error flex flex-direction justify-center">
					<text class="editor-img-error-text block text-center cuIcon-upload">上传失败，请重试</text>
				</view>
			</view>
			<!-- 引用 -->
			<view v-else-if="item.type == 'quote'">
				<textarea class="editor-quote"
						  maxlength="-1" @blur="blur"
						  :data-index="index" @input="graceEditorInput" :focus="item.focusin"
						  :value="item.content" placeholder="请输入引用内容" />
			</view>
			<!-- 代码 -->
			<view v-else-if="item.type == 'code'">
				<textarea class="editor-quote"
						  maxlength="-1" @blur="blur"
						  style="height:300rpx;"
						  :data-index="index" @input="graceEditorInput" :focus="item.focusin"
						  :value="item.content" placeholder="请输入代码" />
			</view>
			<!-- 加粗 -->
			<view v-else-if="item.type == 'strong'">
				<textarea class="editor-strong"
						  :data-index="index" maxlength="-1" :focus="item.focusin"
						  @input="graceEditorInput" :value="item.content" @blur="blur"
						  placeholder="请输入加粗内容" />
			</view>
			<!-- 链接 -->
			<view v-else-if="item.type == 'link'">
				<input type="text" class="editor-link"
					   :focus="item.focusin"
					   :data-index="index" @input="graceEditorInput" @blur="blur"
					   :value="item.content" placeholder="请输入连接地址" />
			</view>
			<!-- 分割 -->
			<view v-else-if="item.type == 'spline'">
				<text class="editor-spline block"
					  :data-index="index">● ● ●</text>
			</view>
			<!-- 功能 -->
			<view class="flex justify-end editor-item-btns-wrap">
				<view class="editor-item-btns" hover-class="tap"
					  :data-index="index" @tap="moveup">
					<text class="editor-item-btns-text block cuIcon-fold">上移</text>
				</view>
				<view class="editor-item-btns" hover-class="tap"
					  :data-index="index" @tap="movedown">
					<text class="editor-item-btns-text block cuIcon-unfold">下移</text>
				</view>
				<view class="editor-item-btns" @tap="deleteItem"
					  hover-class="tap" :data-index="index">
					<text class="editor-item-btns-text block cuIcon-deletefill">删除</text>
				</view>
			</view>
		</view>
		<view class="margin-top-large"
			  v-if="article.contents.length >= 1"></view>
		<!-- 选项类型选择 -->
		<view class="flex align-center justify-between editor-menus" style="border-top: 1rpx solid rgba(0,0,0,0.2);"
			  :style="{paddingBottom:ipxHeight}">
			<text class="editor-icons cuIcon-titles" data-type="h3"
				  @tap="graceEditorAddItem" style="font-size:32rpx;"></text>
			<text class="editor-icons cuIcon-text" data-type="txt"
				  @tap="graceEditorAddItem" style="font-size:36rpx;"></text>
			<text class="editor-icons icons" data-type="center"
				  @tap="graceEditorAddItem" style="font-size:24rpx;">居中</text>
			<text class="editor-icons cuIcon-pic" data-type="img"
				  @tap="graceEditorAddItem"></text>
			<text class="editor-icons icons" data-type="quote"
				  @tap="graceEditorAddItem" style="font-size:24rpx;">引用</text>
			<text class="editor-icons icons" data-type="code"
				  @tap="graceEditorAddItem" style="font-size:24rpx;">代码</text>
			<text class="editor-icons icons" data-type="strong" style="font-size:24rpx;"
				  @tap="graceEditorAddItem">加粗</text>
			<text class="editor-icons cuIcon-link" data-type="link"
				  @tap="graceEditorAddItem" style="font-size:38rpx;"></text>
			<text class="editor-icons cuIcon-move bold" data-type="spline"
				  @tap="graceEditorAddItem"></text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "custom-editor",
		data() {
			return {
				article: { title: '', contents: [] },
				ipxHeight: 0
			}
		},
		created: function() {
			// #ifdef MP
			try {
				var system = uni.getSystemInfoSync();
				system.model = system.model.replace(' ', '');
				system.model = system.model.toLowerCase();
				var res1 = res.model.indexOf('iphonex');
				if (res1 > 5) { res1 = -1; }
				var res2 = res.model.indexOf('iphone1');
				if (res2 > 5) { res2 = -1; }
				if (res1 != -1 || res2 != -1) {
					this.ipxHeight = '60rpx';
				}
			} catch (e) { return null; }
			// #endif
		},
		methods: {
			graceEditorAddItem: function(e) {
				var type = e.currentTarget.dataset.type;
				if (type == 'img') {
					uni.chooseImage({
						success: (e) => {
							var imgs = e.tempFilePaths;
							for (let i = 0; i < imgs.length; i++) {
								this.article.contents.push({
									type: type,
									content: imgs[i],
									focusin: false
								});
							}
						}
					});
				} else if (type == 'spline') {
					this.article.contents.push({ type: type, content: '', focusin: false });
				} else {
					this.article.contents.push({ type: type, content: '', focusin: true });
				}
			},
			graceEditorInput: function(e) {
				var index = e.currentTarget.dataset.index;
				var val = e.detail.value;
				this.article.contents[index].content = val;
			},
			deleteItem: function(e) {
				var index = e.currentTarget.dataset.index;
				uni.showModal({
					title: "提示",
					content: "确定要删除项目吗?",
					success: (e) => {
						if (e.confirm) { this.article.contents.splice(index, 1); }
					}
				})
			},
			blur: function(e) {
				var index = Number(e.currentTarget.dataset.index);
				this.article.contents[index].focusin = false;
				this.article.contents.splice(index, 1, this.article.contents[index]);
			},
			moveup: function(e) {
				var index = Number(e.currentTarget.dataset.index);
				if (index > 0) {
					this.article.contents[index] = this.article.contents.splice(index - 1, 1, this.article.contents[
						index])[0];
				}
			},
			movedown: function(e) {
				var index = Number(e.currentTarget.dataset.index);
				if (index < this.article.contents.length - 1) {
					this.article.contents[index] = this.article.contents.splice(index + 1, 1, this.article.contents[
						index])[0];
				}
			},
			getData: function() {
				return this.article;
			},
			setError: function(index) {
				this.article.contents[index].error = true;
				this.article.contents.splice(index, 1, this.article.contents[index]);
			},
			setDefault: function(article) {
				this.article = article;
			}
		}
	}
</script>
<style scoped>
	.editor {
		padding: 10rpx 25rpx;
		background-color: #FFFFFF;
		border-radius: 6rpx;
	}

	.editor-title {
		padding: 25rpx 0;
		width: 690rpx;
		font-size: 32rpx;
		line-height: 50rpx;
		color: #2B2E3D;
	}

	.editor-empty {
		line-height: 120rpx;
		font-size: 26rpx;
	}

	.editor-icons {
		width: 80rpx;
		height: 80rpx;
		color: #898989;
		line-height: 88rpx;
		text-align: center;
		font-size: 34rpx;
		margin: 5rpx 0;
	}

	.editor-items {
		margin-top: 20rpx;
	}

	.editor-item-btns-wrap {
		padding: 20rpx 5rpx;
	}

	.editor-item-btns {
		width: 100rpx;
		border-radius: 30rpx;
		margin-left: 20rpx;
		background-color: #898989;
	}

	.editor-item-btns-text {
		text-align: center;
		font-size: 20rpx;
		line-height: 38rpx;
		border-radius: 30rpx;
		color: #FFFFFF;
	}

	/* #ifndef APP-NVUE */
	.editor-icons {
		display: block;
	}

	/* #endif */
	.editor-txt {
		width: 650rpx;
		font-size: 26rpx;
		line-height: 35rpx;
		padding: 20rpx;
		height: 150rpx;
	}

	.editor-center {
		width: 500rpx;
		text-align: center;
		font-size: 28rpx;
		color: #333333;
		height: 60rpx;
		line-height: 60rpx;
	}

	.editor-img-wrap {
		width: 650rpx;
		height: 320rpx;
		overflow: hidden;
		position: relative;
		font-size: 0;
	}

	.editor-img {
		width: 650rpx;
		height: 320rpx;
	}

	.editor-quote {
		width: 650rpx;
		font-size: 26rpx;
		line-height: 35rpx;
		padding: 20rpx;
		background-color: #F9F9F9;
		height: 100rpx;
	}

	.editor-strong {
		width: 650rpx;
		font-size: 26rpx;
		line-height: 35rpx;
		padding: 20rpx;
		height: 100rpx;
		font-weight: bold;
	}

	.editor-link {
		width: 650rpx;
		font-size: 26rpx;
		line-height: 35rpx;
		padding: 20rpx;
		height: 100rpx;
		color: #008AFF;
	}

	.editor-spline {
		width: 650rpx;
		line-height: 60rpx;
		text-align: center;
		color: #8788A3;
		font-size: 28rpx;
		opacity: 0.6;
	}

	.editor-img-error {
		position: absolute;
		width: 650rpx;
		height: 320rpx;
		left: 0;
		top: 0;
		background-color: rgba(0, 0, 0, 0.8);
	}

	.editor-img-error-text {
		font-size: 28rpx;
		color: #FFFFFF;
	}
</style>
