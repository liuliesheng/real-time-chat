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

		this._name = name;
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

	notify(data) {
		this._callbackList.forEach(function(callback) {
			setTimeout(function() {
				const event = {
					observer: this,
					name: this._name,
					detail: data
				};

				callback.call(event);
			}, 0);
		});
	}
}

/**
 * 创建一个观察者
 * @param {string} name 
 */
export default function observer(name) {
	return new Observer(name);
}
