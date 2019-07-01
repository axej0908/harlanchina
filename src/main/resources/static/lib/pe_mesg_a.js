var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        sysMsgs: [],

        //最新商品推荐
        guessYourLikes: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.preLoadSysMsgs();
        })
    },
    filters:{
        /**
         * 从规格里获取 单价单位
         */
        getUnit:function (val) {
            if (val =='' || typeof val == "undefined"){
                return val;
            }else {
                return val.split("/")[1];
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
                        alert("请重新登录!");
                        window.open("index.html", "_self");
                        return;
                    }else {
                        vm.preLoadGuessYouLike();
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
                        window.open("index.html", "_self");
                    }
                }
            })
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

        //预加载系统消息列表
        preLoadSysMsgs: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/msg/sys/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": 1,
                        "limit": 10,
                        "domestic":"1"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarP").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadPurList//回调函数
                            });
                            flag = false;
                        }
                        vm.sysMsgs = r.data.list;
                        console.log("预加载系统消息列表---：" + JSON.stringify(vm.sysMsgs));
                    }
                }
            })
        }
    }
});