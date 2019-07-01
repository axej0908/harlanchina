var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
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
                    if (vm.user == null){
                        window.location.href("../login.html");
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
        //修改密码
        modPassword: function () {
            $.ajax({
                url: "/user/password/modify",
                type: "post",
                data: {"user_id": vm.user.user_id,"old_pass":vm.old_pass,"new_pass":vm.new_pass},
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
