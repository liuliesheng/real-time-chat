export default function middleware(handles = []) {
	const dispatch = function(func, params, context = null) {
		let index = 0;
		const next = function() {
			if (index >= handles.length) {
				return func.call(context, params);
			}

			let handle = handles[index++];
			let handleParams = [next, params];
			let handleName = 'anonymous@' + new Date().getTime();
			if (typeof handle === 'object') {
				if (handle.params) handleParams.push(handle.params);
				if (handle.name) handleName = handle.name;
				handle = handle.handle;
			}
			if (typeof handle !== 'function') throw new Error(`${handle}不是一个function`);

			console.group(handleName);
			const result = handle.apply(context, handleParams);
			console.groupEnd();
			return result;
		};
		return next(params);
	};
	dispatch.imports = function(imports) {
		handles = imports;
		return dispatch;
	};
	dispatch.add = function(handle) {
		handles.push(handle);
		return dispatch;
	};
	dispatch.remove = function(handle) {
		handles.remove(handle);
		return dispatch;
	};
	dispatch.bindObjectFunction = function(funcName, obj) {
		const oldFunc = context[funcName];
		return context[funcName] = function() {
			return m(oldFunc, arguments[0], context);
		};
	};
	return dispatch;
}
