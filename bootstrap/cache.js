import $ from './$';

const CACHE_PREFIX = 'cache:';

export default {

	/**
	 * 解析缓存键名
	 * @param {String} key
	 * @return {String}
	 */
	resolveKey(key) {
		return CACHE_PREFIX + key;
	},

	/**
	 * 解析缓存值
	 * @param {String} key
	 * @param {*} defaultValue
	 * @return {*}
	 */
	resolveValue(key, defaultValue) {
		if (typeof defaultValue === 'function') {
			defaultValue = defaultValue();
			setTimeout(() => {
				this.set(key, defaultValue);
			}, 0);
		}

		return defaultValue;
	},

	/**
	 * 获取缓存
	 * @param {string} key
	 * @param {*} defaultValue
	 * @return {*}
	 */
	get(key, defaultValue = null) {
		let value = $.getStorageSync(
			this.resolveKey(key)
		);

		if (!value) {
			return this.resolveValue(defaultValue);
		}

		const nowTime = Math.floor(new Date().getTime() / 1000);
		const expireTime = parseInt(value.expire_at);
		if (expireTime < nowTime) {
			return this.resolveValue(defaultValue);
		}

		return value.data;
	},

	/**
	 * 设置缓存
	 * @param {string} key
	 * @param {*} value
	 * @param {number} ttl
	 * @return {*}
	 */
	set(key, value, ttl = 3600) {
		ttl = parseInt(ttl);
		const timestamp = Math.floor(new Date().getTime() / 1000);
		$.setStorageSync(
			this.resolveKey(key), {
				expire_at: ttl > 0 ? timestamp + ttl : 0,
				data: value
			}
		);
	},

	/**
	 * 清除缓存
	 * @param {string} key
	 */
	forget(key) {
		$.removeStorageSync(
			this.resolveKey(key)
		);
	}
}
