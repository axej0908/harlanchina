var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',

        com_name: '',
        order_id: '',
        item_id: '',
        addr_id: '',

        flag3:false,
        flag4:false,

        //订单详情
        orderItem: {},
        address: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {
        formatStatus: function (val) {
            if (val < 3) {
                return 'in transit';
            } else if (val == 4) {
                return 'done';
            }else if (val == 5){
                return 'after sales';
            }else {
                return 'error';
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
                        //display direct
                        vm.com_name = getQueryString("com_name");
                        vm.order_id = getQueryString("order_id");
                        //methods of pre
                        vm.item_id = getQueryString("item_id");
                        vm.addr_id = getQueryString("addr_id");
                        vm.preLoadAddress();
                        vm.preLoadOrderItem();
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
                data: {"addr_id": vm.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.address = r.data;
                    }
                }
            })
        },

        /**
         * 3.preload 订单项
         */
        preLoadOrderItem: function () {
            $.ajax({
                url: "/orderItem/detail",
                type: "post",
                data: {"item_id": vm.item_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.orderItem = r.data;
                        if (vm.orderItem.item_status ==3){
                            vm.flag3 = true;
                        }else if (vm.orderItem.item_status > 3){
                            vm.flag3 = true;
                            vm.flag4 = true;
                        }
                    }
                }
            })
        }
    }
});
