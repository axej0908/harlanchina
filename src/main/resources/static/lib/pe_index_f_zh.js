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
        //goods of waiting audit
        auditSalesList: [],
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

        /**
         * 1.query goods of wait audit
         */
        loadAuditGoods: function (currPage) {
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
                        "goods_type":"other",
                        "user_id": vm.user.user_id,
                        "goods_state": "wait_audit"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        if (flag) {
                            $("#pagerBarAuditSales").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 0,
                                num_display_entries: 2,
                                callback: vm.preLoadStartSale//回调函数
                            });
                            flag = false;
                        }
                        vm.auditSalesList = r.data.list;
                    }
                }
            })
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
                        "goods_type":"other",
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


        /**
         * 编辑商品
         */
        updateGoods : function(goods){
            /*window.open("pe_index_f_gd_edit_zh.html", "_self ");*/
            window.location.href = "pe_index_f_edit_zh.html?goods="+base64.encode(JSON.stringify(goods));
        },



        /**
         * 删除商品
         */
        delGoods: function (obj) {
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            if(window.confirm("请确认是否删除？")){
                $.ajax({
                    url: "/goodsMall/delete",
                    type: "post",
                    data: {goods_id: obj.goods_id},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            alert("删除成功!");
                            vm.preLoadStartSale(0);
                            vm.preLoadStopSales(0);
                        }else {
                            alert("删除失败");
                        }
                    }
                })
            }
        },




        //添加商品
        saveGoods: function () {
            //english name
            if(vm.goods.goods_name == null || vm.goods.goods_name == "undefined" || vm.goods.goods_name == ""){
                alert("英文名称不能为空!");
                return;
            }
            //chainese name
            if(vm.goods.goods_name_en == null || vm.goods.goods_name_en == "undefined" || vm.goods.goods_name_en == ""){
                alert("中文名称不能为空!");
                return;
            }
            //one type
            if(vm.goods.one_type == null || vm.goods.one_type == "undefined" || vm.goods.one_type == ""){
                alert("产品分类不能为空!");
                return;
            }
            //two type
            if(vm.goods.two_type == null || vm.goods.two_type == "undefined" || vm.goods.two_type == ""){
                alert("产品分类不能为空!");
                return;
            }
            //cino
            if(vm.goods.cino == null || vm.goods.cino == "undefined" || vm.goods.cino == ""){
                alert("CINO不能为空!");
                return;
            }
            //cas
            if(vm.goods.cas == null || vm.goods.cas == "undefined" || vm.goods.cas == ""){
                alert("CAS不能为空!");
                return;
            }
            //molecular_weight
            if(vm.goods.molecular_weight == null || vm.goods.molecular_weight == "undefined" || vm.goods.molecular_weight == ""){
                alert("分子量不能为空!");
                return;
            }
            //pas
            if(vm.goods.pas == null || vm.goods.pas == "undefined" || vm.goods.pas == ""){
                alert("PSA不能为空!");
                return;
            }
            //Accurate quality
            if(vm.goods.precise_quality == null || vm.goods.precise_quality == "undefined" || vm.goods.precise_quality == ""){
                alert("精确质量不能为空!");
                return;
            }
            //specifications
            if(vm.goods.specification == null || vm.goods.specification == "undefined" || vm.goods.specification == ""){
                alert("货物规格不能为空!");
                return;
            }
            //goods_purity
            if(vm.goods.goods_purity == null || vm.goods.goods_purity == "undefined" || vm.goods.goods_purity == ""){
                alert("商品纯度不能为空!");
                return;
            }
            //goods_deliver
            if(vm.goods.goods_deliver == null || vm.goods.goods_deliver == "undefined" || vm.goods.goods_deliver == ""){
                alert("商品货期不能为空!");
                return;
            }
            //goods_num
            if(vm.goods.goods_num == null || vm.goods.goods_num == "undefined" || vm.goods.goods_num == ""){
                alert("库存量不能为空!");
                return;
            }
            //current_price
            if(vm.goods.current_price == null || vm.goods.current_price == "undefined" || vm.goods.current_price == ""){
                alert("商品价格不能为空!");
                return;
            }
            //market_price
            if(vm.goods.market_price == null || vm.goods.market_price == "undefined" || vm.goods.market_price == ""){
                alert("市场价格不能为空!");
                return;
            }


            //色力(强度)
            vm.goods.color_power = vm.colorPowers.toString();
            //色光
            vm.goods.color_light = vm.colorLights.toString();
            //包装方式
            vm.goods.package_opt = vm.packageWays.toString();
            //上传人
            vm.goods.user_id = vm.user.user_id;
            //商品类别
            vm.goods.goods_type = "others_normal";
            $.ajax({
                url: "/goodsMall/save",
                type: "post",
                data: vm.goods,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("操作成功!");
                        vm.goods = {};
                        window.open("pe_index_f_zh.html", "_self");
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
                        //request controller
                        $.ajax({
                            url: "/shop/detail",
                            type: "post",
                            data: {user_id: vm.user.user_id},
                            dataType: "json",
                            success: function (r) {
                                if (r.code == 0) {
                                    vm.tabsShow = 'preSave'
                                } else if (r.code == 500) {
                                    if (vm.user.user_type == 'per') {
                                        window.location.href = "sale_person_store_form1.html";
                                    } else if (vm.user.user_type == 'com') {
                                        window.location.href = "sale_firm_store_form1.html";
                                    } else {
                                        alert("exception");
                                    }
                                }
                            }
                        });
                    }
                    if (obj.id == 4) {
                        vm.loadAuditGoods();
                        vm.tabsShow = 'auditSales';
                    }
                } else {
                    item.checked = false;
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
        },


        /**
         * 三方商品审核
         * @param obj
         */
        putawayCheck : function(obj){
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            $.ajax({
                url: '/goodsMall/putawayCheck',
                data: {goods_id: obj.goods_id, goods_state: "down", status: "0"},
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("success");
                        vm.preLoadStartSale(0);
                        vm.preLoadStopSales(0);
                    }else {
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
                data: {goods_id: obj.goods_id, goods_state: "wait_audit"},
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
            window.open("pe_index_f_gd_edit_zh.html?goods=" + goods, "_self");
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

