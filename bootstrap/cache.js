import $ from './$';

const CACHE_EXPIRE_SUFFIX = 'cache';

export default {

	/**
	 * 获取缓存
	 * @param {string} key
	 * @param {*} defaultValue
	 * @param {boolean|number} isSet
	 * @return {*}
	 */
	get(key, defaultValue = null, isSet = false) {
		let value = null;

		const expireTime = parseInt($.getStorageSync(key + CACHE_EXPIRE_SUFFIX))
		if (expireTime) {
			const timestamp = Math.floor(new Date().getTime() / 1000);
			if (parseInt(expireTime) < timestamp) {
				value = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
				if (isSet && value) {
					this.set(key, value, typeof isSet === 'number' ? isSet : 60);
				}

				return value;
			}
		}

		value = $.getStorageSync(key);
		if (value === null) {
			value = typeof defaultValue === 'function' ? defaultValue() : defaultValue;
			if (isSet && value) {
				this.set(key, value, typeof isSet === 'number' ? isSet : 60);
			}
		}

		return value;
	},

	/**
	 * 设置缓存
	 * @param {string} key
	 * @param {*} value
	 * @param {number} ttl
	 * @return {*}
	 */
	set(key, value, ttl = 60) {
		$.setStorageSync(key, value);

		ttl = parseInt(ttl);
		if (ttl > 0) {
			const timestamp = Math.floor(new Date().getTime() / 1000) + ttl;
			$.setStorageSync(key + CACHE_EXPIRE_SUFFIX, timestamp + "");
		} else {
			$.removeStorageSync(key + CACHE_EXPIRE_SUFFIX);
		}
	},

	/**
	 * 清除缓存
	 * @param {string} key
	 */
	forget(key) {
		$.removeStorageSync(key);
		$.removeStorageSync(key + CACHE_EXPIRE_SUFFIX);
	}
}
