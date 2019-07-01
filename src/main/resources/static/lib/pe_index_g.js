var flag = true;
var limit = 10;
var vm = new Vue({
    el:"#rrapp",
    data:{
        user:{}
    },
    mounted: function() {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    methods:{
        //获取当前登录人详细信息
        currentUser : function(){
            $.ajax({
                url:"/log/currentUser",
                type:"post",
                data:{},
                dataType:"json",
                success:function(data){
                    if(data.code == 0){
                        vm.user = data.data;
                        vm.list();
                    }
                    if(data.data.user_id === 0){
                        $(".land_u").hide();
                        $(".enter_div").show();
                    }else{
                        $(".enter_div").hide();
                        $(".land_u").show();
                        vm.list();
                    }
                }
            })
        },
        //退出
        logout : function () {
            $.ajax({
                url:"/log/logout",
                type:"post",
                data:{},
                dataType:"json",
                success:function (data) {
                    if (data.code == 0){
                        alert("sign out success!");
                        window.location.href = "../login.html";
                    }
                }
            })
        },
        list : function(currPage){
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url:"/detection/list",
                type:"post",
                data:{"jsonStr": JSON.stringify({"user_id":vm.user.user_id,"page":currPage+1,"limit":limit})},
                dataType:"json",
                success:function(data){
                    if(data.code == 0){
                        if(flag) {
                            $(".page").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.list//回调函数
                            });
                            flag = false;
                        }
                        $(".order_list").html("");
                        vm.loadDataList(data.data.list);
                    }
                }
            })
        },
        loadDataList : function(data){
            var str = "";
            for(var i = 0; i < data.length; i++){
                str += '<div class="jc_a">';
                str += '	<div class="jc_pic" style="background-image: url(imgs/goos/g2.png);"></div>';
                str += '	<div class="jc_nm">';
                str += data[i].de_name;
                str += '	</div>';
                str += '</div>';
                str += '<div class="jc_b">';
                /*str += '	<p class="dt_time">14:14:56</p>';
                str += '	<p class="da_day">2017-10-14</p>';*/
                str += data[i].submit_time;
                str += '</div>';
                str += '<div class="jc_c">'+price(data[i].total_fee)+'</div>';
                str += '<div class="jc_d">'+state(data[i].de_state)+'</div>';
                str += '<div class="jc_e"><div class="jc_btn"><a href="pe_index_g_sfjczt.html">查看</a></div></div>';
                str += '<div class="clear"></div>';
            }
            $(".jc_row").empty().append(str);
        }
    }
});
//判断价钱是否为空
function price(val) {
    if(val == null || val == undefined){
        return "";
    }
}
//检测状态
function state(val){
    if(val == null || val == undefined){
        return "";
    }
    if(val == "1"){
        return "待受理";
    }
    if(val == "2"){
        return "检测中";
    }
    if(val == "3"){
        return "已测完";
    }
}