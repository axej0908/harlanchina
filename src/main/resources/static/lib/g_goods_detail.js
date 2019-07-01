var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //展示商品详情的实体类
        goods: {
            goods_num: 1
        },

        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',

        //购物车
        cart: {},

        /**
         * 动态选项卡 start
         */
        order: {},
        colorLights: [],
        colorPowers: [],
        packageWays: [],

        shop: {},

        //商品详情询盘
        enquiry: {},

        //跳转页面的参数 保存容器
        param: null,
        //login box
        logBoxShow: false,
        //登录框user 填写信息
        logBoxUser: {
            user_type: 'purchaserEn'
        },
        logBoxTip: "",

        //购物车总量
        gross: 0,
        carShow: true,

        //显示、隐藏询盘
        inquiryShow: true,
        buyShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            var goods_id = format3(getQueryString("goods_id"));
            vm.preLoadGoodsDetail(goods_id);
            vm.getCurrentUser();
            //购物车总量
            vm.quantity();
        })
    },
    methods: {
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

        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    /**
                     * 供应商无法显示购物车
                     * 无法购买商品
                     */
                    if(r.data != null){

                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
                        vm.user.biz_type == "buyer_en" ? vm.buyShow = true : vm.buyShow = false;
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
                        alert("success!");
                        window.open("index.html", "_self");
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

        /**
         * 1.submit enquiry
         */
        submitEnquiry: function () {
            //pre check1: user_id
            if (vm.user == null) {
                alert(WARN_LOGIN);
                window.open("login_en.html", "_self");
                return;
            } else {
                vm.enquiry.buyer_id = vm.user.user_id;
            }
            //pre check2: goods_id
            if (vm.goods == null || vm.goods.goods_id == "undefined") {
                alert("unknown error");
                return;
            } else {
                vm.enquiry.goods_id = vm.goods.goods_id;
                $.ajax({
                    url: "/tarEnquiry/save",
                    type: "post",
                    data: vm.enquiry,
                    dataType: "json",
                    success: function (r) {
                        //reset submit data
                        vm.enquiriy = {};
                        //render mask
                        $(".opacity").hide();
                        $(".mask").hide();
                        if (r.code == 0) {
                            alert("success");
                        } else {
                            alert("failure");
                        }
                    }
                })
            }

        },

        //根据商品id查询商品详情
        preLoadGoodsDetail: function (goods_id) {
            $.ajax({
                url: "/goodsMall/detail",
                type: "post",
                data: {"goods_id": goods_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.goods = r.data;
                        document.title = r.data.goods_name+'- Harlan mall';
                        /**
                         * 仅第三方商品显示询盘
                         */
                        vm.goods.goods_type == "others_normal" ? vm.inquiryShow = true : vm.inquiryShow = false;

                        vm.goods.goods_num = 1;
                        //1.preload shop detail of this goods
                        if (vm.goods.user_id != null) {
                            vm.preLoadShop();
                        }
                        //动态选项卡
                        var arr = vm.goods.color_light.split(",");
                        arr.forEach(function (item) {
                            var obj = {text: "", checked: false};
                            obj.text = item;
                            vm.colorLights.push(obj);
                        });

                        vm.goods.color_power.split(",").forEach(function (item) {
                            var obj1 = {text: "", checked: false};
                            obj1.text = item;
                            vm.colorPowers.push(obj1);
                        });

                        vm.goods.package_opt.split(",").forEach(function (t) {
                            var obj2 = {text: "", checked: false};
                            obj2.text = t;
                            vm.packageWays.push(obj2);
                        });
                    }
                }
            })
        },

        //2.查询店铺
        preLoadShop: function () {
            $.ajax({
                url: "/shop/detail",
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

        //3.店铺跳转
        //1.判断此店铺所有者国内或者国外
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


        /**
         * 点击需要购买的商品的数量
         */
        changeGoodsNum: function (flag) {
            if (flag > 0) {
                vm.goods.goods_num++;
            } else {
                if (vm.goods.goods_num != 1) {
                    vm.goods.goods_num--;
                }
            }
        },

        /**
         * 商品属性色力点击 css效果
         */
        selColorPower: function (obj) {
            vm.colorPowers.forEach(function (item, index) {
                if (obj.text == item.text && item.checked == false) {
                    item.checked = true;
                    vm.goods.color_power = item.text;
                } else {
                    item.checked = false;
                }
            })
        },
        /**
         * 商品属性色光点击 css效果
         */
        selColorLight: function (obj) {
            vm.colorLights.forEach(function (item, index) {
                if (obj.text == item.text && item.checked == false) {
                    item.checked = true;
                    vm.goods.color_light = item.text;
                } else {
                    item.checked = false;
                }
            })
        },
        /**
         * 商品属性包装点击 css效果
         */
        selPackageWays: function (obj) {
            vm.packageWays.forEach(function (item, index) {
                if (obj.text == item.text && item.checked == false) {
                    item.checked = true;
                    vm.goods.package_opt = item.text;
                } else {
                    item.checked = false;
                }
            })
        },


        /**
         * 加入购物车
         */
        saveInCart: function () {
            if (vm.user == null) {
                alert("please sign on again");
                vm.logBoxShow = true;
                /*window.open("login_en.html", "_self");*/
            }else if (vm.user.biz_type != 'buyer_en') {
                return;
            }
            //step5.1 订单参数()
            vm.cart.goods_name = vm.goods.goods_name;
            vm.cart.goods_num = vm.goods.goods_num;
            vm.cart.goods_id = vm.goods.goods_id;
            vm.cart.goods_price = vm.goods.current_price;
            vm.cart.user_id = vm.user.user_id;
            vm.cart.color_power = vm.goods.color_power;
            vm.cart.color_light = vm.goods.color_light;
            vm.cart.package_opt = vm.goods.package_opt;
            //step5.2 保存到购物车
            $.ajax({
                url: "/cart/save",
                type: "post",
                data: vm.cart,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        // alert("操作成功!");
                        //跳转到我的购物车页面
                        window.open("shop_cart_en.html", "_self");
                    }
                }
            })
        },
        /**
         * 立即购买
         */
        buyAtOnce: function () {
            //编码所选产品详情
            vm.param = base64.encode(JSON.stringify(vm.goods));
            //con1:用户尚未登录
            if (vm.user == null) {
                vm.logBoxShow = true;
            } else {
                //产品详情跳转
                window.location.href = "count_price_cash.html?goods=" + vm.param +
                    "&user_id" + vm.goods.user_id + "&totalCount=" + vm.goods.goods_num + "&totalPrice=" + vm.goods.goods_num * vm.goods.current_price + "&source=detail";
            }
            if (vm.user.biz_type != 'buyer_en') {
                return;
            }
        },

        /**
         * login商品详情登录
         */
        login: function () {
            if (vm.logBoxUser.user_phone == null || vm.logBoxUser.user_phone == "") {
                alert("null username");
                return false;
            }
            if (vm.logBoxUser.user_password == null || vm.logBoxUser.user_password == "") {
                alert("null password");
                return false;
            }
            $.ajax({
                type: 'post',
                url: '/log/login',
                data: {
                    "user_phone": vm.logBoxUser.user_phone,
                    "user_password": vm.logBoxUser.user_password,
                    "user_type": vm.logBoxUser.user_type
                },
                dataType: 'json',
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        if(vm.user.biz_type == "buyer_en"){
                            window.open("count_price_cash.html?goods=" + vm.param, "_self");
                        }else if(vm.user.biz_type == "seller_en"){
                            window.open("g_goods_detail.html?goods_id=" + vm.goods.goods_id, "_self");
                        }
                    } else {
                        vm.logBoxTip = "username or password error";
                    }
                }
            })
        },

        details : function () {
            var goods_id = format3(getQueryString("goods_id"));
            if(goods_id != "" && goods_id != null || goods_id != undefined){
                window.location.href = "g_goods_detail.html?goods_id="+goods_id;
            }
        },
        views : function (goods) {
            window.open("compound_details.html?goods=" + base64.encode(JSON.stringify(goods)), "_self");
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
