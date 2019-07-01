var flag = true;
var limit = 10;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //现货供应列表
        goods: [],
        //搜索框填写内容
        search_name: null,
        //静态分类数据
        oneTypes: [],
        twoTypes: [],
        //选中之后一级二级名称 纯度 货期
        oneTypeName: '',
        twoTypeName: '',
        cargo_purity: '',
        cargo_deliver: '',
        //二级隐藏显示
        IsShowTwoType: false,

        //静态数据纯度
        purities: [
            {text: "全部", checked: true},
            {text: "98%", checked: false},
            {text: "97%", checked: false},
            {text: "96%", checked: false},
            {text: "95%", checked: false},
            {text: "94%", checked: false}
        ],
        //货期静态数据
        delivers: [
            {text: "全部", checked: true},
            {text: "5天", checked: false},
            {text: "7天", checked: false},
            {text: "10天", checked: false},
            {text: "15天", checked: false},
            {text: "20天", checked: false},
            {text: "25天", checked: false}
        ]

    },
    computed: {
        /*   selection: function () {
               for(var i =0;i<oneTypes.length;i++){
                   // select v-model = A ;if oneTypes[i].text = A; return vm.oneTypes[i].twoTypes;

               }
           }*/
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
        })
    },
    filters: {
        orderState: function (val) {
            if (val == "1") {
                return "待付款";
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
                        vm.preLoadSpotSupply(0);
                        //预加载现货供应商品分类接口
                        vm.preLoadOneCategory();
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
         * 一级菜单点击事件
         */
        selectOneType: function (obj) {
            //上传参数处理
            if (obj.text != "全部") {
                vm.oneTypeName = obj.text;
            }
            //li选中效果样式展示
            vm.oneTypes.forEach(function (item, index) {
                if (obj.text == item.text) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            if (obj.text == "全部") {
                //如果一级分类是全部，二级div隐藏
                vm.IsShowTwoType = false;
            } else {
                vm.IsShowTwoType = true;
                if (typeof obj.cata_id == "undefined") {
                    alert("异常错误!");
                }
                //根据一级点击id查询
                $.ajax({
                    url: "/category/subList",
                    type: "post",
                    data: {"parent_id": obj.cata_id},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            vm.twoTypes = r.data;
                        }
                    }
                })
            }
            //加载现货列表
            vm.preLoadSpotSupply(0);
        },

        /**
         * 二级菜单点击事件
         */
        selectTwoType: function (obj) {
            //上传参数处理
            if (obj.text != "全部") {
                vm.twoTypeName = obj.text;
            }
            //二级样式改变
            vm.twoTypes.forEach(function (item, index) {
                if (obj.text == item.text) {
                    //设置选中 二级分类样式为选中
                    item.checked = true;
                } else {
                    //设置所有其他的二级分类 样式未选中
                    item.checked = false;
                }
            });
            //加载现货列表
            vm.preLoadSpotSupply(0);
        },

        /**
         * 选中纯度点击事件
         */
        selectPurity: function (obj) {
            if (obj.text != "全部") {
                vm.cargo_purity = obj.text;
            }
            //改变选中效果的样式
            vm.purities.forEach(function (item, index) {
                if (item.text == obj.text) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //加载现货列表
            vm.preLoadSpotSupply(0);
        },

        /**
         * 选中货期点击事件
         */
        selectDeliver: function (obj) {
            if (obj.text != "全部") {
                vm.cargo_deliver = obj.text;
            }
            //改变选中的样式
            vm.delivers.forEach(function (item, index) {
                if (obj.text == item.text) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //加载现货列表
            vm.preLoadSpotSupply(0);
        },

        /**
         * 预加载商品一级分类
         */
        preLoadOneCategory: function () {
            $.ajax({
                url: "/category/oneTypes",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.oneTypes = r.data;
                    }
                }
            })
        },

        /**
         * 预加载现货供应商品列表
         * seller_id
         */
        preLoadSpotSupply: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            var data = {
                "page": currPage + 1,
                "limit": limit,
                "goods_type": "merchants_normal",
                "goods_state": "up",
                //业务参数sup
                "one_type": vm.oneTypeName,
                "two_type": vm.twoTypeName,
                "goods_purity": vm.cargo_purity,
                "goods_deliver": vm.cargo_deliver,
                "goods_name": vm.search_name
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
                        vm.goods = r.data.list;
                        console.log("预加载现货供应商品列表---：" + JSON.stringify(vm.goods));
                    }
                }
            })
        },

        /**
         * 点击查询商品详情
         * @param item
         */
        queryCargoDetail: function (item) {
            var mer_id = item.goods_id;
            window.open("g_goods_detail.html?mer_id="+mer_id,"_self")
        }
    }
});