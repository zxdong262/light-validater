/*!
 * light-validater
 * by ZHAO Xudong
 */

var _ = require('lodash')

module.exports = function(targetObj, rules) {

	//returned obj
	var res = {
		errCount: 0
		,errs: []
		,errFields: []
		,result: {}
	}
	_.each(rules, function(value, key) {

		check(value, key, targetObj[key])

	})

	return res

	function check(rule, key, value) {
		rule = _.isPlainObject(rule)?rule:{}
		var result = {
			minLen: rule.minLen? (value.toString().length >= rule.minLen) : 'ignore'
			,maxLen: rule.maxLen? (value.toString().length <= rule.maxLen) : 'ignore'
			,custom: rule.custom? rule.custom.call({
				rule: rule
				,key: key
				,value: value
			}) : 'ignore'
			,reg: rule.reg? rule.reg.test(value) : 'ignore'
		}
		,shouldCheck =  !rule.ignore && ((rule.optional && value) || !rule.optional) 
		,pass = (result.minLen && result.maxLen && result.custom && result.reg) || !shouldCheck
		if(pass) res.result[key] = rule.valueFilter?opt.valueFilter.call(value):value
		else {
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
}

