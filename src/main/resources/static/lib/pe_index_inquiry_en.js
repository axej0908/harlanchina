var flag = true;
var limit = 5;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        state:"-1",
        enquiries: [],

        enquire: {},

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.currentUser();

            vm.quantity();
        })
    },
    methods: {


        /**
         * 4.supplier handle inquiry
         */
        processInquiry: function (en_id) {
            if (en_id == 0 || typeof en_id == "undefined"){
                alert("error");
                return;
            }

            $.ajax({
                url: "/tarEnquiry/update",
                type: "post",
                data: {en_id:en_id,tar_status:"1"},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.preloadEnquiriesToMe();
                    }
                }
            })
        },

        /**
         * 3.query all enquiries to me and by condition unprocessed
         */
        preloadEnquiriesToMe: function (currPage) {
            if (vm.user == null || typeof vm.user.user_id == "undefined") {
                alert("unknown error!");
                return;
            }
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/tarEnquiry/pager",
                type: "post",
                data: {"user_id": vm.user.user_id, "page": currPage + 1, "limit": limit, "tar_status": vm.state},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#page").pagination(r.count, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 3,
                                callback: vm.preloadEnquiriesToMe
                            });
                            flag = false;
                        }
                        vm.enquiries = r.data;
                    }
                }
            })
        },

        /**
         * 2.sign out
         */
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
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
         * 1.preload current user info
         */
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
                        if (vm.user == null) {
                            alert("please sign in again");
                            window.open("login_en.html", "_self");
                            return;
                        } else {
                            //供应商 隐藏购物车
                            vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                            vm.preloadEnquiriesToMe();
                        }
                    }
                }
            })
        },


        /**
         * 上传图片
         * @param event
         */
        uploadImg: function (event, en_id) {
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
                    if (inputId == "enquiry_file") {
                        vm.enquire.enquiry_file = r.data;
                        vm.enquire.en_id = en_id;
                        vm.editUploadFile();
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 修改上传文件
         */
        editUploadFile : function () {
            $.ajax({
                url: '/tarEnquiry/update',
                data: vm.enquire,
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
        }
    }
});