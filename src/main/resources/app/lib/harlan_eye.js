var vm = new Vue({
    el:"#rrapp",
    data:{
        //服务容器
        fiveSer:{},
        //隐藏
        har1:false,
        har2:false,
        har3:true
    },
    mounted: function() {
        this.$nextTick(function () {
        })
    },
    methods:{

        popUp : function (val) {
            if(val == 'har1'){
                vm.har1 = true;
                vm.har2 = false;
                vm.har3 = false;
                vm.fiveSer.five_type = "har1";
            }
            if(val == 'har2'){
                vm.har2 = true;
                vm.har1 = false;
                vm.har3 = false;
                vm.fiveSer.five_type = "har2";
            }
            if(val == 'har3'){
                vm.har3 = true;
                vm.har1 = false;
                vm.har2 = false;
                vm.fiveSer.five_type = "har3";
            }
        },
        //申请服务 提交弹框
        applySer: function () {

            //校验数字
            /*if(vm.fiveSer.contact != null || vm.fiveSer.contact != "" || vm.fiveSer.contact != "undefined"){
                var verify = /^[0-9]*$/;
                if(!verify.test(vm.fiveSer.contact)){
                    alert("Please enter the number!");
                    return false;
                }
            }*/
            if(vm.fiveSer.contact == null || vm.fiveSer.contact == "" || vm.fiveSer.contact == "undefined"){
                alert("Please enter the contact person!");
                return false;
            }
            //校验手机号
            /*if(vm.fiveSer.contact_phone != null || vm.fiveSer.contact_phone != "" || vm.fiveSer.contact_phone != "undefined"){
                var verify = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if(!verify.test(vm.fiveSer.contact_phone)){
                    alert("Please enter a valid mobile phone number!");
                    return false;
                }
            }*/
            if(vm.fiveSer.contact_phone == null || vm.fiveSer.contact_phone == "" || vm.fiveSer.contact_phone == "undefined"){
                alert("Please enter your cell phone number!");
                return false;
            }

            if(vm.fiveSer.five_type == null || vm.fiveSer.five_type == 'undefined'){
                vm.fiveSer.five_type = "har3";
            }
            vm.fiveSer.user_id = getQueryString("user_id");
            vm.fiveSer.border_type = "en";
            $.ajax({
                url: "/fiveSer/save",
                type: "post",
                data: vm.fiveSer,
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        alert("submit succeed!");
                        window.location.href = "harlan_eye.html?user_id="+vm.fiveSer.user_id;
                    }else {
                        alert("submit failed!");
                        window.location.href = "harlan_eye.html?user_id="+vm.fiveSer.user_id;
                    }
                }
            })
        }
    }
});

