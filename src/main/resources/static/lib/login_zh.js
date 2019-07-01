var vm = new Vue({
    el:"#rrapp",
    data:{
        user:{}
    },
    mounted: function() {
        this.$nextTick(function () {
        })
    },
    methods:{
        login : function () {
            if(vm.user.user_phone == null || vm.user.user_phone == ""){
                alert("用户名不能为空");
                return false;
            }
            if(vm.user.user_password == null || vm.user.user_password == ""){
                alert("密码不能为空");
                return false;
            }
            $.ajax({
                type:'post',
                url:'/log/login',
                data:{
                    "user_phone":vm.user.user_phone ,
                    "user_password": vm.user.user_password,
                    "user_type":"supplierZh"
                },
                dataType : 'json',
                success : function(data) {
                    if(data.code == 0){
                        //lnk personal order
                        if(data.data.biz_type == "seller_zh"){
                            vm.user = data.data;
                            window.location.href = "pbm_order_seller1.html";
                        }else {
                            alert("用户名或密码不正确");
                            return false;
                        }
                    }else {
                        alert("用户名或密码不正确");
                        return false;
                    }
                }
            })
        }
    }
});

