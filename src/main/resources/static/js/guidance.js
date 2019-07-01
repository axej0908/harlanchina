var vm = new Vue({
    el:"#rrapp",
    data:{
        user:{},
        //服务
        fiveSer:{},
        //标题
        title:null,
        //弹框
        modalLogistic:false
    },
    mounted: function() {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },
    methods:{
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentUser",
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
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
        
        pop_up : function (s) {
            if(s == "0"){
                vm.title = "Apply for Har Lan Eye";
                vm.fiveSer.five_type = "app0";
            }
            if(s == "1"){
                vm.title = "Application guarantee";
                vm.fiveSer.five_type = "app1";
            }
            if(s == "2"){
                vm.title = "Apply for supply chain financing";
                vm.fiveSer.five_type = "app2";
            }
            $(".s_btn").click(function(){
                $(".mask").show();
                $(".opacity").show();
            });
            $(".img").click(function(){
                $(".mask").hide();
                $(".opacity").hide();
            });
            vm.modalLogistic = true;
        },
        
        //申请服务 提交弹框
        applySer: function () {
            if (vm.user == null || vm.user.user_id == null || typeof vm.user.user_id == "undefined") {
                alert("please sign in again");
                window.open("login_en.html", "_self");
                return;
            }
            vm.fiveSer.user_id = vm.user.user_id;
            $.ajax({
                url: "/fiveSer/save",
                type: "post",
                data: vm.fiveSer,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.fiveSer = {};
                        vm.IsShow = false;
                        alert("submit succeed!");
                        window.location.href = "guide_en.html";
                    }else {
                        alert("submit failed!");
                        window.location.href = "guide_en.html";
                    }
                }
            })
        }
    }
});

