var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //供货订单列表
        supplyOrders: [],
        //提交物流按钮
        submitButton: false,
        //物流的模态框
        modalLogistic: false,
        redirectUrl:'',
        //订单id(点击弹框时临时存储)
        orderId: null,
        logistics: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        orderState: function (val) {
            if (val == "1") {
                return "待付款";
            }
            if (val == "2") {
                return "待发货";
            }
            if (val == "3") {
                return "待收货";
            }
            if (val == "4") {
                return "已完成";
            }
        },

        orderChainState : function (val) {
            if(val == "1"){
                return "已审核";
            }
            if(val == "-1"){
                return "已驳回"
            }
        }
    },
    methods: {
        //获取当前登录人详细信息
        currentUser: function () {
            vm.redirectUrl = getQueryString("lnk") != "noExistThisParam" ? getQueryString("lnk") + ".html" : "login_zh.html";
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if (vm.user == null || typeof vm.user == undefined) {
                            /*alert("error");*/
                            window.location.href = vm.redirectUrl;
                        }
                        vm.preLoadSupplyOrders();
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
                        window.location.href = vm.redirectUrl;
                    }
                }
            })
        },

        /**
         * 3.取消订单
         */
        cancelOrder: function (item) {
            //参数类型判断
            if (typeof item == "undefined" || typeof item.order_id == "undefined") {
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
                data: {order_id: item.order_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success");
                        vm.preLoadSupplyOrders();
                    }
                }
            })

        },


        /**
         * 2.我的供货列表
         * seller_id
         */
        preLoadSupplyOrders: function (currPage, state) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var data = (typeof state == undefined || state == null) ?
                {"page": currPage + 1, "limit": 10, "user_id": vm.user.user_id} : {
                    "page": currPage + 1,
                    "limit": 10,
                    "user_id": vm.user.user_id,
                    "status": state
                };
            vm.supplyOrders = [];
            $.ajax({
                url: "/order/supplyOrders",
                type: "post",
                data: {"jsonStr": JSON.stringify(data)},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarSup").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadSupplyOrders//回调函数
                            });
                            flag = false;
                        }
                        vm.supplyOrders = r.data.list;
                        console.log("预加载供货订单列表---：" + JSON.stringify(vm.supplyOrders));
                    }
                }
            })
        },


        shipments : function (order) {
            vm.modalLogistic = true;
            vm.orderId = order.order_id;
        },

        /**
         * 确认发货弹窗 - 点击提交
         */
        submitLogistics: function () {
            if (typeof vm.orderId == undefined || vm.orderId == 0) {
                alert("提交失败!");
                return;
            }
            //校验物流公司
            if(vm.logistics.corporation == null || vm.logistics.corporation == "" || vm.logistics.corporation == "undefined"){
                alert("物流公司不能为空!");
                return;
            }
            //校验物流单号
            if(vm.logistics.number == null || vm.logistics.number == "" || vm.logistics.number == "undefined"){
                alert("物流单号不能为空!");
                return;
            }
            //1.隐藏物流弹框
            vm.modalLogistic = false;
            //2.ajax提交更新订单状态和物流信息
            $.ajax({
                url: "/order/update",
                type: "post",
                data: {
                    "order_id": vm.orderId,
                    "transport_corporation": vm.logistics.corporation,
                    "transport_number": vm.logistics.number
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("发货成功!");
                    }else {
                        alert("发货失败!");
                    }
                    window.open("pbm_order_seller1.html", "_self");
                },
                error: function (r) {
                    alert(r.responseText);
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
         * 查看订单详情 (跳转)
         */
        queryOrderDetail: function (order, item) {
            window.open("pe_index_b_ddxq.html?item_id=" + item.item_id + "&com_name=" + order.com_name + "&order_id=" + order.order_id + "&addr_id=" + order.addr_id, "_self");
        }

    }
});
