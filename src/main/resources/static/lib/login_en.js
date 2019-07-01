var vm = new Vue({
    el:"#rrapp",
    data:{
        /*user:{
            user_type:'purchaserEn'
        }*/
        user: {}
    },
    mounted: function() {
        this.$nextTick(function () {
        })
    },
    methods:{
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
                async: false,
                url:'/log/login',
                data:{
                    "user_phone":vm.user.user_phone ,
                    "user_password": vm.user.user_password
                },
                dataType : 'json',
                success : function(data) {
                    if(data.code == 0){
                        vm.user = data.data;
                        if(data.data.biz_type == "seller_en"){
                            vm.shop(data.data.user_id);
                        }else if(data.data.biz_type == "buyer_en"){
                            window.location.href = "index.html";
                        }
                    }else {
                        alert("username or password error");
                        return false;
                    }
                }
            })
        },

        /**
         * 查看店铺状态
         * @param user_id
         */
        shop : function (user_id) {
            $.ajax({
                url:'/shop/detail',
                type:"post",
                data:{
                    "user_id":user_id
                },
                dataType:"json",
                success : function (r) {
                    if(r.data != null){
                        window.location.href = "index.html";
                    }else {
                        if (vm.user.user_type == "per"){
                            window.location.href = "sale_person_store_flow.html"
                        }else if (vm.user.user_type == "com"){
                            window.location.href = "sale_firm_store_flow.html";
                        }
                    }
                }
            })
        }
    }
});

