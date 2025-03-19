export default function middleware(handles = []) {
	const dispatch = function(func, params, context = null) {
		let index = 0;
		const next = function() {
			if (index >= handles.length) {
				return func.call(context, params);
			}

			let handleParams = [next, params];
			let handleName = 'anonymous@' + new Date().getTime();
			let handleFunc = null;

			const handle = handles[index++];
			if (typeof handle === 'object') {
				if (handle.params) {
					handleParams.push(handle.params);
				}

				if (handle.name) {
					handleName = handle.name;
				}

				handle.context = context;
				handleFunc = handle.handle;
			} else if (typeof handle !== 'function') {
				handleFunc = handle;
				handleFunc.context = context;
			} else {
				throw new Error(`${handle}不是一个function`);
			}

			console.group(handleName);
			const result = handleFunc.apply(handle, handleParams);
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
	return dispatch;
}
