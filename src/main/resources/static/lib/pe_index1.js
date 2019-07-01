var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},

        //最新商品推荐
        guessYourLikes: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {
        /**
         * 从规格里获取 单价单位
         */
        getUnit: function (val) {
            if (val == '' || typeof val == "undefined") {
                return val;
            } else {
                return val.split("/")[1];
            }
        }
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;

                    vm.preLoadGuessYouLike();
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
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },

        /**
         * 跳转个人资料
         */
        lnkInfo: function () {
            if (typeof vm.user == "undefined"){
                window.location.href = "login_zh.html";
            }
            if (vm.user.user_type == "per"){
                window.location.href  = "sale_person_info1.html"
            }else if (vm.user.user_type == "com"){
                window.location.href  = "sale_firm_info1.html"
            }else {
                alert("error");
                return;
            }
        },

        /**
         * 商品最新报价
         */
        preLoadGuessYouLike: function () {
            $.ajax({
                url: "/Merchandise/guessYouLike",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        user_id: vm.user.user_id,
                        page: 1,
                        limit: 100
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.guessYourLikes = r.data;
                    }
                }
            })
        },

        /**
         * 我要开店
         * step1:查找是否已经开店
         * step2:已开,跳转到店铺详情页面；反之，跳转到新开店铺填写页面
         */
        preOpenShop: function () {
            if (vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("please sign in again");
                window.open("login_en.html", "_self");
            }
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: vm.user.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        //跳转到店铺详情页面
                        var shop = base64.encode(JSON.stringify(r.data));
                        window.open("shop_detail2.html?shop=" + shop, "_self");
                    } else if (r.code == 500) {
                        //跳转到开店页面
                        window.open("pe_index_open_shop2.html", "_self");
                    }
                }
            })
        }
    }
});

