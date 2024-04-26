/**
 * 检查类型
 * @param {*} value
 * @param {string} type
 * @param {string} prefixErrorMsg
 */

function checkType(value, type, prefixErrorMsg) {
	if (!value || typeof value !== type)
		throw new TypeError(prefixErrorMsg + '是一个' + type + '类型，传递的是一个' + (typeof name) + '类型');
}

/**
 * 监听器
 */
export class EventEmitter {

	/**
	 * 默认构造器
	 */
	constructor() {
		/**
		 * 监听器存储器
		 * @type {*}
		 */
		this._listeners = {};
	}

	/**
	 * 添加监听器
	 * @param {string} name
	 * @param {...<Function,object>} callbacks
	 * @return {*[]}
	 */
	on(name, ...callbacks) {
		checkType(name, 'string', '参数1');
		const callbackStorage = this._listeners.hasOwnProperty(name) ? this._listeners[name] : this._listeners[name] = [];
		for (let i in callbacks) {
			let callback = callbacks[i];
			if (typeof callback === 'function') callback = {callback: callback};
			checkType(callback.callback, 'function', `参数${i}`);
			callbackStorage.push(callback);
		}
		return callbacks.length > 1 ? callbacks : callbacks[0];
	}

	/**
	 * 只触发一次事件
	 * @param {string} name
	 * @param {*} callback
	 * @returns {*[]}
	 */
	once(name, callback) {
		if (typeof callback === 'function') callback = {callback: callback};
		callback.once = true;
		return this.on(name, callback);
	}

	/**
	 * 移除监听器
	 * @param {string,null} name
	 * @param {...<Function,object>} callbacks
	 */
	off(name, ...callbacks) {
		if (name) {
			if (!this._listeners.hasOwnProperty(name)) return;
			const callbackStorage = this._listeners[name];
			if (callbacks.length) {
				for (let i in callbacks) {
					const callback = callbacks[i];
					for (let i = 0; i < callbackStorage.length; i++) {
						if (callback === callbackStorage[i].callback) {
							callbackStorage.splice(i, 1);
							i--;
						}
					}
				}
			} else {
				this._listeners[name] = [];
			}
		} else {
			this._listeners = {};
		}
	}

	/**
	 * 触发监听器
	 * @param {string} name
	 * @param {*} [param]
	 * @param {boolean} [isSyncExec]
	 * @return {EventEmitter}
	 */
	trigger(name, param, isSyncExec) {
		isSyncExec = isSyncExec || false;
		checkType(name, 'string', '参数1');
		const handler = () => {
			if (this._listeners.hasOwnProperty(name)) {
				const callbackStorage = this._listeners[name];
				for (let i = 0; i < callbackStorage.length; i++) {
					const callback = callbackStorage[i];

					//只执行一次回调器
					if (callback.once) {
						callbackStorage.splice(i, 1);
						i--;
					}

					let result = undefined;
					if (callback.isBind) {
						if (callback.isReplaceBindArg !== false) {
							result = callback.callback(param);
						} else {
							result = callback.callback();
						}
					} else {
						result = callback.callback.call(callback.thisArg, param);
					}
					if (result !== undefined) param = result;
				}
			}
		};

		if (isSyncExec) {
			handler();
		} else {
			setTimeout(handler, 0);
		}
		return this;
	}
}


/**
 * 导出默认监听器实例
 * @type {EventEmitter}
 */
export const emitter = new EventEmitter();
