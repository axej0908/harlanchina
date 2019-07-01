var vm = new Vue({
    el: "#rrapp",
    data: {
        apk:{},
        obj:{}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.get();
        })
    },
    methods: {

        upload : function () {
            $.ajaxFileUpload({
                url : '/apkVersion/upload',
                secureuri : false,
                fileElementId : "apk",
                dataType : 'json',
                success : function(r) {
                    if(r.code == 0){
                        vm.obj.apk_url = r.data;
                    }else {
                        alert("上传失败1");
                    }
                },
                error : function(data, status, e) {
                    console.log(data);
                    console.log(status);
                    console.log(e);
                    alert("上传失败");
                }
            });
        },

        get : function () {
            $.ajax({
                url:'/apkVersion/get',
                type:"post",
                data:{},
                dataType:"json",
                success : function (r) {
                    if(r.code == 0){
                        vm.apk = r.data;
                        vm.obj.apk_id = vm.apk.apk_id;
                    }else {
                        vm.apk = {};
                    }
                }
            })
        },
        
        sub : function () {
            vm.obj.is_coercion = $("input[name='is_coercion']:checked").val()
            $.ajax({
                url:'/apkVersion/alter',
                type:"post",
                data:vm.obj,
                dataType:"json",
                success : function (r) {
                    if(r.code == 0){
                        alert("提交成功!");
                        window.location.href = "apk_version.html";
                    }else {
                        alert("提交失败!");
                    }
                }
            })
        }
    }
});