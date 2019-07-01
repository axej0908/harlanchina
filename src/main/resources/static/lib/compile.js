var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        cargo: {},
        quality: {},
        metal: {},
        c: {},
        q: {},
        m: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods: {
        getCurrentUser: function () {
            //获取用户信息
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.user = r.data;
                        vm.selectMyCargo();
                    }
                    if (r.data.user_id === 0) {
                        $(".land_u").hide();
                        $(".enter_div").show();
                    } else {
                        $(".enter_div").hide();
                        $(".land_u").show();
                    }
                }
            });
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
                    }
                }
            })
        },
        selectMyCargo: function () {
            var cargo_id = getQueryString("cargo_id");
            $.ajax({
                url: "/cargo/detail",
                type: "post",
                data: {
                    "cargo_id": cargo_id
                },
                dataType: "json",
                success: function (r) {
                    vm.cargo.cargo_id = r.data.cargo_id;
                    vm.cargo.cargo_name = r.data.cargo_name;
                    vm.cargo.cargo_purity = r.data.cargo_purity;
                    vm.cargo.delivery_time = r.data.delivery_time;
                    vm.cargo.cargo_num = r.data.cargo_num;
                    vm.cargo.cargo_package = r.data.cargo_package;
                    document.getElementById("cargo_package_spec").value = vm.cargo.cargo_package;
                    vm.cargo.transport_opt = r.data.transport_opt;
                    document.getElementById("transport_opt_spec").value = vm.cargo.transport_opt;
                    vm.cargo.payment_opt = r.data.payment_opt;
                    vm.cargo.market_price = r.data.market_price;
                    vm.cargo.create_time = r.data.create_time;
                    vm.metal = r.data.metalBean;
                    vm.quality = r.data.qualityBean;
                }
            });
        },
        update: function () {
            vm.cargo.cargo_package = document.getElementById("cargo_package_spec").value;
            vm.cargo.transport_opt = document.getElementById("transport_opt_spec").value;
            $.ajax({
                url: "/cargo/update",
                type: "post",
                data: vm.cargo,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.upateQuality();
                    }
                }
            });
        },
        upateQuality: function () {
            console.log(vm.quality);
            $.ajax({
                url: "/quality/update",
                type: "post",
                data: vm.quality,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.upateMetal();
                    }
                }
            });
        },
        upateMetal: function () {
            console.log(vm.metal);
            $.ajax({
                url: "/metal/update",
                type: "post",
                data: vm.metal,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("修改成功")
                        window.location.href = "pe_index_j.html";
                    }
                }
            });
        }
    }
});