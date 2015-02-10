# light-validater
a validate lib for nodejs

## install

```bash
npm install light-validater
```

## how to use

```javascript
var validater = require('light-validater')
var rules = {
    n1: {
        minLen: 2
        ,maxLen: 8
        ,reg: /^[0-9a-zA-Z]{1,20}$/
        ,custom: function() {
            /*
            this = {
                key: 'targetObjectKey'
                ,value: 'targetObjectValue'
                ,rule: currentRuleObject
            }
            */
            return /[0-9]/.test(this.value) && /[a-zA-Z]/.test(this.value)
        }
        ,errMsg: 'min len = 2, max len = 8, only digit or English charactor, must have at least one digit and one English character'
        ,regMsg: 'only digit or English character'
        ,minLenMsg: 'min len = 2'
        ,maxLenMsg: 'max len = 8'
        ,customMsg: 'must have at least one digit and one English character'
    }
    ,n2: {
        errMsg: 'min len = 2'
        ,minLen: 2
    }
}

var targetObject = {
    n1: 's4dssdf'
    ,n2: 'fff'
}

var validateResult = validater(targetObject, rules)


assert(validateResult ==
{
    errCount: 0 //error count
    ,errs: []   //error array
    ,errFields: [] //error field array
    ,result: {  //result
        n1: 's4dssdf'
        ,n2: 'fff'
    }
})


```

## changelog

- 0.0.2 add errFields to result

## test

```bash
$ git clone https://github.com/zxdong262/light-validater.git
$ cd light-validater
$ sudo npm install
$ sudo npm install mocha -g
$ mocha --reporter spec
```


