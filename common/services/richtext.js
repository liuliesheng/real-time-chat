const $ = uni;

$.$define('parseHtmlImgs', function(nodes) {
	nodes.forEach(node => {
		if (node.name === 'img' && node.attrs && node.attrs['data-img-size-val']) {
			const sizes = node.attrs['data-img-size-val'].split(',');
			const width = uni.upx2px(720 * 0.9);
			const height = parseInt(width * (sizes[1] / sizes[0]));
			node.attrs.style = `width:${width};height:${height};`;
		}
		if (Array.isArray(node.children)) {
			parseImgs(node.children);
		}
	});
	return nodes;
});