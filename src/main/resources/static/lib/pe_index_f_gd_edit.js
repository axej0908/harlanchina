var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //页面跳转需要接收的参数(商品详情)
        goods: {},
        //预加载一级分类数组
        oneTypeMenus: [],
        //运输方式静态数据
        transport_opts: [
            {text: "海"},
            {text: "陆"},
            {text: "空"}
        ],
        /**
         * 动态选项卡 start
         */
        colorLights: [""],
        colorPowers: [""],
        packageWays: [""]
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    computed: {
        selection: function () {
            if (vm.oneTypeMenus == [] || typeof vm.oneTypeMenus == "undefined") {
                return;
            }
            for (var i = 0; i < vm.oneTypeMenus.length; i++) {
                if (vm.goods.one_type == vm.oneTypeMenus[i].text)
                    return vm.oneTypeMenus[i].list;
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
                    } else {
                        vm.preLoadOneCategory();
                        vm.goods = JSON.parse(base64.decode(getQueryString("goods")));
                        //初始化下拉框以及多选
                        if (vm.goods.color_light != null) {
                            vm.colorLights = vm.goods.color_light.split(",");
                        }
                        if (vm.goods.color_power != null) {
                            vm.colorPowers = vm.goods.color_power.split(",");
                        }
                        if (vm.goods.package_opt != null) {
                            vm.packageWays = vm.goods.package_opt.split(",");
                        }
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
         * 确认修改商品
         * @param currPage
         */
        updateGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            vm.goods.color_power = vm.colorPowers.toString();
            vm.goods.color_light = vm.colorLights.toString();
            vm.goods.package_opt = vm.packageWays.toString();
            delete vm.goods.shopBean;
            $.ajax({
                url: "/goodsMall/update",
                type: "post",
                data: vm.goods,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        window.open("pe_index_f_zh.html", "_self");
                    }
                }
            })
        },

        /**
         * 预加载商品一级分类
         */
        preLoadOneCategory: function () {
            $.ajax({
                url: "/category/recursion",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.oneTypeMenus = r.data;
                    }
                }
            })
        },

        /**
         * 色光添加按钮
         */
        addColorLight: function () {
            vm.colorLights.push("");
        },
        /**
         * 色力添加按钮(强度)
         */
        addColorPower: function () {
            vm.colorPowers.push("");
        },
        /**
         * 包装方式动态添加按钮
         */
        addPackageWays: function () {
            vm.packageWays.push("");
        }
    }
});