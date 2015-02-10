
var assert = require('assert')
var validater = require('..')


describe('validater', function() {
	it('validate regxp', function() {
		var rules = {
			n1: {
				reg: /[0-9]/
				,errMsg: 'digit only'
			}
			,n2: {
				reg: /[0-9]/
				,errMsg: 'digit only'
			}
		}
		var tar = {
			n1: 'sdf'
			,n2: 345435
		}
		var res = validater(tar, rules)
		assert(res.errCount === 1 && res.result.n2 === 345435 && res.errFields[0] === 'n1')
	})

	it('validate custom function', function() {
		var rules = {
			n1: {
				custom: function() {
					return this.value == 98
				}
				,errMsg: 'not equls 98'
			}
			,n2: {
				custom: function() {
					return this.value == 98
				}
				,errMsg: 'not equls 98'
			}
		}
		var tar = {
			n1: 98
			,n2: 345435
		}
		var res = validater(tar, rules)
		assert(res.errCount === 1 && res.result.n1 === 98)
	})

	it('validate length', function() {
		var rules = {
			n1: {
				minLen: 2
				,errMsg: 'min length = 2'
			}
			,n2: {
				maxLen: 5
				,errMsg: 'max length = 5'
			}
			,n11: {
				minLen: 2
				,errMsg: 'min length = 2'
			}
			,n21: {
				maxLen: 5
				,errMsg: 'max length = 5'
			}
			,n22: {
				maxLen: 5
				,errMsg: 'max length = 5'
			}
		}
		var tar = {
			n1: 's'
			,n2: 3454357
			,n11: 's4'
			,n21: 34543
			,n22: { length: 4 }
		}
		var res = validater(tar, rules)
		assert(res.errCount === 3 && res.result.n21 === 34543 && res.result.n11 === 's4')
	})

	it('validate combination', function() {
		var ru = {
			minLen: 2
			,maxLen: 8
			,reg: /^[0-9a-zA-Z]{1,20}$/
			,custom: function() {
				return /[0-9]/.test(this.value) && /[a-zA-Z]/.test(this.value)
			}
			,errMsg: 'min len = 2, max len = 8, only digit or English charactor, must have at least one digit and one English character'
			,regMsg: 'only digit or English character'
			,minLenMsg: 'min len = 2'
			,maxLenMsg: 'max len = 8'
			,customMsg: 'must have at least one digit and one English character'
		}
		var rules = {
			n1: ru
			,n2: ru
			,n3: ru
			,n4: ru
			,n5: ru
			,n6: ru
		}
		var tar = {
			n1: 's'
			,n2: 3454357678678
			,n3: 's4dssdf'
			,n4: 34543
			,n5: 'as3242343234234234'
			,n6: 'as324_'
		}
		var res = validater(tar, rules)
		assert(res.errCount === 5 && res.result.n3 === 's4dssdf')
	})

	//end
})

