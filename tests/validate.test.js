import Validate from '../bootstrap/validate';

//实例化模式，一般用于表单提交前的验证
(function () {
	console.log('实例化模式 - 测试');

	//验证规则，格式：字段名:[验证规则1,[带参数验证规则,参数]...]
	const rules = {
		'title': ['require', ['len', '3,48'], 'chsDash'],
		'name': ['require', ['len', '2,24'], 'alphaDash'],
		'age': ['require', ['egt', 18], ['elt', 32]]
	};

	//提示信息
	const messages = {
		'title.len': '标题文字长度请输入3-48个字符之间'
	};

	//字段对应的中文名称
	const fields = {
		'title': '标题',
		'name': '名称',
		'age': '年龄'
	};

	//实例化验证类
	const validate = new Validate(rules, messages, fields);

	//要验证的数据
	const data = {
		title: '你好',
		name: 'helloworld',
		age: '45'
	};

	//检查数据
	if (validate.check(data)) {
		console.log('validate success!');
	} else {
		console.error('validate fail:', validate.getError());
	}

	console.log('-----------------------------------------------');
})();

//静态方法
(function () {
	console.log('静态方法 - 测试');

	console.log('必须存在：', Validate.is(undefined, 'require'));
	console.log('只允许字母：', Validate.is('abcd', 'alpha'));
	console.log('只允许字母和数字：', Validate.is('abcd124', 'alphaNum'));
	console.log('只允许字母、数字和下划线 破折号：', Validate.is('abcd124--', 'alphaDash'));
	console.log('只允许汉字：', Validate.is('abcd124', 'chs'));
	console.log('只允许汉字、字母：', Validate.is('abcd124', 'chsAlpha'));
	console.log('只允许汉字、字母和数字：', Validate.is('abcd124', 'chsAlphaNum'));
	console.log('只允许汉字、字母、数字和下划线_及破折号-：', Validate.is('abcd124', 'chsAlphaNum'));
	console.log('是否为邮箱地址：', Validate.is('110@.com', 'email'));
	console.log('验证是否为11位手机号：', Validate.is('13673679989', 'mobile'));
	console.log('验证是否为座机电话：', Validate.is('0371-4569-225', 'tel'));
	console.log('是否为IP地址：', Validate.is('127.0.0.1', 'ip'));
	console.log('是否为一个URL地址：', Validate.is('127.0.0.1', 'url'));
	console.log('是否为float：', Validate.is('127.0.0.1', 'float'));
	console.log('是否是数字：', Validate.is('48.56', 'number'));
	console.log('是否为整型：', Validate.is('48.56', 'integer'));
	console.log('是否为布尔值：', Validate.is('false', 'boolean'));
	console.log('是否为数组：', Validate.is([], 'array'));
})();


