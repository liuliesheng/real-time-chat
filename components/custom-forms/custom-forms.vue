<template>
	<form @submit="submitHandle">
		<template v-for="(item,index) in items">
			<view class="cu-form-group" :class="'text'===item.type?'align-start flex-direction':''">
				<view class="title">{{item.title}}</view>
				<input type="text" :placeholder="item.placeholder" :name="item.name" :maxlength="item.maxlength"
					   v-if="item.type==='string'" />
				<input type="number" :placeholder="item.placeholder" :name="item.name" :min="item.min" :max="item.max"
					   :maxlength="item.maxlength" v-if="item.type==='number'" />
				<input type="digit" :placeholder="item.placeholder" :name="item.name" :min="item.min" :max="item.max"
					   :maxlength="item.maxlength" v-if="item.type==='digit'" />
				<input type="idcard" :placeholder="item.placeholder" :name="item.name" v-if="item.type==='idcard'" />
				<textarea :placeholder="item.placeholder" :name="item.name" :maxlength="item.maxlength"
						  v-if="item.type==='text'"></textarea>
			</view>
		</template>
		<button form-type="submit" class="cu-btn block bg-blue lg">
			<text class="cuIcon-loading2 cuIconfont-spin" v-if="isLoading"></text> {{submitText}}
		</button>
	</form>
</template>

<script>
	export default {
		name: "custom-forms",
		props: {
			items: {
				type: Array,
				default: () => []
			},
			submitText: {
				type: String,
				default: "提交"
			},
			isLoading: Boolean
		},
		data() {
			return {

			};
		},
		methods: {
			submitHandle(e) {
				const values = e.detail.value;
				const forms = [];

				for (let i = 0; i < this.items.length; i++) {
					const item = this.items[i];
					forms.push({
						title: item.title,
						type: item.type,
						value: values[item.name] || ""
					});
				}

				this.$emit('submit', {
					values: values,
					forms: forms
				});
			}
		}
	}
</script>

<style>

</style>
