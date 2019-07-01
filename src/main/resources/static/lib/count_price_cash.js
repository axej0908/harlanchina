var vm;
vm = new Vue({
    el: "#rrapp",
    data: {
        searchParam: null,
        searchType: 'supplier',
        user: {},
        //1.商品详情传递过来的参数
        goods: {},
        goodsList: [],
        cartIdStr: "",
        //2.加载登录人的收货地址
        addrs: [],
        addr: {
            is_default: true
        },
        //地址添加窗口div
        addressFrame: false,
        //3.总订单
        order: {
            payment_opt: 'offline'
        },
        orderList: [],
        //合同
        contact: null,
        totalCount: 0,
        totalPrice: 0,
        //结算类型
        countType: '',
        //供应链金融
        chain: {},
		ser:{},//服务类型
		
        //平台服务
        superviseFlag: false,
        thirdPartyFlag: false

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods: {

        //9.导航栏搜索跳转
        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "cas") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },
        getCurrentUser: function () {
			vm.ser.type = getQueryString("type");
			vm.ser.id = getQueryString("id");
			vm.ser.total = getQueryString("total");
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        alert("please sign in again!");
                        window.open("login_en.html", "_self");
                        return;
                    } else {
                        vm.countType = getQueryString("source");
                        //购物车结算
                        if (vm.countType == 'cart') {
                            vm.cartIdStr = getQueryString("param");
                            if (vm.cartIdStr.length > 0) {
                                var cartIdArr = vm.cartIdStr.split(",");
                                cartIdArr.forEach(function (cartId) {
                                    vm.loadCartDetail(cartId);
                                })
                            }
                        } else {
                            //直接购买
                            vm.goods = JSON.parse(base64.decode(getQueryString("goods")));
                            vm.goodsList.push(vm.goods);
                        }
                        vm.totalCount = getQueryString("totalCount");
                        vm.totalPrice = getQueryString("totalPrice");
                        //地址列表查询
                        vm.preLoadAddrs();
                    }
                }
            })
        }
        ,
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
        }
        ,
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
        }
        ,
        //2.地址删除
        del: function (item) {
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "unknown error");
                return;
            }
            $.ajax({
                url: "/address/delete",
                type: "post",
                data: {"addr_id": item.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.preLoadAddrs();
                    }
                }
            })
        }
        ,
        //3.地址 添加或者修改
        saveAddress: function () {
            if (vm.addr.consignee == null || vm.addr.consignee == "undefined" || vm.addr.consignee == "") {
                alert("The consignee cannot be empty");
                return;
            }
            if (vm.addr.detail == null || vm.addr.detail == "undefined" || vm.addr.detail == "") {
                alert("The address cannot be empty");
                return;
            }

            if (typeof vm.user.user_id == "undefined" || vm.user.user == 0) {
                alert("please sign in again");
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
                        vm.addr.addr_id = r.data;
                        vm.addressFrame = false;
                        vm.preLoadAddrs();
                        $(".alert_balck").hide();
                        $(".alert_adr").hide();
                    }
                }
            })
        }
        ,
        //4.地址 详情
        detail: function (item) {
            vm.addressFrame = true;
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "unknown error");
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


        /**
         * 选择器
         */
        switcher : function(val){
            if(val == '0'){
                if(vm.superviseFlag){
                    vm.superviseFlag = false;
                }else {
                    vm.superviseFlag = true;
                }
            }
            if(val == '1'){
                if(vm.thirdPartyFlag){
                    vm.thirdPartyFlag = false;
                }else {
                    vm.thirdPartyFlag = true;
                }
            }
        },

        selPaymentOpt : function (val) {
            if (typeof val == "undefined") {
                return;
            } else {
                vm.order.payment_opt = val;
            }
        },

        /**
         * 7.购物车结算
         */
        submitByCart: function () {
            vm.goodsList.forEach(function (t) {

                var obj = {};
                //1 买家id
                obj.buyer_id = vm.user.user_id;
                //2 地址id  html
                obj.addr_id = vm.order.addr_id;
                //3 支付方式
                obj.payment_opt = vm.order.payment_opt;
                //4 打包方式
                obj.package_opt = t.package_opt;
                //5 色光
                obj.color_light = t.color_light;
                //6 色力
                obj.color_power = t.color_power;
                //7 商品id
                obj.goods_id = t.goods_id;
                //8 商品name
                obj.goods_name = t.goods_name;
                //9 单价
                obj.goods_price = t.goods_price;
                //0 数量
                obj.goods_num = t.goods_num;
                //卖家
                vm.goodsDetails(t.goods_id);
                obj.seller_id = vm.goods.user_id;
                //平台检测
                if(vm.thirdPartyFlag){
                    obj.check_state = "0";
                }
                //平台监理
                if(vm.superviseFlag){
                    obj.super_state = "0";
                }

                //供应链金融
                obj.orderChainBean = vm.chain;

                vm.orderList.push(obj);
            });

            $.ajax({
                type: "post",
                url: "/order/buyCart",
                data: {"orderStr": JSON.stringify(vm.orderList), "cartIds": vm.cartIdStr},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.goodsList = [];
                        vm.cartIdStr = "";
                        window.location.href = "order_buyer.html";
                    }
                }
            })
        },

        /**
         * 8.直接购买
         */
        submitByDetail: function () {
            var obj = {};

            //1 买家id
            obj.buyer_id = vm.user.user_id;
            //2 地址id  html
            obj.addr_id = vm.order.addr_id;
            //3 支付方式
            obj.payment_opt = vm.order.payment_opt;
            //4 打包方式
            obj.package_opt = vm.goods.package_opt;
            //5 色光
            obj.color_light = vm.goods.color_light;
            //6 色力
            obj.color_power = vm.goods.color_power;
            //7 商品id
            obj.goods_id = vm.goods.goods_id;
            //8 商品name
            obj.goods_name = vm.goods.goods_name;
            //9 单价
            obj.goods_price = vm.goods.current_price;
            //0 数量
            obj.goods_num = vm.goods.goods_num;
            //1 总金额
            obj.total_money = vm.goods.current_price * vm.goods.goods_num;
            //卖家
            obj.seller_id = vm.goods.user_id;
            //平台检测
            if(vm.thirdPartyFlag){
                obj.check_state = "0";
            }
            //平台监理
            if(vm.superviseFlag){
                obj.super_state = "0";
            }

            $.ajax({
                type: "post",
                async: false,
                url: "/order/buyItNow",
                data: obj,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (vm.order.payment_opt == 'chain') {
                            vm.orderChain(r.data);
                        }
                        alert("success!");
                        obj = {};
                        window.location.href = "order_buyer.html";
                    }
                }
            })
        },


        /**
         * 供应链金融
         */
        orderChain :function(order){
            vm.chain.order_id = order.order_id;

            $.ajax({
                url: '/orderChain/save',
                data: vm.chain,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){}
                }
            })
        },

        /**
         * 10.提交订单
         */
        submitOrder: function () {
            if (typeof vm.order.addr_id == "undefined") {
                alert("please choose your address first");
                return;
            }
            if (vm.order.payment_opt == 'chain') {
                $(".mask").show();
                $(".opacity2").show();
            }else {
                if (vm.countType == "cart") {
                    vm.submitByCart();
                } else {
                    vm.submitByDetail();
                }
            }
        },

        /**
         * 11 加载购物车详情
         */
        loadCartDetail: function (cart_id) {
            if (typeof cart_id == "undefined") {
                return;
            }
            $.ajax({
                type: "post",
                url: "/cart/detail",
                data: {cart_id: cart_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var obj = r.data;
                        obj.current_price = r.data.goods_price;
                        vm.goodsList.push(r.data);
                    }
                }
            })
        },

        /**
         * 产品详情
         */
        goodsDetails : function(goods_id){
            $.ajax({
                url: '/goodsMall/detail',
                async: false,
                data: {
                    "goods_id": goods_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    vm.goods = r.data;
                }
            })
        },


        /**
         * 上传图片
         * @param event
         */
        uploadImg: function (event) {
            var obj = event.target;
            /*var $file = $(obj);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(obj).parent();
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.css('background-image',"url("+dataURL+")");
            }
            $img.find("span").html("");*/

            var inputId = obj.id;
            //根据id判断生产环境还是办公环境
            $.ajaxFileUpload({
                url: "/file/upload",
                type: "post",
                data: {
                    "user_id": vm.user.user_id
                },
                secureuri: false,
                fileElementId: obj.id,
                dataType: 'json',
                success: function (r, status) {
                    //文件路径
                    if (inputId == "audit_reports") {
                        vm.chain.audit_reports = r.data;
                    }else if (inputId == "financial_statement"){
                        vm.chain.financial_statement = r.data;
                    }
                    alert("success");
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },


        /**
         * 校验供应链金融支付方式
         */
        submitApplica : function () {
            //联系人姓名
            if (vm.chain.contacts_name == null || typeof vm.chain.contacts_name == "undefined") {
                alert("The contact name cannot be empty");
                return;
            }
            //联系人电话
            if (vm.chain.contacts_phone == null || typeof vm.chain.contacts_phone == "undefined") {
                alert("The contact number cannot be empty");
                return;
            }
            //身份证号
            if (vm.chain.id_number == null || typeof vm.chain.id_number == "undefined") {
                alert("ID card number cannot be empty");
                return;
            }
            //户籍
            if (vm.chain.household_register == null || typeof vm.chain.household_register == "undefined") {
                alert("Household registration cannot be empty");
                return;
            }
            //现住地
            if (vm.chain.current_residence == null || typeof vm.chain.current_residence == "undefined") {
                alert("The current residence cannot be empty");
                return;
            }
            //公司名称
            if (vm.chain.company_name == null || typeof vm.chain.company_name == "undefined") {
                alert("The company name cannot be empty");
                return;
            }
            //公司地址
            if (vm.chain.company_site == null || typeof vm.chain.company_site == "undefined") {
                alert("The company address cannot be empty");
                return;
            }
            //公司电话
            if (vm.chain.company_phone == null || typeof vm.chain.company_phone == "undefined") {
                alert("The company phone cannot be empty");
                return;
            }
            //审计报告
            if (vm.chain.audit_reports == null || typeof vm.chain.audit_reports == "undefined") {
                alert("The audit report cannot be empty");
                return;
            }
            //财务报表
            if (vm.chain.financial_statement == null || typeof vm.chain.financial_statement == "undefined") {
                alert("Financial statements cannot be empty");
                return;
            }
            //申请额度
            if (vm.chain.apply_amount == null || typeof vm.chain.apply_amount == "undefined") {
                alert("The applied quota cannot be empty");
                return;
            }
            vm.chain.choose = $("input[name='choose']:checked").val();
            if(vm.chain.choose == null || typeof vm.chain.choose == "undefined"){
                alert("Form of financing cannot be empty");
                return;
            }
            vm.chain.user_id = vm.user.user_id;

            if (vm.countType == "cart") {
                vm.submitByCart();
            } else {
                vm.submitByDetail();
            }

        },
		// 去支付
	goPay : function(){
	if(vm.ser.type==1){
		$.ajax({
                url: "/Testing/updateTesting",
                type: "post",
                data: {
					testing_id: vm.ser.id,
					testing_status:4
				},
                dataType: "json",
                success: function (r) {
					console.log(r)
                    if (r.code == 200) {
                        alert("Pay success!");
                        window.open("pe_index_service.html?type=har1", "_self");
                    }
                }
            })
	};
	if(vm.ser.type==2){
		$.ajax({
                url: "/Supervision/updateSupervisionStatusById",
                type: "post",
                data: {
					supervision_id: vm.ser.id,
					supervision_status:4
				},
                dataType: "json",
                success: function (r) {
					console.log(r)
                    if (r.code == 200) {
                        alert("Pay success!");
                        window.open("pe_index_service.html?type=har2", "_self");
                    }
                }
            })
	};
	if(vm.ser.type==3){
		$.ajax({
                url: "/FactoryAudit/updateFactoryAuditStatus",
                type: "post",
                data: {
					factoryAudit_id: vm.ser.id,
					factoryAudit_status:4
				},
                dataType: "json",
                success: function (r) {
					console.log(r)
                    if (r.code == 200) {
                        alert("Pay success!");
                        window.open("pe_index_service.html?type=har3", "_self");
                    }
                }
            })
	};
	}
    },

    filters: {

        numFilter(value) {

            // 截取当前数据到小数点后两位

            let realVal = Number(value).toFixed(2);

            // num.toFixed(2)获取的是字符串

            return Number(realVal);

        }
    }
});

