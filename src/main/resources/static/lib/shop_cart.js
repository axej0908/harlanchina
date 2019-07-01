var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        carts: [],
        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',

        //商品总件数
        totalCount: 0,
        //商品总金额
        totalPrice: 0,

        isCheckAll: false
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    computed: {},
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
                        window.open("login_en.html", "_self");
                        return;
                    } else {
                        vm.preLoadCarts(0);
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
                        window.location.href = "login_en.html";
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
         * 1.预加载当前登录人的购物车列表
         * @param currPage
         */
        preLoadCarts: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/cart/myList",
                type: "post",
                data: {"jsonStr": JSON.stringify({"user_id": vm.user.user_id, "page": currPage + 1, "limit": limit})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.carts = r.data.list;
                        //render not choose
                        vm.carts.map(function (shop) {
                            vm.$set(shop, 'checked', false);
                        });
                        if (flag) {
                            $("#pageBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadCarts//回调函数
                            });
                            flag = false;
                        }
                    }
                }
            })
        },

        /**
         * 2.点击店铺下单项的购物商品(选中或取消选中)
         * @param cart
         * @param shop
         */
        selCartItem: function (cart, shop) {
            var subSum = 0;
            //1.商品 点选效果
            cart.checked = !cart.checked;
            //2.该店铺下选中商品 数量
            shop.cartBeans.forEach(function (item, index) {
                if (item.checked) {
                    subSum++;
                }
            });
            //3.判断店铺是否勾选
            if (shop.cartBeans.length == subSum) {
                shop.checked = true;
            } else {
                shop.checked = false;
            }

            vm.calTotalNum();
            vm.calTotalPrice();
        },

        /**
         * 3.点击店铺(选中或取消选中)
         */
        selShopCarts: function (shop) {
            //1.render shop
            shop.checked = !shop.checked;

            //2.全选/全不选效果
            shop.cartBeans.forEach(function (item, index) {
                item.checked = shop.checked;
            })

            vm.calTotalNum();
            vm.calTotalPrice();
        },

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
         * 商品数量效果
         */
        goodSum: function (val, cart) {
            if (val > 0) {
                cart.goods_num++;
            } else {
                cart.goods_num == 1 ? cart.goods_num : cart.goods_num--;
            }
            vm.calTotalNum();
            vm.calTotalPrice();
        },

        accMul : function(arg1,arg2){
            var m = 0,
                s1=arg1.toString(),
                s2=arg2.toString();
            try{
                m += s1.split(".")[1].length
            }catch(e){}
            try{
                m += s2.split(".")[1].length
            }catch(e){}
            return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
        },

        /**
         * 清空/buy or not 购物车
         */
        selAllOrNot: function () {
            vm.isCheckAll = !vm.isCheckAll;
            vm.carts.forEach(function (shop) {
                shop.checked = vm.isCheckAll;

                if (shop.cartBeans != [] && shop.cartBeans != null) {
                    shop.cartBeans.forEach(function (cart) {
                        cart.checked = shop.checked;
                    })
                }
            });
            vm.calTotalNum();
            vm.calTotalPrice();
        },

        calTotalNum: function () {
            var count = 0;
            if (typeof vm.carts == "undefined" || vm.carts.length == 0) {
                return 0;
            }
            vm.carts.forEach(function (shop) {
                if (shop.cartBeans != [] && shop.cartBeans != null) {
                    shop.cartBeans.forEach(function (cart) {
                        if (cart.checked == true) {
                            count += cart.goods_num;
                        }
                    })
                }
            });
            vm.totalCount = count;
        },
        calTotalPrice: function () {
            var price = 0;
            if (typeof vm.carts == "undefined" || vm.carts.length == 0) {
                return 0;
            }
            vm.carts.forEach(function (shop) {
                if (shop.cartBeans != [] && shop.cartBeans != null) {
                    shop.cartBeans.forEach(function (cart) {
                        if (cart.checked == true) {
                            price += (cart.goods_num * cart.goods_price);
                        }
                    })
                }
            });
            vm.totalPrice = price;
        },
        /**
         * 提交订单
         */
        skipToPay: function () {
            var cartIdsStr = "";
            vm.carts.forEach(function (shop) {
                if (shop.cartBeans != [] && shop.cartBeans != null) {
                    shop.cartBeans.forEach(function (cart) {
                        if (cart.checked) {
                            cartIdsStr = cartIdsStr + "," + cart.cart_id;
                        }
                    })
                }
            });
            window.location.href = "count_price_cash.html?param=" + cartIdsStr.substr(1) +
                "&totalCount=" + vm.totalCount + "&totalPrice=" + vm.totalPrice + "&source=cart";
        },

        /**
         * 删除单个购物车
         */
        del: function (cart_id) {
            $.ajax({
                url: "/cart/delete",
                type: "post",
                data: {cart_id:cart_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.preLoadCarts();
                    }
                }
            })
        }
    },

    filters: {

        numFilter(value) {

            // 截取当前数据到小数点后两位

            let realVal = Number(value).toFixed(2)

            // num.toFixed(2)获取的是字符串

            return Number(realVal)

        }
    }
});
