var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        goods: {},
        //化合物
        cpd: {},
        //合成路线
        syntheticRoute: [],
        //上游
        upStream: [],
        //下游
        downStream: [],
        //输入的商品名称或者供应商
        searchParam: null,
        shop: {},

        carShow: false

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.goods = JSON.parse(base64.decode(getQueryString("goods")));
            vm.compoundDetails();
            vm.getCurrentUser();
            vm.preLoadShop();
        })
    },
    methods: {
        /**
         * 化合物详情
         */
        compoundDetails : function () {
            $.ajax({
                url:'/compound/detail',
                type:"post",
                data:{
                    goods_id: vm.goods.goods_id
                },
                dataType:"json",
                success : function (r) {
                    if(r.code == 0){
                        //化合物
                        vm.cpd = r.data;
                        //合成路线
                        vm.syntheticRoute = vm.cpd.syntheticRouteBeans;
                        console.log(vm.syntheticRoute);
                        //上游
                        vm.upStream = vm.cpd.upStreams;
                        //下游
                        vm.downStream = vm.cpd.downStreams;
                        //化合物图片
                        $("#cpd_picture").css("background",'url(' + r.data.cpd_picture + ')');
                        //化合物简介
                        if(r.data.cpd_intro != null){
                            var str0 = r.data.cpd_intro + "";
                            $("#cpd_intro").html(str0);
                        }
                        //物化性质
                        if(r.data.property != null){
                            var str1 = r.data.property + "";
                            $("#property").html(str1);
                        }
                        //安全信息
                        if(r.data.safety_data != null){
                            var str2 = r.data.safety_data + "";
                            $("#safety_data").html(str2);
                        }
                        //毒性
                        if(r.data.toxicity != null){
                            var str3 = r.data.toxicity + "";
                            $("#toxicity").html(str3);
                        }
                        //图谱
                        if(r.data.atlas != null){
                            var str4 = r.data.atlas + "";
                            $("#atlas").html(str4);
                        }
                        //msds
                        if(r.data.msds != null){
                            var str5 = r.data.msds + "";
                            $("#msds").html(str5);
                        }
                        //生产方法及用途
                        if(r.data.produce_use != null){
                            var str6 = r.data.produce_use + "";
                            $("#produce_use").html(str6);
                        }
                        //海关数据
                        if(r.data.custom_data != null){
                            var str7 = r.data.custom_data + "";
                            $("#custom_data").html(str7);
                        }
                    }
                }
            })
        },

        getCurrentUser : function () {
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
                        if(vm.user.biz_type == "buyer_en"){
                            vm.carShow = true;
                        }
                    }
                }
            })
        },
        logout : function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        window.open("index.html", "_self");
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
            }else {
                alert("error");
            }
        },

        /**
         * 查询店铺
         */
        preLoadShop: function () {
            $.ajax({
                url: "/shop/detail",
                async: false,
                type: "post",
                data: {user_id: vm.goods.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.shop = r.data;
                    }
                }
            })
        },


        /**
         * 店铺跳转
         * 判断此店铺所有者国内或者国外
         */
        linkToShop: function () {
            if (vm.goods.user_id == null) {
                alert("error");
                return;
            }
            $.ajax({
                url: "/user/detail",
                type: "post",
                data: {user_id: vm.goods.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var user_type = r.result.user_type;
                        //2.根据用户类型判断跳转
                        if (user_type == 'supplierZh') {
                            window.open("shop_detail2.html?shop=" + base64.encode(JSON.stringify(vm.shop)), "_self");
                        } else {
                            window.open("shop_detail2.html?shop=" + base64.encode(JSON.stringify(vm.shop)), "_self");
                        }
                    }
                }
            })
        },
    }
});
