export class Observer {

	/**
	 * 默认构造器
	 * @param {string} name
	 */
	constructor(name) {

		/**
		 * 监听器存储器
		 * @type {*}
		 */
		this._callbackList = [];

		/**
		 * 订阅者名称
		 * @type {string}
		 * @private
		 */
		this._name = name;

		/**
		 * 当前值
		 * @type {*}
		 * @private
		 */
		this._value = null;
	}

	/**
	 * 订阅
	 * @param {...<Function>}  callbacks
	 */
	subscribe(...callbacks) {
		for (let i = 0; i < callbacks.length; i++) {
			const callback = callbacks[i];

			if (this._callbackList.indexOf(callback) !== -1) {
				throw new Error('同一个主题不能重复定义订阅者！');
			}

			this._callbackList.push(callback);
		}
	}

	/**
	 * 取消订阅
	 * @param {...<Function>}  callbacks
	 */
	unsubscribe(...callbacks) {
		for (let i = 0; i < callbacks.length; i++) {
			const callback = callbacks[i];

			const index = this._callbackList.indexOf(callback);
			if (index !== -1) {
				this._callbackList.splice(index, 1);
			}
		}
	}

	/**
	 * 通知事件
	 * @param {*} data
	 */
	notify(data) {
		this._value = data;
		this._callbackList.forEach(function(callback) {
			setTimeout(function() {
				const event = {
					observer: this,
					name: this._name,
					detail: data
				};
				callback(event);
			}, 0);
		});
	}

	/**
	 * 获取当前值
	 * @return {*}
	 */
	value() {
		return this._value;
	}
}

/**
 * 创建一个观察者
 * @param {string} name
 */
export default function observer(name) {
	return new Observer(name);
}
