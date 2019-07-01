var vm = new Vue({
    el:"#rrapp",
    data:{
        user:{}
    },
    mounted : function(){
        this.$nextTick(function(){
            vm.currentUser();

        })
    },
    methods:{
        //获取当前登录人详细信息
        currentUser : function(){
            $.ajax({
                url:"/log/currentUser",
                type:"post",
                data:{},
                dataType:"json",
                success:function(data){
                    if(data.code == 0){
                        vm.user = data.data;
                    }
                }
            })
        },
        //退出
        logout : function () {
            $.ajax({
                url:"/log/logout",
                type:"post",
                data:{},
                dataType:"json",
                success:function (data) {
                    if (data.code == 0){
                        alert("sign out success!");
                        /* window.open("../login.html");*/
                        window.location.href = "../login.html";
                    }
                }
            })
        }
    }
});

