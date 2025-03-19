export default {
	// 申请合伙人
	applyPartner(data, options = {}) {
		return uni.$http.post('team.partner/apply', data, options);
	},

	// 获取申请合伙人信息
	getApplyPartnerInfo(data, options = {}) {
		return uni.$http.get('team.partner/getapplyinfo', data, options);
	}
}
