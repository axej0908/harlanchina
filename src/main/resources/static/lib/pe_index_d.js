var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //我参与的采购列表
        prtps: [],
        //我发起的采购列表
        publs: [],
        leftView:true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    
    filters:{
        firmOrderState:function (val) {
            if (val == "3"){ return"采购中";}
            if (val == "4"){ return"已中标";}
            if (val == "5"){ return"已完成";}
        }
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        alert("请重新登录!");
                        window.open("index.html","_self");
                        return;
                    }
                    //如果当前用户存在，则查询此用户参与的采购记录
                    vm.queryMyInvoke();
                }
            })
        },
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                        window.open("index.html","_self");
                    }
                }
            })
        },
        //我参与的采购列表 -
        queryMyInvoke: function (currPage) {
            vm.leftView = true;
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url: "/pur/myInvoke",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "buyer_id": vm.user.user_id,
                        "page": 1,
                        "limit": 100,
                        "prtp_state": 1,
                        "prtp_type":2
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var arr = r.data.list;
                        if (flag) {
                            $("#pagerBarP").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadPurList//回调函数
                            });
                            flag = false;
                        }
                        console.log("原返回的数组对象："+JSON.stringify(arr));
                        //遍历去空数组对象
                        for (var i = 0; i < arr.length; i++) {
                            console.log("111111"+JSON.stringify(arr[i]));
                            if (typeof arr[i] == "undefined" || arr[i] == null) {
                                arr.splice(i, 1);
                                i = i - 1;
                            }
                        }
                        vm.prtps = arr;
                        console.log("我参与的采购列表返回数据---：" + JSON.stringify(vm.prtps));
                    }
                }
            })
        },
        //我发起的采购列表 -
        queryMyPublish: function (currPage) {
            vm.leftView = false;
            if(!$.isNumeric(currPage)){
                currPage = 0;
            }
            $.ajax({
                url: "/pur/myPublish",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "sponsor_id": vm.user.user_id,
                        "page": 1,
                        "limit": 10,
                        "spon_type": 2,
                        //查询全部状态
                        "spon_state": 1,
                        "domestic":1
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var arr = r.data.list;
                        if (flag) {
                            $("#pagerBarS").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadPurList//回调函数
                            });
                            flag = false;
                        }
                        console.log("原返回的数组对象："+JSON.stringify(arr));
                        //遍历去空数组对象
                        for (var i = 0; i < arr.length; i++) {
                            console.log("111111"+JSON.stringify(arr[i]));
                            if (typeof arr[i] == "undefined" || arr[i] == null) {
                                arr.splice(i, 1);
                                i = i - 1;
                            }
                        }
                        vm.publs = arr;
                        console.log("我参与的采购列表返回数据---：" + JSON.stringify(vm.publs));
                    }
                }
            })
        },
        //记录(包含记录项)详情
        detailMul: function (item) {
            if (typeof item.prtp_id == "undefined") {
                alert(item.prtp_id + "删除地址信息id不存在");
                return;
            }
            var base = new Base64();
            var spon = base.encode(JSON.stringify(item));
            window.open("pe_index_d_cyxq_a.html?spon="+spon,"_self");
        },
        //我发起的采购 - 记录s
        detailPublishMul:function (item) {
            if (typeof item.spon_id == "undefined"){
                alert("查询订单id不存在"+item.spon_id);
                return;
            }
            var base = new Base64();
            var spon = base.encode(JSON.stringify(item));
            window.open("pe_index_d_fqxq_a.html?spon="+spon,"_self");
        },
        //添加或者修改
        saveOrUpdate: function () {
            vm.addr.province = $(".city-picker-selector").find(".province a").html();
            vm.addr.city = $(".city-picker-selector").find(".city a").html();
            vm.addr.area = $(".city-picker-selector").find(".district a").html();
            if (typeof vm.user.user_id == "undefined" || vm.user.user == 0) {
                alert("登录过时");
                window.open("index.html","_self");
                return;
            }
            vm.addr.user_id = vm.user.user_id;
            console.log("save update的地址参数：" + JSON.stringify(vm.addr));
            $.ajax({
                url: typeof vm.addr.addr_id == "undefined" ? "/address/save" : "/address/update",
                type: "post",
                data: vm.addr,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.addr = {};
                    }
                }
            })
        },
        //记录项详情 - 我参与的
        detailInvokeItem: function (item) {
            var base64 = new Base64();
            var cargo = base64.encode(JSON.stringify(item));
            window.open("pe_index_d_cyxq_b.html?cargo="+cargo,"_self");
        },
        //发起项详情 - 我发起的
        detailPublishItem:function (item) {
            var base64 = new Base64();
            var cargo = base64.encode(JSON.stringify(item));
            window.open("pe_index_d_fqxq_b.html?cargo="+cargo,"_self");
        }
    }
});