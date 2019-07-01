var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //搜索框搜索类别
        searchType: 'supplier',
        //输入的商品名称或者供应商
        searchParam: null

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.detail();

            //回车时间触发器
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    vm.redirectSel();
                }
            });
        })
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    /*if (vm.user == null) {
                        window.open("../login_zh.html" , "_self");
                    }*/
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
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },

        /**
         * 首页个人中心 订单页面跳转
         * 根据用户类别
         */
        lnkPersonalCenter: function () {
            if (vm.user == null || typeof vm.user == "undefined") {
                alert("error");
                return;
            }
            //stage1:英文采购商
            if (vm.user.biz_type == 'buyer_en') {
                window.location.href = "order_buyer.html";
            }
            //stage2:英文供应商 - 个人
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "per") {
                window.location.href = "sale_person_info.html";
            }
            //stage3:英文供应商 - 公司
            if (vm.user.biz_type == 'seller_en' && vm.user.user_type == "com") {
                window.location.href = "sale_firm_info.html";
            }
        },

        //导航栏搜索跳转
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
         * 详情
         */
        detail : function () {
            $.ajax({
                url: '/explain/queryObject',
                data: {
                    explain_id: 26
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        $("#digests").html(r.data.digests);
                    }
                }
            })
        }
    }
});
