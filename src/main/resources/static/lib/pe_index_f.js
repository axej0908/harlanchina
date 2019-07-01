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
            {id: 1, checked: true, text: "Up"},
            {id: 2, checked: false, text: "Down"},
            {id: 3, checked: false, text: "Add"}
        ],
        //运输方式静态数据
        transport_opts: [
            {text: "sea"},
            {text: "land"},
            {text: "air"}
        ],

        /**
         * 动态选项卡 start
         */
        colorLights: [""],
        colorPowers: [""],
        packageWays: [""],

        //预加载一级分类数组
        oneTypeMenus: [],

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.preLoadOneCategory();
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
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.open("index.html", "_self");
                    } else {

                        vm.user.biz_type == "buyer_en" ? vm.carShow = true : vm.carShow = false;

                        vm.preLoadStartSale(0);
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
                        window.open("login_en.html", "_self");
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
                        "user_id": vm.user.user_id,
                        "goods_state": "wait_audit",
                        "goods_type": "others"
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
                        "user_id": vm.user.user_id,
                        "goods_state": "up",
                        "goods_type": "others"
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
                        "goods_state": "down",
                        "goods_type": "others"
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
            //english name
            if(vm.goods.goods_name == null || vm.goods.goods_name == "undefined" || vm.goods.goods_name == ""){
                alert("english name is required!");
                return;
            }
            //chainese name
            if(vm.goods.goods_name_en == null || vm.goods.goods_name_en == "undefined" || vm.goods.goods_name_en == ""){
                alert("chainese name is required!");
                return;
            }
            //one type
            if(vm.goods.one_type == null || vm.goods.one_type == "undefined" || vm.goods.one_type == ""){
                alert("Product classification is required!");
                return;
            }
            //two type
            if(vm.goods.two_type == null || vm.goods.two_type == "undefined" || vm.goods.two_type == ""){
                alert("Product classification is required!");
                return;
            }
            //cino
            if(vm.goods.cino == null || vm.goods.cino == "undefined" || vm.goods.cino == ""){
                alert("cino is required!");
                return;
            }
            //cas
            if(vm.goods.cas == null || vm.goods.cas == "undefined" || vm.goods.cas == ""){
                alert("cino is required!");
                return;
            }
            //molecular_weight
            if(vm.goods.molecular_weight == null || vm.goods.molecular_weight == "undefined" || vm.goods.molecular_weight == ""){
                alert("Molecular weight is required!");
                return;
            }
            //pas
            if(vm.goods.pas == null || vm.goods.pas == "undefined" || vm.goods.pas == ""){
                alert("PSA is required!");
                return;
            }
            //Accurate quality
            if(vm.goods.precise_quality == null || vm.goods.precise_quality == "undefined" || vm.goods.precise_quality == ""){
                alert("precise_quality is required!");
                return;
            }
            //specifications
            if(vm.goods.specification == null || vm.goods.specification == "undefined" || vm.goods.specification == ""){
                alert("specifications is required!");
                return;
            }
            //goods_purity
            if(vm.goods.goods_purity == null || vm.goods.goods_purity == "undefined" || vm.goods.goods_purity == ""){
                alert("Purity is required!");
                return;
            }
            //goods_deliver
            if(vm.goods.goods_deliver == null || vm.goods.goods_deliver == "undefined" || vm.goods.goods_deliver == ""){
                alert("delivery time is required!");
                return;
            }
            //goods_num
            if(vm.goods.goods_num == null || vm.goods.goods_num == "undefined" || vm.goods.goods_num == ""){
                alert("inventory is required!");
                return;
            }
            //current_price
            if(vm.goods.current_price == null || vm.goods.current_price == "undefined" || vm.goods.current_price == ""){
                alert("selling price is required!");
                return;
            }
            //market_price
            if(vm.goods.market_price == null || vm.goods.market_price == "undefined" || vm.goods.market_price == ""){
                alert("market price is required!");
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
                        vm.goods = {};
                        window.open("pe_index_f.html", "_self");
                    }else {
                        alert("fail to add，Product name no repetition allowed!");
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
                                    alert("please start a shop first");
                                    window.open("sale_firm_store_flow.html", "_self");
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
                        vm.oneTypeMenus = r.data;
                    }
                }
            })
        },

        /**
         * 二级分类渲染效果
         */
        renderSecCate: function () {
            vm.categories.forEach(function (item, index) {
                //1.render webPage
                if (item.text == vm.goods.one_type) {
                    item.checked = true;
                    //2.get second cate
                    vm.secCateList = item.list;
                    //2.1.default
                    vm.secCateList[0].checked = true;
                } else {
                    item.checked = false;
                }
            });
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
        delGoods: function (obj) {
            if (typeof obj.goods_id == 'undefined') {
                alert("unknown error");
                return;
            }
            if(window.confirm("Please confirm whether to delete it？")){
                $.ajax({
                    url: "/goodsMall/delete",
                    type: "post",
                    data: {goods_id: obj.goods_id},
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            alert("success");
                            vm.preLoadStartSale(0);
                            vm.preLoadStopSales(0);
                        }else {
                            alert("fail");
                        }
                    }
                })
            }
        },

        /**
         * 编辑商品
         */
        editGoods: function (obj) {
            var goods = base64.encode(JSON.stringify(obj));
            window.open("pe_index_f_edit.html?goods=" + goods, "_self");
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

