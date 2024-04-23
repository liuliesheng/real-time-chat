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

//是否是对象
if (!Object.isObject) {
	Object.isObject = function(o) {
		const type = typeof o;
		return o !== null && (type === "object" || type === "function");
	};
}

//转换成Object
if (!Object.toObject) {
	Object.toObject = function(val) {
		if (val === null || val === undefined) {
			throw new TypeError("Cannot convert undefined or null to object");
		}
		return Object(val);
	};
}

//深度合并对象
if (!Object.deepAssign) {
	(function() {
		const hasOwnProperty = Object.prototype.hasOwnProperty;
		const propIsEnumerable = Object.prototype.propertyIsEnumerable;

		function assignKey(to, from, key) {
			const val = from[key];
			if (val === undefined || val === null) {
				return;
			}
			if (hasOwnProperty.call(to, key)) {
				if (to[key] === undefined || to[key] === null) {
					throw new TypeError("Cannot convert undefined or null to object (" + key + ")");
				}
			}
			if (!hasOwnProperty.call(to, key) || !Object.isObject(val)) {
				to[key] = val;
			} else {
				to[key] = assign(Object(to[key]), from[key]);
			}
		}

		function assign(to, from) {
			if (to === from) {
				return to;
			}

			from = Object(from);
			for (const key in from) {
				if (hasOwnProperty.call(from, key)) {
					assignKey(to, from, key);
				}
			}

			if (Object.getOwnPropertySymbols) {
				const symbols = Object.getOwnPropertySymbols(from);
				for (let i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						assignKey(to, from, symbols[i]);
					}
				}
			}

			return to;
		}

		Object.deepAssign = function(target) {
			target = Object.toObject(target);
			for (let s = 1; s < arguments.length; s++) {
				assign(target, arguments[s]);
			}
			return target;
		}
	})();
}