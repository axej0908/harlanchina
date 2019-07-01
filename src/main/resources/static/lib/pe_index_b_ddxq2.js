var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        address: {},
        seller: {},
        order: {},
        //免费监理的物流信息
        watcher: {},
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier'
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {
        formatStatus: function (val) {
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
        },

        formatStatus1: function (val) {
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

        /**
         * 1.截取日期
         */
        subPrefix: function (val) {
            if (typeof val == "undefined") {
                return val;
            } else {
                return val.split(" ")[0];
            }
        },

        /**
         * 2.截取时间
         */
        subSuffix: function (val) {
            if (typeof val == "undefined") {
                return val;
            } else {
                return val.split(" ")[1];
            }
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
                        alert("please sign in again");
                        window.open("login_en.html", "_self");
                        return;
                    } else {
                        //订单id
                        var order_id = getQueryString("order_id");
                        vm.preLoadOrderDetail(order_id);
                    }
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
                        window.open("login.html", "_self");
                    }
                }
            })
        },

        //3.导航栏搜索跳转
        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },

        /**
         * 2.preload consignee address info
         */
        preLoadAddress: function () {
            $.ajax({
                url: "/address/detail",
                type: "post",
                data: {"addr_id": vm.order.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.address = r.data;
                    }
                }
            })
        },

        /**
         * 3.preload 订单详情
         */
        preLoadOrderDetail: function (order_id) {
            $.ajax({
                url: "/order/detail",
                type: "post",
                data: {"order_id": order_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.order = r.data;
                        //1.加载地址
                        if (vm.order != null && typeof vm.order.addr_id != "undefined") {
                            vm.preLoadAddress();
                        }
                        //2.加载卖家信息
                        if (vm.order != null && typeof vm.order.user_id != "undefined") {
                            vm.preLoadSellerInfo();
                        }
                        //3.加载免费监理物流单号以及 数组信息
                        if (vm.order != null && typeof vm.order.supv_id != "undefined") {
                            vm.preLoadFreeWatch();
                        }
                    }
                }
            })
        },

        /**
         * 4.preload 卖家信息
         */
        preLoadSellerInfo: function () {
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {"user_id": vm.order.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.seller = r.data;
                    }
                }
            })
        },


        /**
         * 5.查询免费监理信息(包含物流信息)
         */
        preLoadFreeWatch: function () {
            $.ajax({
                url: "/freeSupervision/detail",
                type: "post",
                data: {"supv_id": vm.order.supv_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.watcher = r.data;
                    }
                }
            })
        }


    }
});
