var vm = new Vue({
    el: "#rrapp",
    data: {
        ue:null,
        user:{},
        news:{},
        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.ue = UE.getEditor('editor',{
                autoHeightEnabled: false
            });
            UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;
            UE.Editor.prototype.getActionUrl = function(action) {
                if (action == 'uploadimage' || action == 'uploadscrawl') {
                    //*************return actual operation of file upload********
                    return '/file/ueUpload';
                } else {
                    return this._bkGetActionUrl.call(this, action);
                }
            };
            vm.getCurrentUser();

            vm.quantity();

            var news_id = getQueryString("news_id");
            vm.preLoadNewsDetail(news_id);
        })
    },
    methods: {
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

        /**
         * 1.query detail of news
         */
        preLoadNewsDetail: function (news_id) {
            $.ajax({
                url: "/newsFlash/detail",
                type: "post",
                data: {"news_id": news_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.news = r.data;
                        // vm.ue.setContent(vm.news.news_content);
                    } else {
                        alert(r.msg);
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