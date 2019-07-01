var flag = true;
var limit = 100;
var vm = new Vue({
    el: "#rrapp",
    data: {
        user: {},
        //res of query
        applications: [],
        serShow:'',
        //服务
        service: {}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.getCurrentUser();
        })
    },

    filters: {
        /**
         * 从规格里获取 单价单位
         */
        getUnit: function (val) {
            if (val == '' || typeof val == "undefined") {
                return val;
            } else {
                return val.split("/")[1];
            }
        }
    },
    methods: {
        getCurrentUser: function () {
            $.ajax({
                url: "/log/currentChinaUser",
                async: false,
                type: "post",
                data: {},
                dataType: "json",
                success: function (r) {
                    vm.user = r.data;
                    if (vm.user == null) {
                        window.location.href = 'login_zh.html';
                    } else {
                        vm.supplyChainFinance();
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
                        window.open("login_zh.html", "_self");
                    }
                }
            })
        },

        /**
         * 上传图片
         * @param event
         */
        uploadImg: function (event, five_id) {
            var obj = event.target;
            var $file = $(obj);
            var fileObj = $file[0];
            var windowURL = window.URL || window.webkitURL;
            var dataURL;
            var $img = $(obj).parent();
            if(fileObj && fileObj.files && fileObj.files[0]){
                dataURL = windowURL.createObjectURL(fileObj.files[0]);
                $img.css('background-image',"url("+dataURL+")");
            }
            $img.find("span").html("");

            var inputId = obj.id;
            //根据id判断生产环境还是办公环境
            $.ajaxFileUpload({
                url: "/file/upload",
                type: "post",
                data: {
                    "user_id": vm.user.user_id
                },
                secureuri: false,
                fileElementId: obj.id,
                dataType: 'json',
                success: function (r, status) {
                    //文件路径
                    if (inputId == "supply_file") {
                        vm.service.supply_file = r.data;
                        vm.service.five_id = five_id;
                        vm.editUploadFile();
                    }
                },
                error: function (r, status, e) {
                    alert(e);
                }
            })
        },

        /**
         * 供应链金融
         */
        supplyChainFinance : function (currPage) {
            if (!$.isNumeric(currPage)) {
                currPage = 0;
            }
            $.ajax({
                url: '/fiveSer/pager',
                data: {
                    "jsonStr": JSON.stringify({
                        user_id: vm.user.user_id,
                        border_type: "ch",
                        five_type: "ser3",
                        page: currPage + 1,
                        limit: limit
                    })
                },
                type: "post",
                dataType: "json",
                success : function (r) {
                    if (r.code == 0) {
                        /*if (flag) {
                            $("#pagerBar").pagination(r.data.totalCount, {
                                items_per_page: limit,
                                num_edge_entries: 1,
                                num_display_entries: 5,
                                callback: vm.preLoadIndexGoods//回调函数
                            });
                            flag = false;
                        }*/
                        vm.applications = r.data.list;
                    }
                }
            })
        },


        /**
         * 修改上传文件
         */
        editUploadFile : function () {
            $.ajax({
                url: '/fiveSer/edit',
                data: vm.service,
                type: "post",
                dataType: "json",
                success : function (r) {
                    if(r.code == 0){
                        alert("上传成功!");
                    }else {
                        alert("上传失败!");
                    }
                }
            })
        }
    }
});

