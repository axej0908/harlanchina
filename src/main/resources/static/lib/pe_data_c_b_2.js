var vm = new Vue({
    el: "#rrapp",
    data: {

        //输入的商品名称或者供应商
        searchParam: null,
        //搜索框搜索类别
        searchType: 'supplier',

        user: {},
        //输入手机号
        user_phone2: null,
        //输入的验证码
        inputCode: null,
        //返回的验证码
        resCode: null

    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods: {

        redirectSel: function () {
            if (vm.searchType == "product") {
                window.open("search.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else if (vm.searchType == "supplier") {
                window.open("master.html?searchType=" + vm.searchType + "&searchParam=" + vm.searchParam, "_self")
            } else {
                alert("error");
            }
        },
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.open("index.html", "_self");
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
        //发送短信验证码
        sendMobileCode: function () {
            if (vm.user_phone2.trim().length != 11) {
                alert("不正确的手机号格式");
                return;
            }
            $.ajax({
                url: "/user/mobile/code",
                type: "post",
                data: {"user_phone": vm.user_phone2},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.resCode = r.data;
                    }

                }
            })
        },
        //修改手机号
        modMobileNumber:function () {
            if (vm.resCode != vm.inputCode.trim()){
                alert("验证码错误，请重新输入!");
                return;
            }
            $.ajax({
                url: "/user/update",
                type: "post",
                data: {"user_id":vm.user.user_id,"user_phone": vm.user_phone2},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("修改成功!");
                    }
                }
            })
        }
    }
});
