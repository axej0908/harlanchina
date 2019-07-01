var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        cargo: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
            vm.details();
        })
    },
    methods: {
        //获取用户信息
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                    }
                }
            });
        },
        //退出
        logout: function () {
            $.ajax({
                url: "/log/logout",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("sign out success!");
                        window.location.href = "index.html";
                    }
                }
            })
        },
        //详情
        details : function () {
            var cargo_id = getQueryString("cargo_id");
            $.ajax({
                url: "/cargo/detail",
                type: "post",
                data: {
                    "cargo_id":cargo_id
                },
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        vm.cargo = data.data;
                    }
                }
            })
        },
        //更新
        update : function () {
            //品质详情
            vm.qualityUpdate();
            //金属含量
            vm.metalUpdate();
            //货物信息
            vm.cargoUpdate();
        },
        //更新货物信息
        cargoUpdate : function () {
            //删除品质详情
            delete vm.cargo.qualityBean;
            //删除金属含量
            delete vm.cargo.metalBean;
            delete vm.cargo.reportBean;
            $.ajax({
                url: "/cargo/update",
                type: "post",
                data: vm.cargo,
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        alert("更新成功");
                        window.location.href = "pe_index_j.html";
                    }else {
                        alert("货物信息更新失败");
                    }
                }
            })
        },
        //更新品质详情
        qualityUpdate : function () {
            $.ajax({
                url: "/quality/update",
                type: "post",
                data: vm.cargo.qualityBean,
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        console.log("品质详情更新成功");
                    }else {
                        alert("品质详情更新失败");
                    }
                }
            })
        },
        //更新金属含量
        metalUpdate : function () {
            $.ajax({
                url: "/metal/update",
                type: "post",
                data: vm.cargo.metalBean,
                dataType: "json",
                success: function (data) {
                    if (data.code == 0) {
                        console.log("金属含量更新成功");
                    }else {
                        alert("金属含量更新失败");
                    }
                }
            })
        }
    }
});