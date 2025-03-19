/**
 * 检查类型
 * @param {*} value
 * @param {string} type
 * @param {string} prefixErrorMsg
 */
function checkType(value, type, prefixErrorMsg) {
	if (!value || typeof value !== type) {
		throw new TypeError(prefixErrorMsg + '是一个' + type + '类型，传递的是一个' + (typeof name) + '类型');
	}
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
	 * @param {<Function,object>} callback
	 * @return {Function}
	 */
	on(name, callback, isInsert = false) {
		checkType(name, 'string', 'name');

		if (!this._listeners.hasOwnProperty(name)) {
			this._listeners[name] = [];
		}

		const callbackStorage = this._listeners[name];
		if (typeof callback !== 'object') {
			callback = {
				callback: callback
			};
		}

		checkType(callback.callback, 'function', 'callback');
		if (isInsert) {
			callbackStorage.unshift(callback);
		} else {
			callbackStorage.push(callback);
		}

		return callback.callback;
	}

	/**
	 * 只触发一次事件
	 * @param {string} name
	 * @param {*} callback
	 * @returns {*[]}
	 */
	once(name, callback, isInsert = false) {
		if (typeof callback === 'function') {
			callback = {
				callback: callback
			};
		}

		callback.once = true;

		return this.on(name, callback, isInsert);
	}

	/**
	 * 移除监听器
	 * @param {string,null} name
	 * @param {...<Function,object>} callbacks
	 */
	off(name, ...callbacks) {
		if (!name) {
			return;
		}

		if (!this._listeners.hasOwnProperty(name)) {
			return;
		}

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
	}

	/**
	 * 移除所有监听器
	 */
	offAll() {
		this._listeners = {};
	}

	/**
	 * 触发监听器
	 * @param {string} name
	 * @param {*} [param]
	 * @return {EventEmitter}
	 * @deprecated
	 */
	trigger(name, param) {
		return this.emit(name, param);
	}

	/**
	 * 触发监听器
	 * @param {string} name
	 * @param {*} [param]
	 * @return {EventEmitter}
	 */
	emit(name, param) {
		checkType(name, 'string', 'name');

		if (!this._listeners.hasOwnProperty(name)) {
			return this;
		}

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
				if (callback.isReplaceBindArgs !== false) {
					result = callback.callback(param);
				} else {
					result = callback.callback();
				}
			} else {
				result = callback.callback.call(callback.thisArg, param);
			}

			if (result === false) {
				return this;
			}
		}

		return this;
	}
}


/**
 * 导出默认监听器实例
 * @type {EventEmitter}
 */
export const emitter = new EventEmitter();
