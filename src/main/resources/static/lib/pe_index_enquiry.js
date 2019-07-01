var limit = 10;
var flag = true;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //上架startSale、下架stopSales、添加商品preSave选项卡显示(默认显示上架商品)
        tabsShow: "startSale",
        //商品实体类
        goods: {},
        //上架商品接收
        startSaleList: [],
        //下架商品接收集合
        stopSalesList: [],
        //选项卡数组
        menus: [
            {id: 1, checked: true, text: "已上架的商品"},
            {id: 2, checked: false, text: "已下架的商品"},
            {id: 3, checked: false, text: "添加商品"}
        ],
        menusEn:[
            {id: 1, checked: true, text: "up"},
            {id: 2, checked: false, text: "down"},
            {id: 3, checked: false, text: "add"}
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

        //一级分类数组
        categories: [
            {text:'Alcohols',checked:true},
            {text:'Alkenes',checked:false},
            {text:'Amino Acid Derivatives',checked:false},
            {text:'Aromatic Compounds',checked:false},
            {text:'Boronic Acid Derivatives',checked:false},
            {text:'Carbonyl Compounds',checked:false},
            {text:'Chiral Compounds',checked:false},
            {text:'Halides',checked:false},
            {text:'Heterocycles',checked:false},
            {text:'Inorganics',checked:false},
            {text:'Nitrogen Compounds',checked:false},
            {text:'Organosilicons',checked:false},
            {text:'Phosphorus Compounds',checked:false},
            {text:'Sulphur Compounds',checked:false}
        ]
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
                    } else {
                        vm.preLoadStartSale(0);
                        vm.preLoadOneCategory();
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

        //预加载上架商品列表
        preLoadStartSale: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": currPage + 1,
                        "limit": limit,
                        "user_id": vm.user.user_id,
                        "goods_state": "up"
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
                        vm.startSaleList = r.data.list;
                    }
                }
            })
        },
        //预加载下架商品列表
        preLoadStopSales: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/goodsMall/list",
                type: "post",
                data: {
                    "jsonStr": JSON.stringify({
                        "page": currPage + 1,
                        "limit": limit,
                        "user_id": vm.user.user_id,
                        "goods_state": "down"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarStotSales").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadStartSale//回调函数
                            });
                            flag = false;
                        }
                        vm.stopSalesList = r.data.list;
                    }
                }
            })
        },
        //添加商品
        saveGoods: function () {
            //色力(强度)
            vm.goods.color_power = vm.colorPowers.toString();
            //色光
            vm.goods.color_light = vm.colorLights.toString();
            //包装方式
            vm.goods.package_opt = vm.packageWays.toString();
            //上传人
            vm.goods.user_id = vm.user.user_id;
            //商品类别
            vm.goods.goods_type = "others";
            $.ajax({
                url: "/goodsMall/save",
                type: "post",
                data: vm.goods,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.goods = {};
                    }
                }
            })
        },

        /**
         * 选项卡点击切换事件
         */
        selMenu: function (obj) {
            vm.menus.forEach(function (item, index) {
                if (item.text == obj.text) {
                    //头部样式效果切换
                    item.checked = true;
                    //内容显示隐藏控制
                    if (obj.id == 1) {
                        vm.tabsShow = 'startSale'
                    }
                    if (obj.id == 2) {
                        vm.tabsShow = 'stopSales';
                        vm.preLoadStopSales(0);
                    }
                    if (obj.id == 3) {
                        vm.tabsShow = 'preSave'
                    }
                } else {
                    item.checked = false;
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
         * 上架商品
         */
        pushShelf: function (obj) {
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            $.ajax({
                url: "/goodsMall/onShelve",
                type: "post",
                data: {goods_id: obj.goods_id,goods_state:"wait_audit"},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.preLoadStartSale(0);
                        vm.preLoadStopSales(0);
                    }
                }
            })
        },

        /**
         * 下架商品
         */
        pullShelf: function (obj) {
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            $.ajax({
                url: "/goodsMall/offShelve",
                type: "post",
                data: {goods_id: obj.goods_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.preLoadStartSale(0);
                        vm.preLoadStopSales(0);
                    }
                }
            })
        },

        /**
         * 删除商品
         */
        del: function (obj) {
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            $.ajax({
                url: "/Merchandise/delete",
                type: "post",
                data: {goods_id: obj.goods_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.preLoadStartSale(0);
                        vm.preLoadStopSales(0);
                    }
                }
            })
        },

        /**
         * 编辑商品
         */
        edit: function (obj) {
            var goods = base64.encode(JSON.stringify(obj));
            window.open("pe_index_f_gd_edit_zh.html?goods=" + goods,"_self");
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

