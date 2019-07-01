var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        addr: {is_default:0},
        addrs: []

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    filters:{
        formatDefault:function (param) {
            if (param == '1'){
                return 'true';
            }else if (param == '0') {
                return 'false';
            }else {
                return 'error';
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
                        alert("please sign in again!");
                        window.open("login_en.html", "_self");
                        return;
                    }
                    //地址列表查询
                    vm.preLoadAddrs();
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
        //加载当前登录人收货地址列表
        preLoadAddrs: function () {
            $.ajax({
                url: "/address/list",
                type: "post",
                data: {"jsonStr": JSON.stringify({"user_id": vm.user.user_id, "page": 1, "limit": 100})},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.addrs = r.data.list;
                    }
                }
            })
        },
        //删除
        del: function (item) {
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "addr_id not exist");
                return;
            }
            $.ajax({
                url: "/address/delete",
                type: "post",
                data: {"addr_id": item.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.preLoadAddrs();
                    }
                }
            })
        },
        //添加或者修改
        saveOrUpdate: function () {
            vm.addr.province = $(".city-picker-selector").find(".province a").html();
            vm.addr.city = $(".city-picker-selector").find(".city a").html();
            vm.addr.area = $(".city-picker-selector").find(".district a").html();
            if (typeof vm.user.user_id == "undefined" || vm.user.user == 0) {
                alert("time out");
                window.open("login_en.html","_self");
                return;
            }
            vm.addr.user_id = vm.user.user_id;
            console.log("save update的地址参数：" + JSON.stringify(vm.addr));
            $.ajax({
                url: typeof vm.addr.addr_id == "undefined" ? "/address/save" : "/address/update",
                type: "post",
                data: vm.addr,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("success!");
                        vm.addr = {};
                        vm.preLoadAddrs();
                    }
                }
            })
        },
        //详情
        detail: function (item) {
            if (typeof item.addr_id == "undefined") {
                alert(item.addr_id + "addr_id not exist");
                return;
            }

            $.ajax({
                url: "/address/detail",
                type: "post",
                data: {"addr_id": item.addr_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.addr = r.data;
                        $(".city-picker-selector").find(".province a").html(vm.addr.province);
                        $(".city-picker-selector").find(".city a").html(vm.addr.city);
                        $(".city-picker-selector").find(".district a").html(vm.addr.area);
                    }
                }
            })
        }
    }
});
