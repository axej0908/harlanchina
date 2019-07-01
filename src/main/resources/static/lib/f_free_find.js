var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        goods: {deliver_units:"day",num_units:"kg",price_units:"dollar"},
        searchType: 'product',
        searchParam: null,
        //价格快递
        priceNews: [],

        //购物车总量
        gross: 0,
        carShow: false
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.quantity();
        })
    },
    methods: {
        //获取当前登录人详细信息
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        vm.user = data.data;

                        //供应商 隐藏购物车
                        if(vm.user != null){
                            if(vm.user.biz_type == "buyer_en"){
                                vm.carShow = true;
                            }
                        }

                        //价格快递
                        vm.preLoadPriceNews();
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
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                        window.open("login_en.html", "_self");
                    }
                }
            })
        },


        /**
         * 20.my harlan link 首页个人中心 订单页面跳转
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


        //3.查询价格快递 列表
        preLoadPriceNews: function () {
            $.ajax({
                url: "/price/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: 1,
                        limit: 100
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.priceNews = r.data.list;
                    }
                }
            })
        },
        //2.导航栏搜索跳转
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
        //1.询盘
        enquiry: function () {
            if (vm.user == null) {
                alert("please sign in first");
                window.open("login_en.html", "_self");
                return;
            }
            if (vm.goods.goods_name == null || typeof vm.goods.goods_name == "undefined") {
                alert("please complete info product name");
                return;
            }
            if(vm.goods.goods_deliver == null || vm.goods.goods_deliver == "undefined"){
                alert("please complete info delivery");
                return;
            }
            if(vm.goods.deliver_units == null || vm.goods.deliver_units == "undefined"){
                alert("please complete info deliver_units");
                return;
            }
            if(vm.goods.goods_num == null || vm.goods.goods_num == "undefined"){
                alert("please complete info quantity");
                return;
            }
            if(vm.goods.num_units == null || vm.goods.num_units == "undefined"){
                alert("please complete info num_units");
                return;
            }
            if(vm.goods.package_opt == null || vm.goods.package_opt == "undefined"){
                alert("please complete info packing");
                return;
            }
            if(vm.goods.goods_purity == null || vm.goods.goods_purity == "undefined"){
                alert("please complete info purity");
                return;
            }
            if(vm.goods.current_price == null || vm.goods.current_price == "undefined"){
                alert("please complete info price");
                return;
            }
            if(vm.goods.price_units == null || vm.goods.price_units == "undefined"){
                alert("please complete info price_units");
                return;
            }
            if(vm.goods.transport_opt == null || vm.goods.transport_opt == "undefined"){
                alert("please complete info transportation");
                return;
            }
            if(vm.goods.payment_opt == null || vm.goods.payment_opt == "undefined"){
                alert("please complete info payment request");
                return;
            }
            vm.goods.user_id = vm.user.user_id;
            vm.goods.goods_type = "enquiry";
            console.log(vm.goods);
            $.ajax({
                url: "/goodsMall/saveTheEnquiries",
                type: "post",
                data: vm.goods,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.goods = {};
                        alert("Congratulation ! successful inquiry!");
                        //成功后 返回对应个人中心
                        //中国供应商
                        if(vm.user.biz_type=='seller_zh'){
                            window.location.href = 'pbm_order_seller1.html';
                        }
                        //国际采购商
                        if(vm.user.biz_type=='buyer_en'){
                            window.location.href = 'order_buyer.html';
                        }
                        if(vm.user.biz_type=='seller_en'){
                            window.location.href = 'sale_firm_info.html';
                        }
                    }else {
                        alert("fail");
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
});