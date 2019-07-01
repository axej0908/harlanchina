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
                        vm.myParticipant();
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
        //我参与的竞价
        myParticipant : function (currPage) {
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url:"/bid/myInvoke",
                type:"post",
                data:{"jsonStr": JSON.stringify({"page": currPage+1, "limit": limit, "prtp_type": "1" , "prtp_state":"1" , "seller_id":vm.user.user_id})},
                dataType:"json",
                success:function (data) {
                    if (data.code == 0){
                        if(flag) {
                            $("#participant_page").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.myParticipant//回调函数
                            });
                            flag = false;
                        }
                        $(".order_list").html("");
                        vm.loadDataParticipant(data.data.list);
                    }
                }
            })
        },
        //我参与的竞价
        loadDataParticipant : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++) {
                str += '<div class="order_item">';
                str += '	<p class="order_number">订单编号：<span id="serial_number">';
                str += data[i].spon_serl;
                str += '</span></p>';
                str += '	<div class="item_tal">';
                str += '		<div class="row_head">';
                str += '			<div class="tal_a">需求产品</div>';
                str += '			<div class="tal_b">数量</div>';
                str += '			<div class="tal_c">纯度</div>';
                str += '			<div class="tal_d">竞标人数</div>';
                str += '			<div class="tal_e">状态</div>';
                str += '			<div class="tal_f"> <div class="all_detail" onclick="allDetails('+data[i].spon_id+')">详情</div></div>';
                str += '		</div>';
                for(var j = 0; j < data[i].participationBeans.length; j++) {
                    str += '		<div class="row">';
                    str += '			<div class="tal_a">';
                    str += empty(data[i].participationBeans[j].cargo_name);
                    str += '            </div>';
                    str += '			<div class="tal_b">';
                    str += data[i].participationBeans[j].cargo_num;
                    str += '            </div>';
                    str += '			<div class="tal_c">';
                    str += empty(data[i].participationBeans[j].cargo_purity);
                    str += '            </div>';
                    str += '			<div class="tal_d">';
                    str += empty(data[i].participationBeans[j].prtp_num);
                    str += '            </div>';
                    str += '			<div class="tal_e">';
                    str += state(data[i].participationBeans[j].cargo_state);
                    str += '            </div>';
                    str += '			<div class="tal_f"><div class="detail_btn" onclick="details('+data[i].participationBeans[j].cargo_id+')">详情</div></div>';
                    str += '		</div>';
                }
                str += '	</div>';
                str += '</div>';
            }
            $(".order_list").empty().append(str);
        },


        //我发起的竞价
        mySponsor : function (currPage) {
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url:"/sponsor/list",
                type:"post",
                data:{"jsonStr": JSON.stringify({"page": currPage + 1, "limit": limit, "spon_type": "1" , "spon_state":"3" , "sponsor_id":vm.user.user_id})},
                dataType:"json",
                success:function (data) {
                    if (data.code == 0){
                        if(flag) {
                            $("#sponsor_page").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.mySponsor//回调函数
                            });
                            flag = false;
                        }
                        $(".fq_order_list").html("");
                        vm.loadDataSponsor(data.data.list);
                    }
                }
            })
        },
        loadDataSponsor : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++){
                str += '<div class=\"fq_order_item\">';
                str += '    <p class=\"fq_order_number\">订单编号：<span>';
                str += data[i].spon_serl;
                str += '<\/span><\/p>';
                str += '    <div class=\"fq_item_tal\">';
                str += '        <div class=\"fq_row_head\">';
                str += '            <div class=\"fq_tal_a\">需求产品<\/div>';
                str += '            <div class=\"fq_tal_b\">数量<\/div>';
                str += '            <div class=\"fq_tal_c\">纯度<\/div>';
                str += '            <div class=\"fq_tal_d\">竞标人数<\/div>';
                str += '            <div class=\"fq_tal_e\">状态<\/div>';
                str += '            <div class=\"fq_tal_f\">';
                str += '                <div class=\"fq_all_detail\" onclick=\"views('+data[i].spon_id+');\">查看<\/div>';
                str += '            <\/div>';
                str += '            <div class=\"fq_tal_g\">';
                str += '                <div class=\"fq_yjjj_btn\" onclick="oneKey('+data[i].spon_id+')">一键竞价者<\/div>';
                str += '            </div>';
                str += '        <\/div>';

                for(var j = 0; j < data[i].cargoBeans.length; j++){

                    str += '        <div class=\"fq_row\">';
                    str += '            <div class=\"fq_tal_a\">';
                    str += empty(data[i].cargoBeans[j].cargo_name);
                    str += '            <\/div>';
                    str += '            <div class=\"fq_tal_b\">';
                    str += empty(data[i].cargoBeans[j].cargo_num);
                    str += '<\/div>';
                    str += '            <div class=\"fq_tal_c\">';
                    str += empty(data[i].cargoBeans[j].cargo_purity);
                    str += '            <\/div>';
                    str += '            <div class=\"fq_tal_d\">';
                    str += empty(data[i].cargoBeans[j].prtp_num) + '人';
                    str += '            <\/div>';
                    str += '            <div class="fq_tal_e">';
                    str += state(data[i].cargoBeans[j].cargo_state);
                    str += '            <\/div>';
                    str += '            <div class=\"fq_tal_f\">';
                    str += '                <div class=\"fq_detail_btn\" onclick=\"view_details('+data[i].cargoBeans[j].cargo_id+');\">查看<\/div>';
                    str += '            <\/div>';
                    str += '            <div class="fq_tal_g">';
                    str += '                <div class=\"fq_jjzxq_btn\" onclick="bid_details('+data[i].cargoBeans[j].cargo_id+')">竞价者详情<\/div>';
                    str += '            <\/div>';
                    str += '        <\/div>';
                }
                str += '    <\/div>';
                str += '<\/div>';
            }
            $(".fq_order_list").empty().append(str);
        }
    }
});
//判断是否为空
function empty(val){
    if(val == null || val == ""){
        return "";
    }else{
        return val;
    }
}
//状态
function state(val) {
    if(val == null || val == ""){
        return "";
    }
    if(val == "1"){
        return "草稿箱";
    }
    if(val == "2"){
        return "已发布";
    }
    if(val == "3"){
        return "竞价中";
    }
    if(val == "4"){
        return "已中标";
    }
    if(val == "5"){
        return "已完成";
    }
}
/* ------------我发起的竞价----------- */
//查看
function views(spon_id){
    window.location.href = "../pe_index_c_fqxq_a.html?spon_id="+spon_id;
}
//查看详情
function view_details(cargo_id) {
    window.location.href = "../pe_index_c_fqxq_b.html?cargo_id="+cargo_id;
}
//一键竞价
function oneKey(spon_id) {
    window.location.href = "../pe_index_c_fqxq_a.html?spon_id="+spon_id;
}
//竞价者详情
function bid_details(cargo_id) {
    window.location.href = "../pe_index_c_fqxq_b.html?cargo_id="+cargo_id;
}


/* -----------我参与的竞价------------ */
//产品详情
function details(cargo_id){
    console.log(cargo_id);
    window.location.href = "../pe_index_c_cyxq_b.html?cargo_id="+cargo_id;
}
//订单详情
function allDetails(spon_id) {

    window.location.href = "../pe_index_c_cyxq_a.html?spon_id="+spon_id;
}
