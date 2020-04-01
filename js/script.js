new Vue({
    el: '#app',
    data: {
        nextBtn: "次の問題へ",
        qNumList: [9, 8, 7],
        message: '',
        count: 0,
        countCorrect: 0,
        result: false,
        btnActive: true,
        qList: [
            {
                id: 1,
                question: "abcde",
                option: [{
                        index: 1,
                        sentence: "aaaaa",
                        correct: true
                },
                    {
                        index: 2,
                        sentence: "bbbbb",
                        correct: false
                },
                    {
                        index: 3,
                        sentence: "ccccc",
                        correct: false
                }]
            },
            {
                id: 2,
                question: "fghij",
                option: [{
                        index: 1,
                        sentence: "ddddd",
                        correct: false
                },
                    {
                        index: 2,
                        sentence: "eeeee",
                        correct: false
                },
                    {
                        index: 3,
                        sentence: "fffff",
                        correct: true
                }]
            },
            {
                id: 3,
                question: "klmno",
                option: [{
                        index: 1,
                        sentence: "ggggg",
                        correct: true
                },
                    {
                        index: 2,
                        sentence: "hhhhh",
                        correct: false
                },
                    {
                        index: 3,
                        sentence: "iiiii",
                        correct: false
                }]
            }

    ],
        loop: 0,
        title: 'QUIZ GAME'
    },
    methods: {
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
        //追加の出題データ※機能しない！原因不明。
        axios.get('quiz.json').then(function (response) {
            //取得完了したらqListリストに代入
            this.qList.push(response.data);
            console.log(this.qList.length)
        }.bind(this)).catch(function (e) {
            console.error(e)
        })

        //出題する問題を3つ、ランダムに決定
        var a = 0;
        for (var i = 0; i < this.qNumList.length; i++) {
            a = Math.floor(Math.random() * this.qList.length)
            this.loop++
            if (this.loop > 30) {
                this.qNumList = [0, 1, 2]
                break;
                //問題の重複回避
            } else if (this.qNumList.includes(a)) {
                i--
            } else {
                this.qNumList[i] = a
            }

        }


    }

})
