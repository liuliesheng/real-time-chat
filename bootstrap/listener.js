//触发器总集合
const listenerStorage = {};

export default {

	/**
	 * 添加监听器
	 * @param {string} name
	 * @param {*} listener
	 * @param {boolean} once
	 */
	addEventListener(name, listener, once = false) {
		if (!name || !isNaN(parseInt(name)))
			throw TypeError("监听器名称只能为英文字母以及下划线！");

		//判断当前监听器是否存在，不存在则直接创建一个空数组
		if (listenerStorage[name] === undefined)
			listenerStorage[name] = [];

		if (typeof listener !== 'object') {
			listener = {callback: listener};
		}

		//判断callback是否是一个function
		if (typeof listener.callback !== 'function') {
			throw TypeError("监听器必须是一个function！")
		}

		//是否只执行一次
		listener.once = once;
		listenerStorage[name].push(listener);
	},

	/**
	 * 移除监听器
	 * @param {string} name
	 * @param {function} listener
	 */
	removeEventListener(name, listener) {
		if (typeof listener !== 'function') return;

		//处理器
		const handler = (listeners, listener) => {
			const index = listeners.indexOf(listener);
			if (index !== -1) listeners.splice(index, 1);
		};

		if (!name || !isNaN(parseInt(name))) {
			//所有监听器都移除这个回调函数
			listenerStorage.forEach(listeners => handler(listeners, listener));
		} else {
			handler(listenerStorage[name] || [], listener);
		}
	},

	/**
	 * 触发监听器
	 * @param {string} name
	 * @param {*} [param]
	 */
	fireEventListener(name, param) {
		if (!name || !isNaN(parseInt(name)))
			throw TypeError("监听器名称只能为英文字母以及下划线！");

		const listeners = listenerStorage[name] || [];
		for (let i = 0; i < listeners.length; i++) {
			const listener = listeners[i];
			if (listener.once) {
				listeners.splice(i, 1);
				i--;
			}

			//支持返回false 终止触发后面的监听器
			if (listener.callback.call(listener.thisArg, param) === false) {
				break;
			}
		}
	}

};