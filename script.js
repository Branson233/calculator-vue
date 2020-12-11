new Vue({
    el:'#app',
    data:{
        equation:'0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false
    },
    methods:{   
         // Check if the character is + / - / × / ÷
        isOperator(character) {
          return ['+', '-', '×', '÷'].indexOf(character) > -1
        },
        // When pressed Operators or Numbers
        append(character) {
            //开始输入第一个字符
            //如果显示为0并且第一个按下的不是运算符，则是有效输入，可以显示
            if (this.equation === '0' && !this.isOperator(character)) {
                //如果第一次按下的是小数点，就保留0，显示0.  否则显示输入的数字，覆盖原来的0
                if (character=== '.'){
                    this.equation += ''+character
                    this.isDecimalAdded=true
                }else{
                    this.equation = ''+character //这里的空字符是为了把character自动转化为字符串类型
                }
                this.isStarted=true
                return
            }
            //输入后续的数字
            if (!this.isOperator(character)){
                if (character=== '.' && this.isDecimalAdded){
                    return
                }
                if (character=== '.'){
                    this.isDecimalAdded=true
                    this.isOperatorAdded=true    //表示输入小数点后不能直接输入运算符
                }else{
                    this.isOperatorAdded=false   //表示可以输入运算符
                }
                this.equation+=''+character
            }

            //输入运算符时候
            if (this.isOperator(character) && !this.isOperatorAdded){
                this.equation+=''+character
                this.isDecimalAdded=false
                this.isOperatorAdded=true
            }

          
        },
        // When pressed '='
        calculate() {
            if (!this.isOperatorAdded){
                let result = this.equation.replace(new RegExp('×', 'g'), '*').replace(new RegExp('÷', 'g'), '/')
      
                this.equation = parseFloat(eval(result).toFixed(9)).toString()
                this.isDecimalAdded = false
                this.isOperatorAdded = false
            }
        
        },
        // When pressed '+/-'
        calculateToggle() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }
              
            this.calculate()
            this.equation = ''+ this.equation*-1
        },
        // When pressed '%'
        calculatePercentage() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }
            this.calculate()
            this.equation = '' + this.equation * 0.01
          
        },




        // 按下AC复位
        clear() {
            this.equation = '0'
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false
          }
    }
})