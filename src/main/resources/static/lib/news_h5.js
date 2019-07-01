var vm = new Vue({
    el: "#lava",
    data: {
        news:{}
    },
    mounted: function () {
        this.$nextTick(function () {
            vm.preLoadNewsDetail();
        })
    },
    methods: {
        /**
         * 1.query detail of news
         */
        preLoadNewsDetail: function () {
            var news_id = getQueryString("news_id");
            if (news_id == "noExistThisParam") {
                return;
            }
            $.ajax({
                url: "/newsFlash/detail",
                type: "post",
                data: {"news_id": news_id},
                dataType: "json",
                success: function (r) {
                    if (r.code == 0) {
                        vm.news = r.data;
                    } else {
                        alert(r.msg);
                    }
                }
            })
        }
    }
});