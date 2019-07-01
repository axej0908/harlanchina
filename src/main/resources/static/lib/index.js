var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {
            /*nickname: ''*/
        },
        /**part1:顶部搜索框----------start*/
        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',
        //轮播图
        banners: [],
        //价格快递
        priceNews: [],
        //行业资讯
        industryNews: [],
        //class render
        tabShow: true,

        //商品分类
        categories: [],
        //热销产品
        hotSaleGoods: [],
        //热门供应商
        hotSuppliers: [],

        //五大服务对象(用于提交)
        /*IsShow: false,*/
        fiveSer: {
            five_type: 'ser1',
            text: "Factory Audit",
            imgPath: 'imgs/home_fuwu_1.jpg',
            content: 'NO need to on spot，You can get the real information about supplier.',
          	link: 'harlan_eye_c.html'
        },
        fiveSers: [
            {
                five_type: 'ser1',
                text: "Factory Audit",
                imgPath: 'imgs/home_fuwu_1.jpg',
                content: 'NO need to on spot，You can get the real information about supplier.',
              	link: 'harlan_eye_c.html'
            },
            {
                val: "ser2",
                text: "Applicaiton Testing",
                checked: false,
                imgPath: 'imgs/home_fuwu_2.jpg',
                content: 'Harlan joins hands with SGS provide professional and comprehensive testing services to let you know the using effects for the products in advance.',
              	link: 'harlan_eye_a.html'
            },
            {
                val: "ser3",
                text: "Loading Supervision",
                checked: false,
                imgPath: 'imgs/home_fuwu_3.jpg',
                content: 'We will ensure your goods safety through the global network.',
              	link: 'harlan_eye_b.html'
            },
            {
                val: "ser4",
                text: "Supply Chain Management",
                checked: false,
                imgPath: 'imgs/home_fuwu_4.jpg',
                content: 'We render supply chain services for audited customers to reduce your financial pressure.',
              	link: '#'
            },
            /*{
                val: "ser5",
                text: "Complaints and disputes",
                checked: false,
                imgPath: 'imgs/serv_proxy.png',
                content: 'Platform guaranteeThe platform promises the buyer to have no reason to return the goods. It will also solve the problem of supplier default.'
            }*/
        ],
        //店铺
        shop: {},
        advertiseShow: true,
        advertises: [],
        advertise1: {},
        advertise2: {},
        advertise3: {},
        advertise4: {},
        //当前分类下的热销产品
        currCateSales: [],

        //购物车总量
        gross: 0,
        carShow: true
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();

            //价格快递
            vm.preLoadPriceNews();
            //行业资讯
            vm.preLoadIndustryNews();
            //热销产品
            vm.preLoadHotSaleGoods();
            //轮播图
            vm.preLoadBanners();
            //热门供应商
            vm.preLoadHotSuppliers();
            //商品分类
            vm.preLoadCategories();
            //广告栏位
            vm.preloadAdvertises();

            //回车时间触发器
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    vm.redirectSel();
                }
            });

            //购物车总量
            vm.quantity();
        })
    },
    computed: {
        cateSelected: function () {
            var secCates = [];
            if (vm.categories == []) {
                return;
            } else {
                vm.categories.forEach(function (item, index) {
                    if (item.checked) {
                        secCates = item.list;
                    }
                });
            }
            return secCates;
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

                    //供应商 隐藏购物车
                    if(vm.user != null){
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

        //4.查询价格快递 列表
        preLoadPriceNews: function () {
            $.ajax({
                url: "/price/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: 1,
                        limit: 10
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.priceNews = r.data.list;
                    }
                }
            })
        },
       //5.查询行业资讯 列表
        preLoadIndustryNews: function () {
            $.ajax({
                url: "/newsFlash/list",
                type: "post",
                data: {
                    jsonStr: JSON.stringify({
                        page: 1,
                        limit: 10,
                        news_type: "2"
                    })
                },
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.industryNews = r.data.list;
                    }
                }
            })
        },
        //6.商品分类
        queryRecursionList: function () {
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
        //7.查询热销产品
        preLoadHotSaleGoods: function () {
            $.ajax({
                url: "/goodsMall/queryHotSell",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.hotSaleGoods = r.data;
                    }
                }
            })
        },

        //8.轮播图片 preLoad
        preLoadBanners: function () {
            $.ajax({
                url: "/banner/list",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.banners = r.data;
                    }
                }
            })
        },

        //9.导航栏搜索跳转
        redirectSel: function () {
            if(vm.searchParam == null || vm.searchParam == ""){
                alert("Can not be empty!");
                return;
            }

            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if(vm.searchType == "cas"){
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }

        },

        //10.热门供应商
        preLoadHotSuppliers: function () {
            $.ajax({
                url: "/shop/pcHotSuppliers",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.hotSuppliers = r.data;
                    }
                }
            })
        },

        //11.申请服务 提交弹框
       /* applySer: function () {
            if (vm.user == null || vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("please sign in again");
                window.open("login_en.html", "_self");
                return;
            }
            vm.fiveSer.user_id = vm.user.user_id;
            $.ajax({
                url: "/fiveSer/save",
                type: "post",
                data: vm.fiveSer,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.fiveSer = {};
                        vm.IsShow = false;
                        alert("submit succeed!");
                        window.location.href = "index.html";
                    }else {
                        alert("submit failed!");
                        window.location.href = "index.html";
                    }
                }
            })
        },*/

        //12.鼠标悬停 效果选中和赋值申请类型
        sel8value: function (obj) {
            //step1:类型
            vm.fiveSer.five_type = obj.val;
            vm.fiveSer.text = obj.text;
            vm.fiveSer.imgPath = obj.imgPath;
            vm.fiveSer.content = obj.content;
          	vm.fiveSer.link = obj.link;
            //step2:效果
            vm.fiveSers.forEach(function (t) {
                if (t.val == obj.val) {
                    t.checked = true;
                } else {
                    t.checked = false;
                }
            })
        },

        //13.跳转商品详情
        getDetail: function (goods_id) {
            window.open("g_goods_detail.html?goods_id=" + goods_id + "&code=" + 0, "_blank");
        },

        //14.跳转店铺详情
        getShopDetail: function (user_id) {
            if (user_id == null || typeof user_id == "undefined") {
                alert("param error" + user_id);
                return;
            } else {
                //1.  3.21修改之后不用判断 跳转详情的店铺国籍，统一跳转到英文详情页
                vm.queryShopDet(user_id, 0);
            }
        },

        //15.查询店铺详情
        queryShopDet: function (user_id, user_type) {
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {user_id: user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.shop = r.data;
                        //3.跳转
                        if (user_type == 'supplierZh') {
                            window.open("shop_detail2.html?shop=" + base64.encode(JSON.stringify(vm.shop)), "_self");
                        } else {
                            window.open("shop_detail2.html?shop=" + base64.encode(JSON.stringify(vm.shop)), "_self");
                        }
                    }
                }
            });
        },

        //16.preload 商品分类
        preLoadCategories: function () {
            $.ajax({
                url: "/category/recursion",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.categories = r.data;

                        /**
                         * 去除 Animal Extract(动物提取物)
                         */
                        for(var i = 0; i < vm.categories.length; i++){
                            if(vm.categories[i].text == "Natural extract"){
                                for(var j = 0; j < vm.categories[i].list.length; j ++){
                                    if(vm.categories[i].list[j].text == "Animal Extract"){
                                        vm.categories[i].list.splice(j, 1);
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },

        //17.一级分类鼠标悬停事件
        topCateMouse: function (obj, way) {
            if (way < 0) {
                vm.categories.forEach(function (item, index) {
                    item.checked = false;
                })
            } else {
                //step1:query hot sales of current category
                $.ajax({
                    url: "/goodsMall/list",
                    type: "post",
                    data: {
                        jsonStr: JSON.stringify({"goods_type": "hot", one_type: obj.text, "page": 1, limit: "5"})
                    },
                    dataType: "json",
                    success: function (r) {
                        if (r.code == 0) {
                            vm.currCateSales = r.data.list;
                        }
                    }
                });

                vm.categories.forEach(function (item, index) {
                    if (obj.text == item.text) {
                        item.checked = true;
                    } else {
                        item.checked = false;
                    }
                })
            }
        },

        //18.preload four 广告
        preloadAdvertises: function () {
            $.ajax({
                url: '/expo/list',
                type: 'post',
                data: {display: '1'},
                dataType: 'json',
                success: function (r) {
                    if (r.code == 0) {
                        vm.advertises = r.data;
                        if (vm.advertises.length == 4) {
                            vm.advertise1 = vm.advertises[0];
                            vm.advertise2 = vm.advertises[1];
                            vm.advertise3 = vm.advertises[2];
                            vm.advertise4 = vm.advertises[3];
                        } else {
                            alert('error');
                        }
                    }
                }
            })
        },

        //19.跳转到banner详情页
        lnkBanner: function (bannerId) {
            if (typeof bannerId == "undefined") {
                alert("error");
                return;
            }
            window.location.href = "index_banners_det.html?banner_id=" + bannerId;
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

        before : function () {
            if(vm.user == null){
                alert("Please login first!");
                window.open("login_en.html", "_self");
            }else {
                window.open("f_free_find.html", "_self");
            }
        }

    }
});