var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        shop: {},
        store: {},

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();

            vm.quantity();

            vm.detail();
        })
    },
    filters: {},
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
                        window.location.href = "login_en.html";
                    }else {
                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;
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
         * 2.上传图片
         * @param event
         */
        uploadImg: function (event) {
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
                    if (inputId == "com_logo") {
                        vm.shop.com_logo = r.data;
                        vm.store.com_logo = r.data;
                    }
                    if (inputId == "com_license") {
                        vm.shop.com_license = r.data;
                        vm.store.com_license = r.data;
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 详情
         */
        detail : function () {
            $.ajax({
                url: '/shop/detail',
                data: {
                    "user_id": vm.user.user_id
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        vm.shop = r.data;
                    }else {
                        vm.shop = {};
                    }
                }
            })
        },


        /**
         * 修改
         */
        submitPaper: function () {
            if (typeof vm.user.user_id == "undefined"){
                alert("error");
                window.location.href = "login_en.html";
            }else {
                vm.store.user_id = vm.user.user_id;
                vm.store.shop_state = "1";
                vm.store.shop_id = vm.shop.shop_id;
                vm.store.contact_name = vm.shop.contact_name;
                vm.store.contact_mobile = vm.shop.contact_mobile;
                vm.store.com_name = vm.shop.com_name;
                vm.store.com_addr = vm.shop.com_addr;
                vm.store.shop_name = vm.shop.shop_name;

                $.ajax({
                    url: "/shop/update",
                    type: "post",
                    data: vm.store,
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            vm.shop = r.data;
                            window.location.href = "sale_person_store_submit1.html";
                        }else {
                            alert("failure");
                        }
                    }
                })
            }
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
         * 店铺信息链接
         */
        lnkShopInfoUtils: function () {
            if (typeof vm.user.user_id == "undefined") {
                alert("error");
                return;
            }
            var url = "#";
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: vm.user.user_id},
                dataType: "json",
                asycn: false,
                success: function (r) {
                    if (r.code == 0) {
                        vm.shop = r.data;
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            /*vm.shop.shop_state == "2" ? url = "sale_person_store_info.html" : url = "sale_person_store_submit.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_person_store_submit.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_person_store_info.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_person_store_edit.html";
                            }
                        }else if (vm.user.user_type == "com"){
                            /*vm.shop.shop_state == "2" ? url = "sale_firm_store_info.html" : url = "sale_firm_store_submit.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_firm_store_submit.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_firm_store_info.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_firm_store_edit.html";
                            }
                        }
                    } else if (r.code == 500) {
                        //店铺不存在
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            url = "sale_person_store_flow.html"
                        }else if (vm.user.user_type == "com"){
                            url = "sale_firm_store_flow.html"
                        }
                    }
                    window.location.href = url;
                }
            })
        }

    }
});