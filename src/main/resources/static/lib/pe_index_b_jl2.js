var vm = new Vue({
    el: "#lava",
    data: {
        user: {},
        address: {},
        seller: {},
        order: {},
        //免费监理信息
        super:[],
        //免费监理的物流信息
        watcher: {},
        transports: [],
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',
        redirectUrl: '#'
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters: {
        formatStatus: function (val) {
            if (val == "1") {
                return "wait pay";
            }
            if (val == "2") {
                return "wait for deliver";
            }
            if (val == "3") {
                return "wait for receiving";
            }
            if (val == "4") {
                return "completed";
            }
        },

        /**
         * 1.截取日期
         */
        subPrefix: function (val) {
            if (typeof val == "undefined") {
                return val;
            } else {
                return val.split(" ")[0];
            }
        },

        /**
         * 2.截取时间
         */
        subSuffix: function (val) {
            if (typeof val == "undefined") {
                return val;
            } else {
                return val.split(" ")[1];
            }
        }
    },
    methods: {
        getCurrentUser: function () {
            vm.redirectUrl = getQueryString("lnk") != "noExistThisParam" ? getQueryString("lnk") + ".html" : "login_en.html";
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        alert("please sign in again");
                        window.location.href = vm.redirectUrl;
                    } else {
                        //订单id
                        var order_id = getQueryString("order_id");
                        vm.preLoadOrderDetail(order_id);
                        //订单下的所有监理详情
                        vm.supervisor(order_id);
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
                        window.location.href = vm.redirectUrl;
                    }
                }
            })
        },

        //3.导航栏搜索跳转
        redirectSel: function () {
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

        /**
         * 2.preload consignee address info
         */
        preLoadAddress: function () {
            $.ajax({
                url: "/address/detail",
                type: "post",
                data: {"addr_id": vm.order.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.address = r.data;
                    }
                }
            })
        },

        /**
         * 3.preload 订单详情
         */
        preLoadOrderDetail: function (order_id) {
            $.ajax({
                url: "/order/detail",
                type: "post",
                data: {"order_id": order_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.order = r.data;
                        //1.加载地址
                        if (vm.order != null && typeof vm.order.addr_id != "undefined") {
                            vm.preLoadAddress();
                        }
                        //2.加载卖家信息
                        if (vm.order != null && typeof vm.order.user_id != "undefined") {
                            vm.preLoadSellerInfo();
                        }
                        //3.加载免费监理物流单号以及 数组信息
                        if (vm.order != null && typeof vm.order.supv_id != "undefined") {
                            vm.preLoadFreeWatch();
                        }
                    }
                }
            })
        },

        /**
         * 4.preload 卖家信息
         */
        preLoadSellerInfo: function () {
            $.ajax({
                url: "/shop/detail",
                type: "post",
                data: {"user_id": vm.order.user_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.seller = r.data;
                    }
                }
            })
        },


        /**
         * 5.查询免费监理信息(包含物流信息)
         */
        preLoadFreeWatch: function () {
            $.ajax({
                url: "/freeSupervision/detail",
                type: "post",
                data: {"supv_id": vm.order.supv_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.watcher = r.data;
                        if (vm.watcher != null) {
                            var arr = [];
                            vm.watcher.logisticsBeans.forEach(function (item) {
                                arr.push(item.os_time.split(" ")[0]);
                            });
                            var sets = new Set(arr);

                            var times = [];
                            sets.forEach(function (set) {
                                vm.watcher.logisticsBeans.forEach(function (item) {
                                    if (set == item.os_time.split(" ")[0]) {
                                        var strLength = item.os_files.length;
                                        var fileShow = false;
                                        var filesSrc = [];
                                        if (strLength != 0 && typeof strLength != "undefined") {
                                            fileShow = true;
                                            filesSrc = item.os_files.split(",");
                                        }
                                        var obj = {
                                            os_content: item.os_content,
                                            time: item.os_time.split(" ")[1],
                                            fileShow: fileShow,
                                            filesSrc: filesSrc
                                        };
                                        times.push(obj);
                                    }
                                });
                                vm.transports.push({date: set, times: times});
                                times = [];
                            });
                        }
                    }
                }
            })
        },
        /**
         * 订单下所有免费监理信息
         * @param order_id
         */
        supervisor : function (order_id) {
            $.ajax({
                url:'/orderSuper/listOrderSuper',
                type:"post",
                data:{
                    order_id:order_id
                },
                datatype:"json",
                success : function (r) {
                    if(r.code == 0){
                        vm.super = r.data;
                        vm.listData(r.data);
                        
                    }
                }
            })
        },
        listData : function (data) {
            var str = '';
            for(var i = 0; i < data.length; i++){
                str += '<tr class="tal_row">';
                str += '    <td>'+data[i].super_time+'</td>';
                str += '    <td>'+data[i].super_text+'</td>';
                str += '    <td>';
                str += '        <img src="'+data[i].super_url+'">';
                str += '    </td>';
                str += '</tr>';
            }
            $("#list").html(str);
        }
    }
});
