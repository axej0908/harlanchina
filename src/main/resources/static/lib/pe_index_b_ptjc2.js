var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        check: {},
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier'
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {},
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
                        if (order_id != "noExistThisParam") {
                            vm.preLoadCheckInfo(order_id);
                        }
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
         * 2.preload check info for free
         */
        preLoadCheckInfo: function (order_id) {
            $.ajax({
                url: "/orderCheck/detail",
                type: "post",
                data: {"order_id": order_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.check = r.data;
                    }
                }
            })
        }
    }
});
