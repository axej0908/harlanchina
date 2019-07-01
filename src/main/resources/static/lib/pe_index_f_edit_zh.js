var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //商品实体类
        goods: {},
        //选项卡数组
        menus: [
            {id: 1, checked: true, text: "上架"},
            {id: 2, checked: false, text: "下架"},
            {id: 3, checked: false, text: "添加"}
            // {id: 4, checked: false, text: "待审核"}
        ],
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
        packageWays: [""],

        //深度分类数组
        categories: []
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {
        serialSel: function (val) {
            return val + "" + new Date().getTime();
        }
    },
    computed: {
        selection: function () {
            var arr = [];
            vm.categories.forEach(function (item, index) {
                //1.render webPage
                if (item.text == vm.goods.one_type) {
                    item.checked = true;
                    //2.get second cate
                    arr = item.list;
                    //2.1.default
                    arr[0].checked = true;
                } else {
                    item.checked = false;
                }
            });
            return arr;
        }
    },
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
                        window.location.href = "login_zh.html";
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
        },

        //添加商品
        updateGoods: function () {

            //色力(强度)
            vm.goods.color_power = vm.colorPowers.toString();
            //色光
            vm.goods.color_light = vm.colorLights.toString();
            //包装方式
            vm.goods.package_opt = vm.packageWays.toString();
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
         * preload categories
         */
        preLoadOneCategory: function () {
            $.ajax({
                url: "/category/recursion",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.categories = r.data;
                        vm.categories[0].checked = true;
                    }
                }
            })
        }
    }
});


// goods.1.1上传文件  上半部分
function upload_file_up(obj) {
    var nme = $(obj).get(0).value.split("\\");
    $(obj).parent().siblings(".file_url_b").html(nme[nme.length - 1]);

    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("请选择文件");
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
                } else if (inputId == "production_state") {
                    vm.goods.production_state = r.data;
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
    $(obj).parent().siblings(".file_url").html(nme[nme.length - 1]);

    var inputId = obj.id;
    if (!obj.files[0].size > 0) {
        alert("请选择文件");
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
                } else if (inputId == "detect_uv") {
                    vm.goods.detect_uv = r.data;
                } else if (inputId == "detect_colourimeter") {
                    vm.goods.detect_colourimeter = r.data;
                } else if (inputId == "detect_video") {
                    vm.goods.detect_video = r.data;
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

