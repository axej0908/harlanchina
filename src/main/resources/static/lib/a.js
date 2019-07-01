new Vue({
    el: '#app',
    methods: {
        pulldownRefresh : function () {
            setTimeout(function() {
                addData();
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
                mui.toast("为你推荐了5篇文章");
            }, 1500);
        },

        listdataLoading : function(){
            var str = '';
            for(var i = 0; i < 5; i++){
                str += '<a href="">';
                str += '    <li>';
                str += '        <img src="imgs/fy.png"/>';
                str += '        <div class="fy_one">';
                str += '            <p>金环里 1室1厅  诚意出售</p>';
                str += '            <p>50m²/西南/金华里</p>';
                str += '            <p>100万</p>';
                str += '        </div>';
                str += '    </li>';
                str += '</a>';
            }

        }
    }
})
for(var i in fileElementId){
    var oldElement = jQuery('#' + fileElementId[i]);
    var newElement = jQuery(oldElement).clone();
    jQuery(oldElement).attr('id', fileId);
    jQuery(oldElement).before(newElement);
    jQuery(oldElement).appendTo(form);
}
$(function() {
    mui("#pullrefresh").on('tap', 'li', function (event) {
        this.click();
    });
})

countdown: function () {
    const end = Date.parse(new Date('2017-12-01'))
    const now = Date.parse(new Date())
    const msec = end - now
    let day = parseInt(msec / 1000 / 60 / 60 / 24)
    let hr = parseInt(msec / 1000 / 60 / 60 % 24)
    let min = parseInt(msec / 1000 / 60 % 60)
    let sec = parseInt(msec / 1000 % 60)
    this.day = day
    this.hr = hr > 9 ? hr : '0' + hr
    this.min = min > 9 ? min : '0' + min
    this.sec = sec > 9 ? sec : '0' + sec
    const that = this
    setTimeout(function () {
        that.countdown()
    }, 1000)
}
