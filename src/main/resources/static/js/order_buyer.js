var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //1.采购订单列表
        purchaseOrders: [],

        //提交物流按钮
        submitButton: false,
        //订单id(点击弹框时临时存储)
        orderId: null,

        //采购订单按钮是否显示
        applySaleBtn: false,

        //物流的模态框
        modalLogistic:false,

        //取消订单
        obj:{},

        //搜索条件
        order:{}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        orderState: function (val) {
            if (val == "1") {
                return "wait pay";
            }
            if (val == "2") {
                return "wait for deliver";
            }
            if (val == "3") {
                return "wait for receiving";
            }
            if (val == "4") {
                return "completed";
            }
        }
    },
    methods: {
        //获取当前登录人详细信息
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if (vm.user == null || typeof vm.user == undefined) {
                            alert("error");
                            window.open("index.html", "_self");
                        }
                        vm.preLoadOPurchaseOrders(0);
                    }
                }
            })
        },
        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        alert("sign out success!");
                        window.location.href = "login_en.html";
                    }
                }
            })
        },

        /**
         * 2.取消订单
         */
        cancelOrder : function (item) {
            vm.obj = item;
        },

        /**
         * 确认删除订单
         * @param item
         */
        confirm: function () {
            var item = vm.obj;
            //参数类型判断
            if (typeof item == "undefined" || typeof item.order_id == "undefined"){
                alert("error");
            }
            //先判断询盘交易的话,不允许取消订单
            if (item.order_type == 1 || item.order_type == 2) {
                alert("询盘交易不允许取消,需询盘双方线下协商");
                return;
            }
            //1.生成通知消息
            if (item.order_type > 2) {
                alert("商城订单取消需要生成通知消息，修改订单状态");
            }
            //2.取消订单即删除订单
            $.ajax({
                url: "/order/cancel",
                type: "post",
                data: {order_id:item.order_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                        $(".alert_black").hide();
                        $(".alert_cansel_order").hide();
                        vm.preLoadOPurchaseOrders();
                    }
                }
            })

        },

        /**
         * 1.我的采购列表
         * seller_id
         */
        preLoadOPurchaseOrders: function (currPage, state) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var data = (typeof state == "undefined" || state == null) ?
                {"page": currPage + 1, "limit": 10, "buyer_id": vm.user.user_id} : {
                    "page": currPage + 1,
                    "limit": 10,
                    "buyer_id": vm.user.user_id,
                    "status": state
                };
            //存储订单状态
            vm.order.states = state;
            vm.purchaseOrders = [];
            $.ajax({
                url: "/order/purchaseOrders",
                type: "post",
                data: {"jsonStr": JSON.stringify(data)},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarPur").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadSupplyOrders//回调函数
                            });
                            flag = false;
                        }
                        //step1.clear arr
                        vm.purchaseOrders = r.data.list;
                        vm.purchaseOrders.forEach(function (item, index) {
                            // 判断操作按钮是否需要显示
                            if (item.order_state == 2 || item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, 'applySaledBtn', true);
                            }
                            if (item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, "queryLogisBtn", true);
                            }
                        });
                        console.log("预加载采购订单列表---：" + JSON.stringify(vm.purchaseOrders));
                    }
                }
            })
        },

        /**
         * 时间条件搜索
         */
        searchTime : function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            if(vm.order.start == undefined || vm.order.start == null){
                alert("Start time cannot be empty!");
                return;
            }
            if(vm.order.end == undefined || vm.order.end == null){
                alert("The end time cannot be empty!");
                return;
            }
            var data = (typeof state == "undefined" || state == null) ?
                {"page": currPage + 1, "limit": 10, "buyer_id": vm.user.user_id , "start":vm.order.start , "end":vm.order.end} : {
                    "page": currPage + 1,
                    "limit": 10,
                    "buyer_id": vm.user.user_id,
                    "status": vm.order.states,
                    "start":vm.order.start,
                    "end":vm.order.end
                };
            $.ajax({
                url:'/order/queryTimeOrder',
                type:"post",
                data:{"jsonStr": JSON.stringify(data)},
                dataType:"json",
                success : function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarPur").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadSupplyOrders//回调函数
                            });
                            flag = false;
                        }
                        //step1.clear arr
                        vm.purchaseOrders = r.data.list;
                        vm.purchaseOrders.forEach(function (item, index) {
                            // 判断操作按钮是否需要显示
                            if (item.order_state == 2 || item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, 'applySaledBtn', true);
                            }
                            if (item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, "queryLogisBtn", true);
                            }
                        });
                        console.log("预加载采购订单列表---：" + JSON.stringify(vm.purchaseOrders));
                    }
                }
            })
        },

        /**
         * 产品名称条件搜索
         */
        searchName : function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            if(vm.order.goods_name == undefined || vm.order.goods_name == null){
                alert("Keywords cannot be empty!");
                return;
            }
            var data = (typeof state == "undefined" || state == null) ?
                {"page": currPage + 1, "limit": 10, "buyer_id": vm.user.user_id , "goods_name":vm.order.goods_name} : {
                    "page": currPage + 1,
                    "limit": 10,
                    "buyer_id": vm.user.user_id,
                    "status": vm.order.states,
                    "goods_name":vm.order.goods_name
                };
            $.ajax({
                url:'/order/queryNameOrder',
                type:"post",
                data:{"jsonStr": JSON.stringify(data)},
                dataType:"json",
                success : function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarPur").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadSupplyOrders//回调函数
                            });
                            flag = false;
                        }
                        //step1.clear arr
                        vm.purchaseOrders = r.data.list;
                        vm.purchaseOrders.forEach(function (item, index) {
                            // 判断操作按钮是否需要显示
                            if (item.order_state == 2 || item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, 'applySaledBtn', true);
                            }
                            if (item.order_state == 3 || item.order_state == 4) {
                                vm.$set(item, "queryLogisBtn", true);
                            }
                        });
                        console.log("预加载采购订单列表---：" + JSON.stringify(vm.purchaseOrders));
                    }
                }
            })
        },

        /**
         * 关闭物流弹框
         */
        shutdownFrame: function () {
            // $(".alert_wl").hide();
            vm.logisticsFrame = false;
            vm.logistics = {};
        },

        /**
         * ***************************采购订单开始*************************************
         */
        confirmReceipt: function (item) {
            if (typeof item.item_id == "undefined" || typeof item.order_id == "undefined " || typeof item.goods_id == "undefined") {
                alert("unknown error");
                return;
            }
            $.ajax({
                url: "/order/confirmReceipt",
                type: "post",
                dataType: "json",
                data: {
                    "item_id": item.item_id
                },
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                        window.open("pe_index_b.html", "_self")
                    }
                }
            })
        },
        /**
         * 申请售后
         */
        applySales: function (item) {
            var order = base64.encode(JSON.stringify(item));
            window.open("pe_index_b_sqsh.html?order=" + order, "_self")
        },

        /**
         * 查看订单详情 (跳转)
         */
        queryOrderDetail: function (order, item) {
            window.open("pe_index_b_ddxq.html?item_id=" + item.item_id + "&com_name=" + order.com_name + "&order_id=" + order.order_id + "&addr_id=" + order.addr_id, "_self");
        }

    }
});
