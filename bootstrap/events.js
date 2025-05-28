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
	 * @param {<Function,object>} handle
	 * @return {Function}
	 */
	on(name, handle, isInsert = false) {
		checkType(name, 'string', 'name');

		if (!this._listeners.hasOwnProperty(name)) {
			this._listeners[name] = [];
		}

		const handleStorage = this._listeners[name];
		if (typeof handle !== 'object') {
			handle = {
				handle: handle
			};
		}

		checkType(handle.handle, 'function', 'handle');
		if (isInsert) {
			handleStorage.unshift(handle);
		} else {
			handleStorage.push(handle);
		}

		return handle.handle;
	}

	/**
	 * 只触发一次事件
	 * @param {string} name
	 * @param {*} handle
	 * @returns {*[]}
	 */
	once(name, handle, isInsert = false) {
		if (typeof handle === 'function') {
			handle = {
				handle: handle
			};
		}

		handle.once = true;

		return this.on(name, handle, isInsert);
	}

	/**
	 * 移除监听器
	 * @param {string,null} name
	 * @param {...<Function,object>} handles
	 */
	off(name, ...handles) {
		if (!name) {
			return;
		}

		if (!this._listeners.hasOwnProperty(name)) {
			return;
		}

		const handleStorage = this._listeners[name];
		if (handles.length) {
			for (let i in handles) {
				const handle = handles[i];
				for (let i = 0; i < handleStorage.length; i++) {
					if (handle === handleStorage[i].handle) {
						handleStorage.splice(i, 1);
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
	 * @param {*} param
	 * @return {EventEmitter}
	 */
	emit(name, param) {
		checkType(name, 'string', 'name');

		if (!this._listeners.hasOwnProperty(name)) {
			return this;
		}

		const handleStorage = this._listeners[name];
		for (let i = 0; i < handleStorage.length; i++) {
			const handle = handleStorage[i];

			//只执行一次回调器
			if (handle.once) {
				handleStorage.splice(i, 1);
				i--;
			}

			let result = undefined;

			if (handle.isBind) {
				if (handle.isReplaceBindArgs !== false) {
					result = handle.handle(param);
				} else {
					result = handle.handle();
				}
			} else {
				result = handle.handle.call(handle.thisArg, param);
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
