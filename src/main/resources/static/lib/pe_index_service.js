var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //服务类别
        ser:{},
        //服务
        service: {},
        //my 申请的服务列表
        services:[],
        har1Show:false,
        har2Show:false,
        har3Show:false,
        ser3Show:false,

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();

            vm.quantity();
        })
    },
    filters: {
        serialSel: function (val) {
            return val + "" + new Date().getTime();
        }
    },
    computed: {
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.open("login_en.html", "_self");
                    } else {
                        vm.ser.five_type = getQueryString("type");
                        if (vm.ser.five_type == 'har1'){
							vm.har1Show = true;
							vm.getAppList(0,0)
							};
                        if (vm.ser.five_type == 'har2'){
							vm.har2Show = true;
							vm.getSuperList(0,0)
							};
                        if (vm.ser.five_type == 'har3'){
							vm.har3Show = true;
							vm.getFactoryList(0,0);
							};
                        if (vm.ser.five_type == 'ser3'){vm.ser3Show = true};

                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                        //vm.preLoadMyServices();
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
         * 上传图片
         * @param event
         */
        uploadImg: function (event, five_id) {
            var obj = event.target;
            var $file = $(obj);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(obj).parent();
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.css('background-image',"url("+dataURL+")");
            }
            $img.find("span").html("");

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
                    if (inputId == "supply_file") {
                        vm.service.supply_file = r.data;
                        vm.service.five_id = five_id;
                        vm.editUploadFile();
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },


        /**
         * my harlan link 首页个人中心 订单页面跳转
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


        //preload 申请服务列表
        preLoadMyServices: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/fiveSer/pager",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": currPage + 1,
                        "limit": limit,
                        "user_id": vm.user.user_id,
                        "five_type": vm.ser.five_type,
                        "border_type": "en"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarStartSale").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadStartSale//回调函数
                            });
                            flag = false;
                        }
                        vm.services = r.data.list;
                    }
                }
            })
        },

        /**
         * 修改上传文件
         */
        editUploadFile : function () {
            $.ajax({
                url: '/fiveSer/edit',
                data: vm.service,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("uploaded successfully");
                    }else {
                        alert("fail to upload");
                    }
                }
            })
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

        /**
         * 提示
         */
        reminder : function () {
            alert("后台未审核!");
        },
		/**
         * factory_list
         */
		getFactoryList:function(state,page){
			 if (!$.isNumeric(page)) {
                page = 0;
            }	
			$.ajax({
                    url: '/FactoryAudit/getFactoryAuditByUserAndStatus',
                    async: false,
                    data: {
                        user_id: vm.user.user_id,
						limit: 10,
						page:page+1,
						factoryAudit_status: state},
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						console.log("result==>"+r)
						var obj = JSON.parse(r);
                        if (obj.code == 200) {
                        if (flag) {
                            $("#pagerBarStartSale").pagination(obj.data.recordTotal, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.getFactoryList//回调函数
                            });
                            flag = false;
                        }
                        vm.services = obj.data.content;
                    }
                    }
                })
		},
		/**
         * SuperList
         */
		getSuperList:function(state,page){
				 if (!$.isNumeric(page)) {
                page = 0;
            }	
			$.ajax({
                    url: '/Supervision/getSupervisionByUserAndStatus',
                    async: false,
                    data: {
                        user_id: vm.user.user_id,
						limit: 10,
						page:page+1,
						supervision_status: state},
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						console.log("result==>"+r)
						var obj = JSON.parse(r);
                        if (obj.code == 200) {
                        if (flag) {
                            $("#pagerBarStartSale").pagination(obj.data.recordTotal, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.getSuperList//回调函数
                            });
                            flag = false;
                        }
                        vm.services = obj.data.content;
                    }
                    }
                })
		},
		/**
         * SuperList
         */
		getAppList:function(state,page){
				 if (!$.isNumeric(page)) {
                page = 0;
            }	
			$.ajax({
                    url: '/Testing/getTestingByUserAndStatus',
                    async: false,
                    data: {
                        user_id: vm.user.user_id,
						limit: 10,
						page:page+1,
						testing_status: state},
                    type: "post",
                    datatype: "json",
                    success : function (r) {
						console.log("result==>"+r)
						var obj = JSON.parse(r);
                        if (obj.code == 200) {
                        if (flag) {
                            $("#pagerBarStartSale").pagination(obj.data.recordTotal, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.getAppList//回调函数
                            });
                            flag = false;
                        } 
                        vm.services = obj.data.content;
                    }
                    }
                })
		},
		/**
         * for type to select
         */
		gotoType:function(type){
			if(vm.har1Show){vm.getAppList(type,0)};
			if(vm.har2Show){vm.getSuperList(type,0)};
			if(vm.har3Show){vm.getFactoryList(type,0)};
		},
		/**
         * for type to select
         */
		toPay:function(orderId,type,total){
			window.open("harlan_eye_pay.html?id="+orderId+"&type="+type+"&total="+total, "_self");
		},
		toCancel:function(orderId){
			if(vm.har1Show){
				$.ajax({
					url:'/Testing/updateTesting',
					data:{
						testing_id:orderId,
						testing_status:'2'
					},
					type:'post',
					success:function(r){
						//alert("success");
						
						if(confirm("success")){
							vm.getAppList(0,0);
						}
					}
				});
			}else if(vm.har2Show){
					$.ajax({
					url:'/Supervision/updateSupervisionStatusById',
					data:{
						supervision_id:orderId,
						supervision_status:'2'
					},
					type:'post',
					success:function(r){
						//alert("success");
					
						if(confirm("success")){
							vm.getSuperList(0,0);
						}
					}
				});
			}else{
				$.ajax({
					url:'/FactoryAudit/updateFactoryAuditStatus',
					data:{
						factoryAudit_id:orderId,
						factoryAudit_status:'2'
					},
					type:'post',
					success:function(r){
						//alert("success");
						
						if(confirm("success")){
							vm.getFactoryList(0,0);
						}
						
					}
				});
			}
		},
		/**
         * uploadFile
         */
		 fileUpload: function(event,id){
			 var obj=event.target;
			
			 if(vm.har1Show){
				var formData = new FormData();
				formData.append("file",$("#file1")[0].files[0]);
				formData.append("testing_id",id);
				formData.append("fileType",1);
				$.ajax({
                url: "/Testing/uploadFiles",
                type: "post",
                data:formData,
                processData : false,
                contentType : false,
                success: function (r) {
					console.log("fileupload===="+r)
                    if(r.code==200){
						//文件路径
                   alert("uploadFile success");
					}
                },
                error: function (e) {
                    alert(e);
                }
            })
			 };
			 if(vm.har2Show){
				var formData = new FormData();
				formData.append("file",$("#file2")[0].files[0]);
				formData.append("supervision_id",id);
				formData.append("fileType",1);
				$.ajax({
                url: "/Supervision/uploadFiles",
                type: "post",
                data:formData,
                processData : false,
                contentType : false,
                success: function (r) {
					console.log("fileupload===="+r)
                    if(r.code==200){
						//文件路径
                   alert("uploadFile success");
					}
                },
                error: function (e) {
                    alert(e);
                }
            })
			 };
			 if(vm.har3Show){
				var formData = new FormData();
				formData.append("file",$("#file3")[0].files[0]);
				formData.append("factoryAudit_id",id);
				formData.append("fileType",1);
				$.ajax({
                url: "/FactoryAudit/uploadFiles",
                type: "post",
                data:formData,
                processData : false,
                contentType : false,
                success: function (r) {
					console.log("fileupload===="+r)
					if(r.code==200){
						//文件路径
                   alert("uploadFile success");
					}
                },
                error: function (e) {
                    alert(e);
                }
            })
			 };
		 },
		 
		 goOrder:function(order_id){
			 if(vm.har1Show){window.open("harlan_eye_a_user.html?id="+order_id, "_self");}
			 if(vm.har2Show){window.open("harlan_eye_b_user.html?id="+order_id, "_self");}
			 if(vm.har3Show){window.open("harlan_eye_c_user.html?id="+order_id, "_self");}
		 }
	}
});


