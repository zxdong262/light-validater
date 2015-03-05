/*!
 * light-validater
 * by ZHAO Xudong
 */

var _ = require('lodash')

module.exports = function(targetObj, _rules) {

	//returned obj
	var res = {
		errCount: 0
		,errs: []
		,errFields: []
		,result: {}
	}
	,rules = _rules

	function check(_rule, _key, _value) {
		var rule = _.isPlainObject(_rule)?_rule:{}
		var value = _value
		var key = _key
		if(rule.ignore) return
		var result = value? {
			minLen: rule.minLen? (value.toString().length >= rule.minLen) : 'ignore'
			,maxLen: rule.maxLen? (value.toString().length <= rule.maxLen) : 'ignore'
			,custom: rule.custom? rule.custom.call({
				rule: rule
				,key: key
				,value: value
			}) : 'ignore'
			,reg: rule.reg? rule.reg.test(value) : 'ignore'
		}: {}
		,shouldCheck =  !rule.optional || (rule.optional && value)
		,pass = result.minLen && result.maxLen && result.custom && result.reg

		if(pass && shouldCheck) res.result[key] = rule.valueFilter?opt.valueFilter.call(value):value
		else if(shouldCheck) {
			res.errCount ++
			res.errFields.push(key)
			res.errs.push(
				(!result.minLen?rule.minLenMsg:'') ||
				(!result.maxLen?rule.maxLenMsg:'') ||
				(!result.reg?rule.regMsg:'') ||
				(!result.custom?rule.customMsg:'') ||
				rule.errMsg
			)
		}
	}
	
	_.each(rules, function(value, key) {

		check(value, key, targetObj[key])

	})

	return res


}

