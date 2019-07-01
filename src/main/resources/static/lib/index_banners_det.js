var vm = new Vue({
        el: "#rrapp",
        data: {
            searchParam: null,
            //搜索框搜索类别
            searchType: 'supplier',
            user: {},
            banner: {},

            //购物车总量
            gross: 0,
            carShow: true
        },
        mounted: function () {
            this.$nextTick(function () {
                vm.preloadExpoDetail();
                vm.getCurrentUser();

                vm.quantity();
            })
        },
        methods: {
            /**
             * 2.preload expo detail
             */
            preloadExpoDetail: function () {
                var banner_id = format3(getQueryString("banner_id"));
                if (banner_id == 'noExistThisParam') {
                    alert("error");
                    return;
                }
                $.ajax({
                    url: "/cmsBanner/detail",
                    type: "post",
                    data: {banner_id: banner_id},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            vm.banner = r.data;
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
                    async: false,
                    type: "post",
                    data: {},
                    dataType: "json",
                    success: function (r) {
                        vm.user = r.data;

                        //供应商 隐藏购物车
                        if(vm.user != null){
                            vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
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
            },


            /**
             * 购物车总量
             */
            quantity : function () {
                if(vm.user != null){
                    $.ajax({
                        url: '/cart/quantity',
                        async: false,
                        data: {
                            jsonStr: JSON.stringify({"user_id": vm.user.user_id, "page": 1, limit: "10"})
                        },
                        type: "post",
                        datatype: "json",
                        success : function (r) {
                            if(r.code == 0){
                                vm.gross = r.data;
                            }
                        }
                    })
                }
            }
        }
    })
;

