var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {

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
                        window.open("index.html", "_self");
                    }
                }
            })
        },

        /**
         * 预加载免费监理信息
         */
        preLoadMonitor: function () {
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
        preOpenShop:function () {
            if (vm.user.user_id == null || typeof vm.user.user_id == "undefined"){
                alert("会话过时，请重新登录");
                window.open("index.html","_self");
            }
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id:vm.user.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        //跳转到店铺详情页面
                        alert("跳转到店铺详情");
                        var shop = base64.encode(JSON.stringify(r.data));
                        window.open("shop_detail.html?shop="+shop,"_self");
                    }else if (r.code == 500){
                        //跳转到开店页面
                        window.open("pe_index_open_shop.html","_self");
                    }
                }
            })
        }
    }
});

