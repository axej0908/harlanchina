var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //提示信息
        tipMsg: '',
        //visibility complete info to submit
        formShow: false,
        perMask: false,
        comMask: false
    },
    mounted: function () {
        this.$nextTick(function () {
        })
    },
    filters: {
        serialSel: function (val) {
            return val + "" + new Date().getTime();
        }
    },
    computed: {},
    methods: {

        /**
         * 5.register
         */
        register : function () {
            $.ajax({
                url:"/log/register",
                type:"post",
                data:vm.user,
                dataType:"json",
                success:function (r) {
                    if(r.code == 0 ){
                        alert("注册成功，请继续支付");
                        window.open("zf.html?user_id="+r.data.user_id+"&user_type="+r.data.user_type,"_self");
                    }else{
                        alert("注册失败");
                    }
                }
            })
        },

        /**
         * 4.control visibility of shut
         */
        closeAll: function () {
            vm.formShow = false;
            vm.perMask = false;
            vm.comMask = false;
        },

        /**
         * 3.control visibility of apply
         * @param way
         */
        showAll: function (way) {
            vm.formShow = true;
            if (way == 'com') {
                vm.user.user_type = "supplierZhs";
                vm.comMask = true;
            } else if (way == 'per') {
                vm.user.user_type = "supplierZh";
                vm.perMask = true;
            }
        },

        /**
         * 2.send mobile code
         */
        sendMobileCode: function () {
            //1.reset
            vm.tipMsg = '';
            //2.验证手机格式
            $.ajax({
                url: "/log/mobileCode",
                type: "post",
                data: {"user_phone": vm.user.user_phone},
                dataType: "json",
                success: function (r) {
                    console.log(JSON.stringify(r));
                    if (r.code == 0) {
                        alert("验证码已发送，请注意查收");
                    } else if (r.code == 500) {
                        vm.tipMsg = "此手机号码已经被注册";
                    }
                }
            })
        },

        /**
         * 1.register at once
         */
        preLoadMyServices: function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: "/fiveSer/pager",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.services = r.data.list;
                    }
                }
            })
        }
    }

});


