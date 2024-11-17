// 增加Promise最终方法
if (!Promise.prototype.finally) {
	Promise.prototype.finally = function(callback) {
		let P = this.constructor;
		return this.then(
			value => P.resolve(callback(value)).then(() => value),
			reason => P.resolve(callback(reason)).then(() => {
				throw reason
			})
		);
	};
}

// 增加Promise的强制转化成resolved状态
if (!Promise.prototype.resolved) {
	Promise.prototype.resolved = function(defaultValue = undefined) {
		return this.then(
			value => value,
			reason => defaultValue
		);
	}
}
