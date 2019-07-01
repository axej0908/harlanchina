var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        cargo: {
            cargo_name: '',
            create_time: ''
        },
        spon: {},
        //显示菜单栏控制 1实单竞价 2实单采购 3以货易货 4免费找货
        menuShow:1,
        //发布弹框
        pubShow:false,
        purs:[],
        //临时装载cargo
        cargos:[]
    },
    mounted: function (currPage) {
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
                    if (r.code == 0) {
                        vm.user = r.data;
                        vm.bidList();
                        console.log("函数内部：" + JSON.stringify(vm.user));
                    }
                }
            });
        },
        /*........免费找货..........*/
        list: function (currPage) {
            currPage = 0;
            var sponsor_id = vm.user.user_id.toString();
            $.ajax({
                url: "/freeFindGood/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "sponsor_id": sponsor_id,
                        "spon_type": '3',
                        "spon_state": '1',
                        "page": currPage + 1,
                        "limit": '5'
                    })
                },
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.code == 0) {
                        if (flag) {
                            $("#findPage").pagination(data.data.totalCount, {
                                items_per_page: 5,
                                num_edge_entries: 1,
                                num_display_entries: 10,
                                callback: vm.list//回调函数
                            });
                            flag = false;
                        }
                        $("#find").html("");
                        vm.queryMySearch(data.data);
                    }
                }
            })
        },
        queryMySearch: function (data) {
            var str = "";
            for (var i = 0; i < data.list.length; i++) {
                var item = data.list[i];
                for (var j = 0; j < item.cargoBeans.length; j++) {
                    str += "<div class=\'order_list\'>";
                    str += "    <div class=\'order_item\'>";
                    str += "        <div class=\'order_top\'>";
                    str += "            <div class=\'ddbh\'>";
                    str += "        <span>";
                    str += "找货编号:";
                    str += data.list[i].cargoBeans[j].cargo_id;
                    str += "        <\/span>";
                    str += "        <\/div >";
                    str += "        <\/div >";
                    str += "    <div class=\'order_gd\'>";
                    str += "        <div class=\'gd_list\'>";
                    str += "            <div class=\'gd_item_zh\'>";
                    str += "            <div class=\'gd_nm\'>";
                    str += data.list[i].cargoBeans[j].cargo_name;
                    str += "            <\/div>";
                    str += "<div class=\'gd_del_op\' onclick=\'del(" + data.list[i].spon_id + "\,"+data.list[i].cargoBeans[j].cargo_id+")\'>";
                    str += " 删 除";
                    str += "<\/div>";
                    str += "<div class=\'gd_edit_op\' onclick=\'parcelDetail(" + data.list[i].cargoBeans[j].cargo_id + ")\'>";
                    str += "编 辑";
                    str += "<\/div>";
                    str += "<div class=\'clear\'>";
                    str += "            <\/div>";
                    str += "        <\/div>";
                    str += "    <\/div>";
                    str += "<div class=\'clear\'>";
                    str += "<\/div>";
                    str += "<div class=\'fb\'>";
                    str += "<div class=\'fb_btn\' onclick=\'detailState(" + data.list[i].spon_id + ")\'>";
                    str += "发 布";
                    str += "<\/div>";
                    str += "<\/div>";
                    str += "<div class=\'clear\'>";
                    str += "<\/div>";
                    str += "<\/div>";
                    str += "<\/div>";
                    str += "<\/div>";

                }
                $("#find").empty().append(str);
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
                        window.location.href = "index.html";
                    }
                }
            })
        },

        /**
         * ****************************************实单采购开始
         */
        //查询实单采购草稿箱列表
        queryMyPursDrafts:function (currPage) {
            vm.menuShow = 2;
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url: "/sponsor/list",
                type: "post",
                data: {"jsonStr":JSON.stringify({"sponsor_id":vm.user.user_id,"page":currPage+1,"limit":limit,"spon_type":"2"})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        console.log("实单采购草稿箱列表：" + JSON.stringify(r));
                        vm.purs = r.data.list;
                        if (flag) {
                            $("#pagerBarPur").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadPurList//回调函数
                            });
                            flag = false;
                        }
                    }
                }
            });
        },
        //编辑
        editPur:function (cargo) {
            if (typeof cargo.cargo_id == undefined){
                alert("error");
                return;
            }
            //step1:query cargo detail
            $.ajax({
                url: "/cargo/detail",
                type: "post",
                data: {"cargo_id":cargo.cargo_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var cargo = base64.encode(JSON.stringify(r.data));
                        window.open("c_sdcg_fqcg_b.html?cargo="+cargo,"_self")
                    }
                }
            });
        },
        //删除
        delPur:function (cargo,pur) {
            if (typeof cargo.cargo_id == undefined){
                alert("error");
                return;
            }
            //判断purs数组的长度
            if (vm.purs.length == 1){
                if (typeof pur.spon_id == undefined){
                    alert("error");
                    return;
                }
                $.ajax({
                    url: "/sponsor/delete/"+pur.spon_id,
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            $.ajax({
                                url: "/cargo/delete/"+cargo.cargo_id,
                                type: "post",
                                data: {},
                                dataType: "json",
                                success: function (r) {
                                    if (r.code == 0) {
                                        alert("操作成功!");
                                        vm.queryMyPursDrafts(0);
                                    }
                                }
                            });

                        }
                    }
                });
            }else {
                $.ajax({
                    url: "/cargo/delete/"+cargo.cargo_id,
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            alert("操作成功!");
                            vm.queryMyPursDrafts(0);
                        }
                    }
                });
            }

        },
        //发布
        publishPur:function (spon_id) {
            $.ajax({
                url: "/sponsor/publish",
                type: "post",
                data: {"spon_id":spon_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("发布成功!");
                        vm.queryMyPursDrafts(0);
                    }else {
                        alert("发布失败!");
                    }
                }
            });
        },
        /**
         * ****************************************实单采购结束
         */



        /* --------------------实单竞价开始----------------------*/
        //查询实单竞价草稿箱里的列表
        bidList : function (currPage) {
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url: "/freeFindGood/list",
                type: "post",
                data: {"jsonStr": JSON.stringify({"sponsor_id": vm.user.user_id,"spon_type":"1","spon_state":"1","page":currPage+1,"limit": limit})},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        if(flag) {
                            $("#pageBid").pagination(data.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.bidList//回调函数
                            });
                            flag = false;
                        }
                        $("#bid_list").html("");
                        vm.loadDataBidList(data.data.list);
                    }
                }
            });
        },
        loadDataBidList : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++){
                str += '<div class="order_item">';
                str += '    <div class="order_top">';
                str += '        <div class="ddbh">竞价编号：<span>'+data[i].spon_serl+'</span></div>';
                str += '        <div class="order_del" onclick="delsBid('+data[i].spon_id+',this)"></div>';
                str += '    </div>';
                str += '    <div class="order_gd">';
                for(var j = 0; j < data[i].cargoBeans.length; j++){
                    str += '        <div class="gd_list">';
                    str += '            <div class="gd_item">';
                    str += '                <div class="gd_nm">';
                    str += data[i].cargoBeans[j].cargo_name;
                    str += '                </div>';
                    str += '                <div class="gd_del_op" onclick="delBid('+data[i].cargoBeans[j].cargo_id+',this)">';
                    str += '                    删除';
                    str += '                </div>';
                    str += '                <div class="gd_edit_op" onclick="redact('+data[i].cargoBeans[j].cargo_id+')">编辑</div>';
                    str += '                <div class="clear"></div>';
                    str += '            </div>';
                    str += '        </div>';
                }
                str += '        <div class="clear"></div>';
                str += '        <div class="fb">';
                str += '            <div class="fb_btn" onclick="publish('+data[i].spon_id+',this)">发布</div>';
                str += '        </div>';
                str += '        <div class="clear"></div>';
                str += '    </div>';
                str += '</div>';
            }
            $("#bid_list").empty().append(str);
        }
    }
});

//删除
function del(spon_id,cargo_id) {
    $.ajax({
        url: "/sponsor/delete/" + spon_id ,
        type: "get",
        data: spon_id,
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                dele(cargo_id);
            } else {
                alert("删除失败");
            }
        }
    })
};
function dele(cargo_id) {
    $.ajax({
        url: "/cargo/delete/" + cargo_id ,
        type: "get",
        data:cargo_id ,
        dataType: "json",
        success: function (data) {
            if (data.code == 0) {
                window.location.href = "pe_index_j.html";

            } else {
                alert("删除失败");
            }
        }
    })
};
/*---------------------实单竞价结束---------------------------*/

/*.....免费找货....*/
function parcelDetail(cargo_id) {
    /*  编辑*/
        window.location.href = "/compile.html?cargo_id="+cargo_id ;
};
/*发布*/
function detailState(data) {
    $.ajax({
            url: "/sponsor/publish",
            type: "post",
            data: {"spon_id": data},
            dataType: "json",
            success: function (data) {
                if (data.code == 0) {
                    console.log("data:" + data);
                    alert("发布成功");
                    window.location.href = "pe_index_j.html";
                } else {
                    alert("保存失败................fcnSpon" + "............");
                }
            }
        }
    )

};
/*....免费找货结束...*/

/*---------------------实单竞价开始------------------------*/
//删除草稿箱货物
function delBid(cargo_id,nowaday) {
    $.ajax({
        url:"/cargo/delete/"+cargo_id,
        type:"get",
        data:{},
        dataType:"json",
        success : function (data) {
            if(data.code == 0){
                alert("删除成功");
               /* $(".order_list").on("click",".gd_item .gd_del_op",function(){*/
                    $(nowaday).parents(".gd_item").remove();
                /*})*/
            }else {
                alert("删除失败");
            }
        }
    })
}
//删除草稿箱记录
function delsBid(spon_id,nowadays) {
    //查询出参与记录中所有的货物id
    $.ajax({
        url:"/sponsor/detail",
        type:"post",
        data:{
            "spon_id":spon_id
        },
        dataType:"json",
        success : function (data) {
            if(data.code == 0){
                //临时装载cargo_id
                vm.cargos = data.data.cargoBeans;
                console.log(vm.cargos);
            }
        }
    });
    //删除记录以及记录下的所有货物
    $.ajax({
        url:"/sponsor/delete/"+spon_id,
        type:"get",
        data:{},
        dataType:"json",
        success : function (data) {
            if(data.code == 0){
                alert("删除成功");
                vm.cargos.forEach(function (item,index){
                    $.ajax({
                        url:"/cargo/delete/"+item.cargo_id,
                        type:"get",
                        data:{},
                        dataType:"json",
                        success : function (data) {
                            if(data.code == 0){
                                $(nowadays).parents(".order_item").remove();
                            }else {
                                alert("删除失败");
                            }
                        }
                    })
                })
            }else {
                alert("删除失败");
            }
        }
    })
}
//编辑
function redact(cargo_id) {
    console.log(cargo_id);
    window.location.href = "../b_sdjj_bjjj.html?cargo_id="+cargo_id;
}
//发布
function publish(spon_id,nowadays) {
    $.ajax({
        url:"/sponsor/publish",
        type:"post",
        data:{
            "spon_id":spon_id
        },
        dataType:"json",
        success : function (data) {
            if(data.code == 0){
                alert("发布成功");
                $(nowadays).parents(".order_item").remove();
            }else {
                alert("发布失败");
            }
        }
    })
}
/*-------------------------实单竞价结束----------------------------*/