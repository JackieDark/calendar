/**
 * Created by zhanglongyu on 2017/3/22.
 */
(function () {
    window.calender = {
        /*
         fetchYear: '',
         fetchMonth: '',
         fetchDay: '',
         */
        time: {},
        init: function (id, ipt) {
            var cal = $(id);
            cal.empty();
            var _this = this;
            _this.showMask(cal);
            //取消长按复制
            /* cal.on('touchstart',function () {
             return false;
             });*/
            cal.css({
                width: '100%',
                background: '#fff',
                position: 'fixed',
                color: '#383838',
                display: 'block',
                zIndex: 12,
                bottom: '-5rem'
            }).animate({
                bottom: 0
            }, 300);
            var header = $(document.createElement('div'));
            header.css({
                width: '100%',
                height: '12%'
            }).on('touchstart', function () {
                return false;
            });
            var year = $(document.createElement('div')),
                month = $(document.createElement('div'));

            var yearNum = 2017;
            var monthCh = ['　', '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                monthNum = 4;

            var yspanL = $(document.createElement('span')),
                yspanR = $(document.createElement('span')),
                yspan = $(document.createElement('span'));
            yspan.css({'color': '#666', 'position': 'relative', 'bottom': '0.05rem'}).text('　' + yearNum + '　');
            //刷新日期
            var timeryL, timeryR, timermL, timermR;
            yspanL.css({
                fontSize: '0.6rem',
                color: '#3a83d7'
            }).html('&lt;').on('touchstart', function () {
                timeryL = setInterval(function () {
                    yearNum--;
                    yspan.text('　' + yearNum + '　');
                    main.empty();
                    _this.createDay(cal, main, yearNum, monthNum, ipt);
                }, 100);
            }).on('touchend', function () {
                clearInterval(timeryL);
            });
            yspanR.css({
                fontSize: '0.6rem',
                color: '#3a83d7'
            }).html('&gt;').on('touchstart', function () {
                timeryR = setInterval(function () {
                    yearNum++;
                    yspan.text('　' + yearNum + '　');
                    main.empty();
                    _this.createDay(cal, main, yearNum, monthNum, ipt);
                }, 100);
            }).on('touchend', function () {
                clearInterval(timeryR);
            });
            var mspanL = $(document.createElement('span')),
                mspanR = $(document.createElement('span')),
                mspan = $(document.createElement('span'));
            mspanL.css({
                fontSize: '0.6rem',
                color: '#3a83d7'
            }).html('&lt;').on('touchstart', function () {
                timermL = setInterval(function () {
                    monthNum--;
                    if (monthNum <= 1) {
                        monthNum = 1;
                    }
                    mspan.text('　' + monthCh[monthNum] + '　');
                    main.empty();
                    _this.createDay(cal, main, yearNum, monthNum, ipt);
                }, 100);
            }).on('touchend', function () {
                clearInterval(timermL);
            });
            mspanR.css({
                fontSize: '0.6rem',
                color: '#3a83d7'
            }).html('&gt;').on('touchstart', function () {
                //长按处理
                timermR = setInterval(function () {
                    monthNum++;
                    if (monthNum >= 12) {
                        monthNum = 12;
                    }
                    mspan.text('　' + monthCh[monthNum] + '　');
                    main.empty();
                    _this.createDay(cal, main, yearNum, monthNum, ipt);
                }, 100);
            }).on('touchend', function () {
                clearInterval(timermR);
            });
            mspan.css({'color': '#666', 'position': 'relative', 'bottom': '0.05rem'}).text('　' + monthCh[4] + '　');

            year.css({
                width: '50%',
                float: 'left',
                textAlign: 'center',
                fontSize: '0.36rem',
                padding: '0.2rem 0'
            }).append(yspanL, yspan, yspanR);

            month.css({
                width: '50%',
                float: 'right',
                textAlign: 'center',
                fontSize: '0.36rem',
                padding: '0.2rem 0'
            }).append(mspanL, mspan, mspanR);

            header.append(year, month);
            var week = $(document.createElement('ul'));
            week.css({
                width: '100%',
                fontSize: '0.32rem',
                color: '#3a83d7',
            });
            for (var i = 0; i < 7; i++) {
                var li = $(document.createElement('li'));
                var day = '';
                switch (i) {
                    case 0:
                        day = '日';
                        break;
                    case 1:
                        day = '一';
                        break;
                    case 2:
                        day = '二';
                        break;
                    case 3:
                        day = '三';
                        break;
                    case 4:
                        day = '四';
                        break;
                    case 5:
                        day = '五';
                        break;
                    case 6:
                        day = '六';
                        break;
                }
                li.text(day).css({
                    width: '14.2%',
                    float: 'left',
                    textAlign: 'center'
                });
                week.append(li);
            }
            var main = $(document.createElement('div'));
            main.css({
                marginTop: '1rem',
                clear: 'both',
                width: '100%',
                height: '5.2rem',
                borderTop: '1.5px #3a83d7 solid'
            });
            //创建天

            _this.createDay(cal, main, yearNum, monthNum, ipt);


            cal.append(header, week, main);
        },
        showMask: function (cal) {
            var _this = this;
            var mask = $(document.createElement('div'));
            mask.addClass('mask');
            mask.css({
                position: 'fixed',
                top: '0',
                zIndex: 10,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.3)'
            });
            $('body').append(mask);
            mask.on('click', function () {
                _this.hideMask(cal);
            });
        },
        hideMask: function (cal) {
            $('.mask').css('display', 'none');
            cal.animate({
                bottom: '-7rem'
            }, 200);
        },
        createDay: function (cal, main, yearNum, monthNum, ipt) {
            //alert(new Date('2009/10/28').getDay());
            var _this = this;
            //创建数组，存放相应日期到周几
            var sundayArr = [],
                mondayArr = [],
                tuesdayArr = [],
                wednesdayArr = [],
                thursdayArr = [],
                fridayArr = [],
                saturdayArr = [];

            var dayNum;//根据年和月具体给值
            if (/1|3|5|7|8|10|12/.test(monthNum)) {
                dayNum = 31;
            } else if (monthNum == 2) {
                if (/([0-9]{2})(0[48]|[2468][048]|[13579][26])/.test(yearNum) || /(0[48]|[2468][048]|[3579][26])00/.test(yearNum)) {
                    dayNum = 29;
                } else {
                    dayNum = 28;
                }
            }
            else {
                dayNum = 30;
            }

            for (var w = 1; w <= dayNum; w++) {
                //假设年份和月份
                var when = new Date(yearNum + '/' + monthNum + '/' + w).getDay();
                switch (when) {
                    case 0 :
                        sundayArr.push(w);
                        break;
                    case 1 :
                        mondayArr.push(w);
                        break;
                    case 2 :
                        tuesdayArr.push(w);
                        break;
                    case 3 :
                        wednesdayArr.push(w);
                        break;
                    case 4 :
                        thursdayArr.push(w);
                        break;
                    case 5 :
                        fridayArr.push(w);
                        break;
                    case 6 :
                        saturdayArr.push(w);
                        break;
                }
            }
            //创建星期ul
            for (var i = 0; i < 7; i++) {
                var ul = $(document.createElement('ul'));
                ul.addClass('day' + i).css({
                    width: '14%',
                    height: '100%',
                    float: 'left',
                    fontSize: '0.3rem',
                    color: '#666',
                    textAlign: 'center'
                });
                switch (i) {
                    case 0 :
                        //在对应星期中添加日期
                        addLi(cal, sundayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 1 :
                        addLi(cal, mondayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 2 :
                        addLi(cal, tuesdayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 3 :
                        addLi(cal, wednesdayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 4 :
                        addLi(cal, thursdayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 5 :
                        addLi(cal, fridayArr, yearNum, monthNum, ul, ipt);
                        break;
                    case 6 :
                        addLi(cal, saturdayArr, yearNum, monthNum, ul, ipt);
                        break;
                }
                main.append(ul);
            }

            function addLi(cal, when, yearNum, monthNum, ul, ipt) {
                //取每个星期数组的第一个与周六比较
                if (when[0] > saturdayArr[0]) {
                    when.unshift('　');
                }

                for (var j = 0; j < when.length; j++) {
                    var wLi = $(document.createElement('li'));
                    wLi.text(when[j]).css({
                        lineHeight: '0.8rem'
                    }).on('click', function (event) {
                        $(this).css({
                            background: '#3a83d7',
                            color: '#fff'
                        });
                        _this.hideMask(cal);
                        _this.fetchTime(yearNum, monthNum, event.target.innerText, ipt);
                    });
                    ul.append(wLi);
                }
            }
        },
        fetchTime: function (year, month, day, ipt) {
            //返回所选日期
            $(ipt).val(year + '-' + month + '-' + day);
        }
    };
})();