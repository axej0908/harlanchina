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
                        window.open("login_en.html", "_self");
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
                        window.open("pe_index_f.html", "_self");
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

// goods.1.1上传文件  上半部分
function upload_file_up(obj) {
    var nme = $(obj).get(0).value.split("\\");
    /*$(obj).parent().siblings(".file_url_b").html(nme[nme.length - 1]);*/

    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("error");
        return;
    } else {
        $.ajaxFileUpload({
            url: "/file/upload",
            data: {
                "user_id": vm.user.user_id
            },
            secureuri: false,
            fileElementId: obj.id,
            dataType: 'json',
            success: function (r, status) {
                //赋值
                if (inputId == "application_scheme") {
                    vm.goods.application_scheme = r.data;
                    alert("success");
                } else if (inputId == "production_state") {
                    vm.goods.production_state = r.data;
                    alert("success");
                }
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
}

// goods.1.2上传文件 下半部分
function upload_file_down(obj) {
    var nme = $(obj).get(0).value.split("\\");
    /*$(obj).parent().siblings(".file_url").html(nme[nme.length - 1]);*/

    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("error");
        return;
    } else {
        $.ajaxFileUpload({
            url: "/file/upload",
            data: {
                "user_id": vm.user.user_id
            },
            secureuri: false,
            fileElementId: obj.id,
            dataType: 'json',
            success: function (r, status) {
                //赋值
                if (inputId == "detect_report") {
                    vm.goods.detect_report = r.data;
                    alert("success");
                } else if (inputId == "detect_uv") {
                    vm.goods.detect_uv = r.data;
                    alert("success");
                } else if (inputId == "detect_colourimeter") {
                    vm.goods.detect_colourimeter = r.data;
                    alert("success");
                } else if (inputId == "detect_video") {
                    vm.goods.detect_video = r.data;
                    alert("success");
                }
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
}

//2.上传图片
function upload_imgs(obj) {
    var $file = $(obj);
    var fileObj = $file[0];
    var windowURL = window.URL || window.webkitURL;
    var dataURL;
    var $img = $(obj).parent();
    if (fileObj && fileObj.files && fileObj.files[0]) {
        dataURL = windowURL.createObjectURL(fileObj.files[0]);
        $img.css('background-image', "url(" + dataURL + ")");
    }
    $img.find("span").html("");


    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("请选择文件！");
        return;
    } else {
        $.ajaxFileUpload({
            url: "/file/upload",
            data: {
                "user_id": vm.user.user_id
            },
            secureuri: false,
            fileElementId: obj.id,
            dataType: 'json',
            success: function (r, status) {
                //赋值
                if (inputId == "detect_sample_imgs") {
                    vm.goods.detect_sample_imgs = r.data;
                } else if (inputId == "detect_bulk_imgs") {
                    vm.goods.detect_bulk_imgs = r.data;
                } else if (inputId == "product_picture") {
                    vm.goods.product_picture = r.data;
                }
            },
            error: function (r, status, e) {
                alert(e);
            }
        })
    }
}