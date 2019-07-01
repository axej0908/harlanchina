var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        shop: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {},
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href = "login_zh.html";
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
                        window.location.href = "login_zh.html";
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
                    }else if (inputId == "com_license") {
                        vm.shop.com_license = r.data;
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 3.提交开店申请
         */
        submitPaper: function () {
            if (typeof vm.user.user_id == "undefined"){
                alert("error");
                window.location.href = "login_zh.html";
            }else {
                vm.shop.user_id = vm.user.user_id;
                $.ajax({
                    url: "/shop/openShop",
                    type: "post",
                    data: vm.shop,
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
                            /*vm.shop.shop_state == "2" ? url = "sale_person_store_info1.html" : url = "sale_person_store_submit1.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_person_store_submit1.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_person_store_info1.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_person_store_edit1.html";
                            }
                        }else if (vm.user.user_type == "com"){
                            /*vm.shop.shop_state == "2" ? url = "sale_firm_store_info1.html" : url = "sale_firm_store_submit1.html";
                            vm.shop.shop_state == "3" ? url = "sale_firm_store_edit1.html" : url = "sale_firm_store_submit1.html";*/
                            if(vm.shop.shop_state == "1"){
                                url = "sale_firm_store_submit1.html";
                            }else if(vm.shop.shop_state == "2"){
                                url = "sale_firm_store_info1.html";
                            }else if(vm.shop.shop_state == "3"){
                                url = "sale_firm_store_edit1.html";
                            }
                        }
                    } else if (r.code == 500) {
                        //店铺不存在
                        //判断用户类别
                        if (vm.user.user_type == "per"){
                            //2是正常运行状态
                            url = "sale_person_store_flow1.html"
                        }else if (vm.user.user_type == "com"){
                            url = "sale_firm_store_flow1.html"
                        }
                    }
                    window.location.href = url;
                }
            })
        }

    }
});

