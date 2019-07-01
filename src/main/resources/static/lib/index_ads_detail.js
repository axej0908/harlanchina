var vm = new Vue({
        el: "#rrapp",
        data: {
            searchParam: null,
            //搜索框搜索类别
            searchType: 'supplier',
            user: {},
            expo: {},

            carShow: false
        },
        mounted: function () {
            this.$nextTick(function () {
                vm.preloadExpoDetail();
                vm.getCurrentUser();
            })
        },
        methods: {
            /**
             * 2.preload expo detail
             */
            preloadExpoDetail: function () {
                var expo_id = format3(getQueryString("expo_id"));
                if (expo_id == 'noExistThisParam'){
                    alert("error");
                    return;
                }
                $.ajax({
                    url: "/expo/detail",
                    type: "post",
                    data: {expo_id: expo_id},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            vm.expo = r.data;
                        } else {
                            alert("error");
                        }
                    }
                })
            },

            //1.导航栏搜索跳转
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

            getCurrentUser: function () {
                $.ajax({
                    url: "/log/currentUser",
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (r) {
                        vm.user = r.data;

                        //供应商 隐藏购物车
                        if(vm.user != null){
                            if(vm.user.biz_type == "buyer_en"){
                                vm.carShow = true;
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
                            window.open("login_en.html", "_self");
                        }
                    }
                })
            }
        }
    })
;

