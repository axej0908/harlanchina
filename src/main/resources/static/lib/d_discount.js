var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //限时秒杀商品
        secondKillGoods: [],
        //折扣专区商品(包含化浪自营和三方用户)
        discountGoods: [],
        //搜索框填写内容
        search_name: null
    },
    computed: {
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        dateTime: function (time) {
            if (time == null || typeof time == "undefined"){
                return '';
            }else {
                return new Date(time).toLocaleDateString();
            }
        }
    },
    methods: {
        //获取当前登录人详细信息
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        //预加载现货供应商品接口
                        vm.preLoadSecondKills(0);
                        //预加载现货供应商品分类接口
                        vm.preLoadDiscountGoods(0);
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
                success: function (data) {
                    if (data.code == 0) {
                        alert("sign out success!");
                        window.open("index.html", "_self");
                    }
                }
            })
        },

        /**
         * 商品点击详情-跳转
         */
        linkCargoDetail:function (obj) {
            window.open("g_goods_detail.html?mer_id="+obj.goods_id,"_self");
        },

        /**
         * 预加载限时秒杀商品
         */
        preLoadSecondKills: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var data = {
                "page": currPage + 1,
                "limit": "5",
                //业务参数
                "goods_type": "harlan_seckill",
                "goods_state": "up"
            };
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {"jsonStr":JSON.stringify(data)},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.secondKillGoods = r.data.list;
                    }
                }
            })
        },

        /**
         * 预加载折扣专区商品列表
         * seller_id
         */
        preLoadDiscountGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var data = {
                "page": currPage + 1,
                "limit": limit,
                //业务参数
                "goods_type": "discount",
                "goods_state": "up"
            };
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {"jsonStr": JSON.stringify(data)},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadSpotSupply//回调函数
                            });
                            flag = false;
                        }
                        vm.discountGoods = r.data.list;
                    }
                }
            })
        }
    }
});