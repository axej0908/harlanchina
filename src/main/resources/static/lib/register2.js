var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {
            user_state: 'inactive',
            biz_type: 'buyer_en'
        },

        btnModal: 'register',

        //协议 是true 否false
        protocolVal: true
    },
    mounted: function () {
        this.$nextTick(function () {

        })
    },
    watch: {
        'user.biz_type': function (val, oVal) {
            if (val == 'buyer_en') {
                vm.btnModal = 'register'
            } else if (val = 'seller_en') {
                vm.btnModal = 'nextStep'
            }
        }
    },
    methods: {

        /**
         * 3.采购商注册
         */
        registerBuyer: function () {

            if(!vm.protocolVal){
                alert("Please agree and read the agreement");
                return;
            }

            vm.user.user_state = "normal";
            $.ajax({
                url: "/log/register",
                async: false,
                type: "post",
                data: vm.user,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        /*window.open("login_en.html", "_self");*/
                        vm.login();
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        login : function () {
            if(vm.user.user_phone == null || vm.user.user_phone == ""){
                alert("null username");
                return false;
            }
            if(vm.user.user_password == null || vm.user.user_password == ""){
                alert("null password");
                return false;
            }
            $.ajax({
                type:'post',
                url:'/log/login',
                async: false,
                data:{
                    "user_phone":vm.user.user_phone ,
                    "user_password": vm.user.user_password
                },
                dataType : 'json',
                success : function(data) {
                    if(data.code == 0){
                        if(data.data.biz_type == "buyer_en"){
                            window.location.href = "index.html";
                        }
                    }else {
                        alert("username or password error");
                        return false;
                    }
                }
            })
        },

        /** 2供应商注册 - 跳转完善信息 */
        registerSeller: function () {
            if(!vm.protocolVal){
                alert("Please agree and read the agreement");
                return;
            }

            $.ajax({
                url: "/log/register",
                type: "post",
                data: vm.user,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        var user_id = r.data.user_id;
                        window.location.href = "register_info_en.html?user_id="+user_id;
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        /**
         * 1.发送手机验证码
         */
        sendMobileCode: function () {
            $.ajax({
                url: "/log/mobileCode",
                type: "post",
                data: {"user_phone": vm.user.user_phone},
                dataType: "json",
                success: function (r) {
                    console.log(JSON.stringify(r));
                    if (r.code == 0) {
                        // alert("success");
                    } else {
                        alert(r.msg);
                    }
                }
            })
        },

        /**
         * 是否同意协议
         * 是 true
         * 否 false
         */
        protocol : function () {
            if(vm.protocolVal){
                vm.protocolVal = false;
            }else {
                vm.protocolVal = true;
            }
        }
    }
});