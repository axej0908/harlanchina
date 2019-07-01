var flag = true;
var limit = 12;

var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        //商品列表
        goods: [],
        //分类文本
        one_type: null,
        two_type: null,
        //价格快递
        priceNews: [],

        searchParam: null,
        //搜索框搜索类别
        searchType: 'product',
        //分类
        categories: [],
        //二级分类显示与否
        secCateShow:false,
        secCate:[],
		order:{},

        total:0,

        //购物车总量
        gross: 0,
        carShow: true

    },
    computed: {
        cateSelected: function () {
            if (vm.categories == []) {
                return;
            } else {
                vm.categories.forEach(function (item, index) {
                    if (item.checked) {
                        vm.secCate = item.list;
                    }
                });
            }
            return vm.secCate;
        }
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();
            vm.quantity();
			vm.getOrderById();
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

        redirectSel: function () {

            if(vm.searchParam == null || vm.searchParam == ""){
                alert("Can not be empty!");
                return;
            }

            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            }else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            }else {
                alert("error");
            }
        },
        //获取当前登录人详细信息
        currentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
						//console.log("user"+JSON.stringify(vm.user));
                        //供应商 隐藏购物车
                        if(vm.user != null){
                            vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
                        }

                        //1.产品分类
                        vm.preLoadRecursionList();
                        //2.预加载首页化浪自营商品列表
                        vm.preLoadIndexGoods(0);
                        //3.价格快递
                        vm.preLoadPriceNews(0);
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


        //1.商品分类
        preLoadRecursionList: function () {
            $.ajax({
                url: "/category/recursion",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.categories = r.data;
                    }
                }
            })
        },

        /**
         * 2.一级分类点击事件(处理选中效果)
         */
        selCategory: function (obj) {
            vm.secCateShow = true;
            //li选中效果样式展示
            vm.categories.forEach(function (item, index) {
                if (obj.text == item.text) {
                    vm.one_type = obj.text;
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //根据分类查询商品
            vm.preLoadIndexGoods();
        },

        /**
         * 3.二级分类点击事件(渲染、接口)
         */
        selSecCate:function (obj) {
            //li选中效果样式展示
            vm.secCate.forEach(function (item, index) {
                if (obj.text == item.text) {
                    vm.two_type = obj.text;
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            //根据分类查询商品
            vm.preLoadIndexGoods();
        },

        /**
         * 4.预加载首页化浪自营商品列表
         * seller_id
         */
        preLoadIndexGoods: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            flag = true;
            //根据分类查询商品
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        goods_state: 'up',
                        goods_type: "others",
                        one_type: vm.one_type,
                        two_type: vm.two_type,
                        page: currPage + 1,
                        limit: limit
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.preLoadIndexGoods//回调函数
                            });
                            flag = false;
                        }
                        vm.goods = r.data.list;
                        vm.total = r.data.totalCount;
                    }
                }
            })
        },

        //5.查询价格快递 列表
        preLoadPriceNews: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/price/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: currPage+1,
                        limit: limit
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.preLoadPriceNews//回调函数
                            });
                            flag = false;
                        }
                        vm.priceNews = r.data.list;
                    }
                }
            })
        },

        /**
         * 6.点击查询商品详情
         * @param item
         */
        queryCargoDetail: function (item) {
            var mer_id = item.goods_id;
            window.open("g_goods_detail.html?goods_id=" + mer_id, "_blank")
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
        },
		
		postSupplier : function(){
			var data={};
			
			if($("#company_ename").val()==""){alert("your company name is null");
				return;
			}else{
				data.company_name_en=$("#company_ename").val();
			}
			if($("#company_eaddress").val()==""){alert("your company_address is null");
			return;
			}else{
				data.company_addr_en=$("#company_ename").val();
			}
			if($("#contact_name").val()==""){alert("your contact_person is null");
				return;
			}else{
				data.contact_person=$("#contact_name").val();
			}
			if($("#contact_tel").val()==""){alert("your Tel is null");
				return;
			}else{
				data.contact_telephone=$("#contact_tel").val();
			}
			if($("#email").val()==""){alert("your Email is null");
				return;
			}else{
				data.contact_email=$("#email").val();
			}
			if($("#fax").val()==""){alert("your Fax is null");
				return;
			}else{
				data.contact_fax=$("#fax").val();
			}
			
				data.delivery_addr=$("#mail_address").val();
			
			//样品名称
			if($("#exm_name").val()==""){alert("your Sample Name is null"); 
				return;
			}else{
				data.sample_name=$("#exm_name").val();
			}
			//样品数量
			if($("#exm_num").val()==""){alert("your Sample Quantity is null");
				return;
			}else{
				data.sample_quantity=$("#exm_num").val();
			}
			if($("#exm_pacage").val()==""){alert("your Sample Package is null");
				return;
			}else{
				data.sample_package=$("#exm_pacage").val();
			}
			if($("#exm_status").val()==""){alert("your Sample Condition is null");
				return;
			}else{
				data.sample_condition=$("#exm_status").val();
			}
			if($("#exm_id").val()==""){alert("your Sample No. is null");
				return;
			}else{
				data.sample_no=$("#exm_id").val();
			}
			if($("#exm_type").val()==""){alert("your Testing Items is null");
				return;
			}else{
				data.testing_items = $("#exm_type").val();
			}
			if($("#exm_standard").val()==""){alert("your Testing Standard is null");
				return;
			}else{
				data.testing_standart=$("#exm_standard").val();
			}
			data.invoice_title = $("#fp_name").val();
			data.company_name_zh = $("#company_zname").val();
			data.company_addr_zh = $("#company_zaddress").val();
			data.invoice_type = $('input:radio[name="thirdCheckInvoice"]:checked').val();
			if($('#sexs1').is(':checked')) {
				data.chinese_report = 1;
			}else{
				data.chinese_report = 0;
				}
			if($('#sexs2').is(':checked')) {
				data.english_report = 1;
			}else{
				data.english_report = 0;
				}
			data.dispatch_type = $('input:radio[name="thirdCheckGiveWay"]:checked').val();
          
            if($("#exm_data").val()=="" || $("#exm_data").val()==null){
                data.testing_period = null;
			}else{
				data.testing_period = $("#exm_data").val();
			}
			data.user_id = vm.user.user_id;
			$.ajax({
                    url: '/Testing/insertTesting',
                    async: false,
                    data:data,
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						var obj = JSON.parse(r);
						console.log("return==>"+r)
                        if(obj.code == 200){
                            alert("success 提交成功");
							window.open("pe_index_service.html?type=har1", "_self");
                        }else{
							alert("fail please wait a moment and try again.");
						}
                    }
                })
    },
	// 监装检测
	postSupervision : function(){
		var data={};
		    if($("#company_ename").val()==""){alert("your company name is null");
				return;
			}else{
				data.company_name_en=$("#company_ename").val();
			}
			if($("#company_eaddress").val()==""){alert("your company_address is null");
			return;
			}else{
				data.company_addr_en=$("#company_ename").val();
			}
			if($("#contact_name").val()==""){alert("your contact_person is null");
				return;
			}else{
				data.contact_person=$("#contact_name").val();
			}
			if($("#contact_tel").val()==""){alert("your Tel is null");
				return;
			}else{
				data.contact_telephone=$("#contact_tel").val();
			}
			if($("#email").val()==""){alert("your Email is null");
				return;
			}else{
				data.contact_email=$("#email").val();
			}
			if($("#fax").val()==""){alert("your Fax is null");
				return;
			}else{
				data.contact_fax=$("#fax").val();
			}
			if($("#good_name").val()==""){alert("your Commority is null");
				return;
			}else{
				data.commodity=$("#good_name").val();
			}
			////////////////////////////////////////////
			if($("#good_num").val()==""){alert("your quantity is null");
				return;
			}else{
				data.quantity=$("#good_num").val();
			}
			if($("#boat_name").val()==""){alert("your vessel is null");
				return;
			}else{
				data.vessel=$("#boat_name").val();
			}
			if($("#package").val()==""){alert("your packing is null");
				return;
			}else{
				data.packing=$("#package").val();
			}
			if($("#lidu").val()==""){alert("your size is null");
				return;
			}else{
				data.size=$("#lidu").val();
			}
			if($("#boat_port").val()==""){alert("your load_port is null");
				return;
			}else{
				data.load_port=$("#boat_port").val();
			}
			if($("#destination").val()==""){alert("your destination is null");
				return;
			}else{
				data.destination=$("#destination").val();
			}
			if($("#inspection_lacation").val()==""){alert("your inspection_location is null");
				return;
			}else{
				data.inspection_location=$("#inspection_lacation").val();
			}
			if($("#inspection_date").val()==""){alert("your required_inspection_date is null");
				return;
			}else{
				data.required_inspection_date=$("#inspection_date").val();
			}
			////////////////////////
			
				data.delivery_addr=$("#mail_address").val();
			
			var val1 = $('input:radio[name="input_radio1"]:checked').val();
			if(val1==1){
				data.payerinfo_company = 1;
				data.payerinfo_other = 0;
			}else if(val1==2){
				data.payerinfo_company = 0;
				data.payerinfo_other = 1;
			}
			data.is_lc=$('input:radio[name="input_radio2"]:checked').val();
			if($('#input_cb1').is(':checked')) {
				data.sampling_at_warehouse = 1;
			}else{
				data.sampling_at_warehouse = 0;
				}
			if($('#input_cb2').is(':checked')) {
				data.sampling_at_plant = 1;
			}else{
				data.sampling_at_plant = 0;
				}
			if($('#input_cb3').is(':checked')) {
				data.sampling_at_quayside = 1;
			}else{
				data.sampling_at_quayside = 0;
				}
			if($('#input_cb4').is(':checked')) {
				data.sampling_at_100 = 1;
			}else{
				data.sampling_at_100 = 0;
				}
			if($('#input_cb5').is(':checked')) {
				data.sampling_at_random = 1;
			}else{
				data.sampling_at_random = 0;
				}
			if($('#input_cb6').is(':checked')) {
				data.weighing_at_warehouse = 1;
			}else{
				data.weighing_at_warehouse = 0;
				}
			if($('#input_cb7').is(':checked')) {
				data.weighing_at_plant = 1;
			}else{
				data.weighing_at_plant = 0;
				}
			if($('#input_cb8').is(':checked')) {
				data.weighing_at_quayside = 1;
			}else{
				data.weighing_at_quayside = 0;
				}
			if($('#input_cb9').is(':checked')) {
				data.weighing_at_100 = 1;
			}else{
				data.weighing_at_100 = 0;
				}
			if($('#input_cb10').is(':checked')) {
				data.weighing_at_random = 1;
			}else{
				data.weighing_at_random = 0;
				}
			if($('#input_cb11').is(':checked')) {
				data.weighing_at_supervision = 1;
			}else{
				data.weighing_at_supervision = 0;
				}
			if($('#input_cb12').is(':checked')) {
				data.weighing_at_initial = 1;
			}else{
				data.weighing_at_initial = 0;
				}
			if($('#input_cb13').is(':checked')) {
				data.weighing_at_intermidiate = 1;
			}else{
				data.weighing_at_intermidiate = 0;
				}
			if($('#input_cb14').is(':checked')) {
				data.cargo_at_warehouse = 1;
			}else{
				data.cargo_at_warehouse = 0;
				}
			if($('#input_cb15').is(':checked')) {
				data.cargo_at_plant = 1;
			}else{
				data.cargo_at_plant = 0;
				}
			if($('#input_cb16').is(':checked')) {
				data.cargo_at_quayside = 1;
			}else{
				data.cargo_at_quayside = 0;
				}
			if($('#input_cb17').is(':checked')) {
				data.cargo_at_visual = 1;
			}else{
				data.cargo_at_visual = 0;
				}
			if($('#input_cb18').is(':checked')) {
				data.cargo_at_packing = 1;
			}else{
				data.cargo_at_packing = 0;
				}
			if($('#input_cb19').is(':checked')) {
				data.cargo_at_check = 1;
			}else{
				data.cargo_at_check = 0;
				}
			if($('#input_cb20').is(':checked')) {
				data.porthanding_loading = 1;
			}else{
				data.porthanding_loading = 0;
				}
			if($('#input_cb21').is(':checked')) {
				data.porthanding_discharging = 1;
			}else{
				data.porthanding_discharging = 0;
				}
			if($('#input_cb22').is(':checked')) {
				data.porthanding_hold = 1;
			}else{
				data.porthanding_hold = 0;
				}
			if($('#input_cb23').is(':checked')) {
				data.containe_stuffing = 1;
			}else{
				data.containe_stuffing = 0;
				}
			if($('#input_cb24').is(':checked')) {
				data.containe_seal = 1;
			}else{
				data.containe_seal = 0;
				}
			if($('#input_cb25').is(':checked')) {
				data.containe_unloading = 1;
			}else{
				data.containe_unloading = 0;
				}
			if($('#input_cb26').is(':checked')) {
				data.tally_at_container = 1;
			}else{
				data.tally_at_container = 0;
				}
			if($('#input_cb27').is(':checked')) {
				data.tally_at_loading = 1;
			}else{
				data.tally_at_loading = 0;
				}
				
			data.company_name_zh = $("#company_zname").val();
			data.company_addr_zh = $("#company_zaddress").val();
			
			data.other_requirements=$("#other_req").val();
			data.analysis_chemical=$("#chemical_items").val();
			data.analysis_physical=$("#physical_items").val();
			data.analysis_other=$("#product_stand").val();
			
			data.invoice_type = $('input:radio[name="thirdCheckInvoice"]:checked').val();
			
			if($('#sexs1').is(':checked')) {
				data.invoice_chinese = 1;
			}else{
				data.invoice_chinese = 0;
				}
			if($('#sexs2').is(':checked')) {
				data.invoice_english = 1;
			}else{
				data.invoice_english = 0;
				}
			data.invoice_title = $("#fp_name").val();
			data.dispatch_via = $('input:radio[name="thirdCheckGiveWay"]:checked').val();
			data.user_id=vm.user.user_id;
			
			$.ajax({
                    url: '/Supervision/insertSupervision',
                    async: false,
                    data:data,
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						console.log("return==>"+r)
						var obj = JSON.parse(r);
                        if(obj.code == 200){
                            alert("success 提交成功");
							window.open("pe_index_service.html?type=har2", "_self");
                        }else{
							alert("fail please wait a moment and try again.");
						}
                    }
                })
    },
	// 实地验厂
	postFactory : function(){
		var data={};
		
				data.delivery_addr=$("#mail_address").val();
			
			data.company_name=$("#company_zname").val();
			data.company_addr=$("#company_eaddress").val();
			data.contact_person=$("#contact_name").val();
			data.position=$("#contact_level").val();
			data.email=$("#email").val();
			data.fax=$("#fax").val();
			data.invoice_report=$('#input:radio[name="thirdCheckInvoice"]:checked').val();
			data.invoice_title=$("#fp_name").val();
			data.factory_id=0;
			if($('#sexs1').is(':checked')) {
				data.invoice_chinese = 1;
			}else{
				data.invoice_chinese = 0;
				}
			if($('#sexs2').is(':checked')) {
				data.invoice_english = 1;
			}else{
				data.invoice_english = 0;
				}
			data.dispatch_via=$('input:radio[name="thirdCheckGiveWay"]:checked').val();
			data.user_id=vm.user.user_id;
			$.ajax({
				
					//url:"http://axej.vipgz1.idcfengye.com/FactoryAudit/insertFactoryAudit",
                    url: '/FactoryAudit/insertFactoryAudit',
                    async: false,
                    data:data,
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						var obj = JSON.parse(r);
						console.log("return==>"+r+r.code)
						var obj = JSON.parse(r);
                        if(obj.code == 200){
                            alert("success 提交成功");
							window.open("pe_index_service.html?type=har3", "_self");
                        }else{
							alert("fail please wait a moment and try again.");
						}
                    }
                })
	},
	getOrderById:function(){
		var order_id=getQueryString("id");
		if(orderType==1){
			$.ajax({
                url: "/Testing/getTesting",
                type: "post",
                data: {
				testingId:order_id
				},
                dataType: "json",
                success: function (r) {
                    if (r.code == 200) {
                        vm.order=r.data;
						console.log(vm.order);
                    }
                }
            })
		};
		if(orderType==2){
			$.ajax({
                url: "/Supervision/getSupervisionById",
                type: "post",
                data: {
				supervision_id:order_id
				},
                dataType: "json",
                success: function (r) {
                    if (r.code == 200) {
                        vm.order=r.data;
						console.log(vm.order);
                    }
                }
            })
		};
		if(orderType==3){
			$.ajax({
                url: "/FactoryAudit/getFactoryAuditById",
                type: "post",
                data: {
				factoryAudit_id:order_id
				},
                dataType: "json",
                success: function (r) {
                    if (r.code == 200) {
                        vm.order=r.data;
						console.log(vm.order);
                    }
                }
            })
		};
		
	}
	}
});