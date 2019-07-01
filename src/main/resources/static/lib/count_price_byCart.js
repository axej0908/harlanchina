var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //1.购物车页面传递过来的参数
        cartList: [],
        totalCount: null,
        totalPrice: null,
        //2.加载登录人的收货地址
        addrs: [],
        addr: {},
        //地址添加窗口div
        addressFrame: false,
        //3.总订单
        order:{},
        //4.订单项
        orderItems:[],
        //5.付款方式
        paymentOpts:[
            {text:'unionpay',checked:true},
            {text:'Alipay',checked:false},
            {text:'WeChat',checked:false},
            {text:'Offline transfer',checked:false},
            {text:'Supply chain finance',checked:false}
        ],
        //合同
        contact: null
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
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
                        vm.cartList = JSON.parse(base64.decode(getQueryString("param")));
                        vm.totalCount = getQueryString("totalCount");
                        vm.totalPrice = getQueryString("totalPrice");

                        //根据购物车列表得到订单项数组
                        vm.cartList.forEach(function (item,index) {
                            var tmp = {};
                            tmp.package_opt = item.package_opt;
                            tmp.color_light = item.color_light;
                            tmp.color_power = item.color_power;
                            tmp.goods_id = item.goods_id;
                            tmp.goods_name = item.goods_name;
                            tmp.goods_price = item.goods_price;
                            tmp.goods_num = item.goods_num;
                            tmp.item_status = "1";
                            tmp.contract = "合同";
                            vm.orderItems.push(tmp);
                        });
                        //地址列表查询
                        vm.preLoadAddrs();
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
                        window.open("index.html");
                    }
                }
            })
        },
        //1.加载当前登录人收货地址列表
        preLoadAddrs: function () {
            $.ajax({
                url: "/address/list",
                type: "post",
                data: {"jsonStr": JSON.stringify({"user_id": vm.user.user_id, "page": 1, "limit": 100})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.addrs = r.data.list;
                    }
                }
            })
        },
        //2.地址删除
        del: function (item) {
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "删除地址信息id不存在");
                return;
            }
            $.ajax({
                url: "/address/delete",
                type: "post",
                data: {"addr_id": item.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.preLoadAddrs();
                    }
                }
            })
        },
        //3.地址 添加或者修改
        saveAddress: function () {
            vm.addr.province = $(".city-picker-selector").find(".province a").html();
            vm.addr.city = $(".city-picker-selector").find(".city a").html();
            vm.addr.area = $(".city-picker-selector").find(".district a").html();
            if (typeof vm.user.user_id == "undefined" || vm.user.user == 0) {
                alert("登录过时");
                window.open("index.html", "_self");
                return;
            }
            vm.addr.user_id = vm.user.user_id;
            console.log("save update的地址参数：" + JSON.stringify(vm.addr));
            $.ajax({
                url: typeof vm.addr.addr_id == "undefined" ? "/address/save" : "/address/update",
                type: "post",
                data: vm.addr,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.addr.addr_id = r.data;
                        vm.addressFrame = false;
                        vm.preLoadAddrs();
                    }
                }
            })
        },
        //4.地址 详情
        detail: function (item) {
            vm.addressFrame = true;
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "删除地址信息id不存在");
                return;
            }

            $.ajax({
                url: "/address/detail",
                type: "post",
                data: {"addr_id": item.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.addr = r.data;
                        $(".city-picker-selector").find(".province a").html(vm.addr.province);
                        $(".city-picker-selector").find(".city a").html(vm.addr.city);
                        $(".city-picker-selector").find(".district a").html(vm.addr.area);
                    }
                }
            })
        },
        /**
         * 5.选中地址效果
         */
        selectAddress: function (addr) {
            vm.addrs.forEach(function (item, index) {
                if (addr.addr_id == item.addr_id) {
                    typeof item.checked == undefined ? vm.$set(item, "checked", true) : item.checked = true;
                } else {
                    typeof item.checked == undefined ? vm.$set(item, "checked", false) : item.checked = false;
                }
            })
        },
        //6.选择支付方式效果
        selPaymentOpt:function (obj) {
            vm.paymentOpts.forEach(function (item) {
                if (obj.text == item.text){
                    item.checked = true;
                    vm.order.payment_opt = obj.text;
                }else {
                    item.checked = false;
                }
            })
        },
        //7.生成合同
        preCreateContact: function () {

        },
        //8.监理服务

        //9.平台检测

        /**
         * 10.提交订单
         */
        submitOrder: function () {
            //step1:address
            if (typeof vm.order.addr_id == "undefined") {
                alert("先选择地址");
                return;
            }
            //step2:buyer_id
            vm.order.buyer_id = vm.user.user_id;
            //step3:total money
            vm.order.total_money = vm.totalPrice;
            /**
             *            step4:判断平台服务
             *  step4.1: 免费监理
             *  step4.2: 三方检测
             */
            //step4.1
            if (vm.order.state_supervision) {
                $.ajax({
                    url: "/freeSupervision/save",
                    type: "post",
                    data: {"log_number": ''},
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.code == 0) {
                            vm.order.supv_id = r.supv_id;
                        }
                    }
                });
            }
            //step4.2
            if (vm.order.state_3party) {
                if (typeof vm.mer.goods_id == undefined || vm.mer.goods_id == 0) {
                    alert("三方检测保存参数有误");
                    return;
                }
                $.ajax({
                    url: "/report/save",
                    type: "post",
                    data: {"cargo_id": vm.mer.goods_id},
                    dataType: "json",
                    async: false,
                    success: function (r) {
                        if (r.code == 0) {
                            vm.order.report_id = r.report_id;
                        }
                    }
                });
            }
            //step5 保存订单
            console.log(JSON.stringify(vm.order));
            $.ajax({
                type: "post",
                url: "/order/save",
                //****订单和订单项 param *****
                data: {orderStr:JSON.stringify(vm.order),jsonStr:JSON.stringify(vm.orderItems),cartsJsonStr:JSON.stringify(vm.cartList)},
                dataType: "json",
                async: false,
                success: function (r) {
                    if (r.code == 0) {
                        alert("订单提交成功!");
                        vm.order = {};
                        //跳转到支付页面
                        window.open("zf.html", "_self");
                    }
                }
            })
        }
    }
});

