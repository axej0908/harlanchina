var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {
            user_name: ''
        },
        cargo: {
            cargo_name: '',
            create_time: ''
        },
        spon: {}
    },
    mounted: function (currPage) {
        $(".order_list").html("");
        this.$nextTick(function (currPage) {
            currPage = 0;
            vm.getCurrentUser(currPage);

        })
    },
    methods: {
        //获取用户信息
        getCurrentUser: function (currPage) {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if(r.code == 0){
                        vm.user = r.data;
                        if (vm.user == null) {
                            alert("请重新登录!");
                            window.open("../login.html");
                            return;
                        }
                        console.log("函数内部：" + JSON.stringify(vm.user));
                        vm.list(currPage);
                    }

                }
            });
        },

        //遍历免费找货信息
        list: function (currPage) {
            var sponsor_id = vm.user.user_id.toString();
            $.ajax({
                url: "/freeFindGood/list",
                type: "post",
                data: {"jsonStr": JSON.stringify({"sponsor_id":sponsor_id,"spon_type":'3',"page": currPage+1, "limit": '5'})},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        if (flag) {
                            $("#page_blo").pagination(data.data.totalCount, {
                                items_per_page: 5,
                                num_edge_entries: 1,
                                num_display_entries: 10,
                                callback: vm.list//回调函数
                            });
                            flag = false;
                        }
                        $(".order_list").html("");
                        vm.queryMySearch(data.data);
                    }
                }
            })
        },
        queryMySearch: function (data) {
            var str = "";
            str += "<div class=\'jc_head\'>";
            str += "<div class=\'jc_a\'>";
            str += "找货产品";
            str += "<\/div>";
            str += "<div class=\'jc_b\'>";
            str += "申请时间";
            str += "<\/div>";
            str += "<div class=\'jc_d\'>";
            str += "找货结果";
            str += "<\/div>";
            str += "<div class=\'jc_e\'>";
            str += "操作";
            str += "         <\/div>";
            str += "<div class=\'clear\'>";
            str += "         <\/div>";
            str += "<\/div>";
            for (var i = 0; i < data.list.length; i++) {
                if (data.list[i].spon_type == '3') {
                    var item = data.list[i];
                    for (var j = 0; j < item.cargoBeans.length; j++) {
                        str += "<div class=\'jc_row\'>";
                        str += "    <div class=\'jc_a\'>";
                        str += "        <div class=\'jc_nm\'>";
                        str += data.list[i].cargoBeans[j].cargo_name;
                        str += "        <\/div>";
                        str += "    <\/div>";
                        str += "    <div class=\'jc_b\'>";
                        str += "        <p class=\'dt_time\'>";
                        str += data.list[i].cargoBeans[j].create_time;
                        str += "        <\/p>";
                        str += "        <p class=\'da_day\'>";
                        str += "        <\/p>";
                        str += "    <\/div>";
                        str += "    <div class=\'jc_d\'>";
                        str += a(data.list[i].spon_state);
                        str += "    <\/div>";
                        str += "    <div class=\'jc_e\'>";
                        str += "        <div class=\'jc_btn\' onclick=\'parcelDetail(" + data.list[i].spon_state + "\," + data.list[i].cargoBeans[j].cargo_id + ")\'>";
                        str += "查看";
                        str += "        <\/div>";
                        str += "    <\/div>";
                        str += "<\/div>";
                    }
                }
                $(".jc_list").empty().append(str);
                console.log("函数内部：" + JSON.stringify(vm.cargo));
            }
        },

        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                    }
                }
            })
        }
    }
});


function a(data) {
    /*每个货物的发布状态 a(data.list[i].spon_state)*/
    if (data == 1) {
        return "草稿 未发布";
    }
    if (data == 2 || data == null) {
        return "待受理";
    }
    if (data == 3) {
        return "找货中";
    }
    if (data == 4) {
        return "有结果";
    }
    if (data == 5) {
        return "已取消";
    }

}
function parcelDetail(spon_state, cargo_id) {
    /*my_free_search.html  每个货物查看*/
    if (spon_state == null || spon_state == '1' || spon_state == '2' || spon_state == '3'||spon_state == '4' || spon_state == '5') {
        var a = {
            "cargo_id":cargo_id,
            "spon_state":spon_state
        };
        var base64 = new Base64();
        var b = base64.encode(JSON.stringify(a));
        window.location.href = "/pe_index_h_b.html?b="+b;
    }
    // 有结果和已取消的情况下第一版到生成订单位置
    // 等有供应订单的时候使用
    /*if (spon_state == '4' || spon_state == '5'){
        window.location.href = "/pe_index_h_c.html?cargo_id=" + cargo_id;
    }*/
}
