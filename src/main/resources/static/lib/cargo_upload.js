// cargo 1.上传货物基本详情
function upload_cargo(obj) {
    obj.parentNode.nextElementSibling.innerHTML = obj.files[0].name;
    // console.log( $(obj).parent());
    //回显上传文件本地路径
    // var nme = $(this).get(0).value.split("\\");
    // $(obj).parent().siblings(".file_url_b").html(obj.files[0].name);

    var inputId = obj.id;
    var files = obj.files;
    if (files == null || files.length <= 0) {
        alert("请选择文件！");
        return;
    }
    if (files[0].size <= 0) {
        alert(files[0].name + "," + files[0].size + "," + files[0].type);
        alert("文件大小为0，请重新选择文件");
        return;
    }
    $.ajaxFileUpload({
        url: "/cargo/upload",
        data:{
            "user_id":vm.user.user_id
        },
        secureuri: false,
        fileElementId: obj.id,
        dataType: 'json',
        success: function (r, status) {
            //赋值
            if (inputId == "application_scheme") {
                alert("application_scheme");
                vm.cargo.application_scheme = r.data;
            } else if (inputId == "product_picture") {
                alert("product_picture");
                vm.cargo.product_picture = r.data;
            } else if (inputId == "production_state") {
                alert("production_state");
                vm.cargo.production_state = r.data;
            }
        },
        error: function (r, status, e) {
            alert(e);
        }
    })
}

//2.上传检测报告
function upload_report(obj) {
    obj.parentNode.nextSbiling.innerHTML = obj.files[0].name;
    var files = obj.files;
    var inputId = obj.id;
    if (files == null || files.length <= 0) {
        alert("请选择文件！");
        return;
    }
    if (files[0].size <= 0) {
        alert(files[0].name + "," + files[0].size + "," + files[0].type);
        alert("文件大小为0，请重新选择文件");
        return;
    }
    $.ajaxFileUpload({
        url: "/cargo/upload",
        data:{
            "user_id":vm.user.user_id
        },
        secureuri: false,
        fileElementId: obj.id,
        dataType: 'json',
        success: function (r, status) {
            //赋值
            if (inputId == "detect_report") {
                vm.cargo.detect_report = r.data;
            } else if (inputId == "detect_uv") {
                vm.cargo.detect_uv = r.data;
            } else if (inputId == "detect_colourimeter") {
                vm.cargo.color_light = r.data;
            } else if (inputId == "detect_video") {
                vm.cargo.detect_video = r.data;
            } else if (inputId == "sample_picture") {
                vm.cargo.detect_sample_imgs = r.data;
            } else if (inputId == "detect_bulk_imgs") {
                vm.cargo.detect_bulk_imgs = r.data;
            }
        },
        error: function (r, status, e) {
            alert(e);
        }
    })
}

