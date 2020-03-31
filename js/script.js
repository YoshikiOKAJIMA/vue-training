new Vue({
    el: '#app',
    data: {
        output: '0',
        nextBtn: "次の問題へ",
        qNumList: [99999, 99999, 99999],
        message: '',
        count: 0,
        countCorrect: 0,
        result: false,
        btnActive: true,
        qList: []
    },
    methods: {
        pressKey: function (value) {
            this.output += value
        },
        //解答の正誤判定+解答ボタンの不活化
        judgeCorrect: function (c) {
            if (this.btnActive) {
                if (c) {
                    this.message = '正解!!!'
                    this.countCorrect++
                } else {
                    this.message = '不正解...'
                }
                this.btnActive = false
            }

        },
        //次の問題へボタンの挙動
        goNext: function () {
            this.count++
            this.message = ''
            this.btnActive = true
            //全問終了後はresultへボタンに
            if (this.count === 2) {
                this.nextBtn = "resultへ"
            } else if (this.count > 2) {
                this.result = true
            }

        }
    },
    created: function () {
        axios.get('data/quiz.json').then(function (response) {
            //取得完了したらqListリストに代入
            this.qList = response.data
        })

        //出題する問題を3つ、ランダムに決定
        for (var i = 0; i < this.qNumList.length; i++) {
            var a = Math.floor(Math.random() * this.qList.length)
            //問題の重複回避
            if (this.qNumList.includes(a)) {
                i -= 1
            } else {
                this.qNumList[i] = a
            }

        }
    }

})
