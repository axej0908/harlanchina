package com.axej.harlan.common.status;

/**
 * @Author: jaywechen
 * @Description: 商场商品状态分类以及状态
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 17:34 2018/2/7
 */
public class GoodsMallCons {

    public enum GoodsStatus {
        /**
         * 上架
         */
        UP("up"),

        /**
         * 下架
         */
        DOWN("down"),

        /**
         * 待审核
         */
        WAIT_AUDIT("wait_audit"),

        PASS("pass"),

        REJECT("reject");

        private String val;

        public String getVal() {
            return val;
        }

        private GoodsStatus(String val) {
            this.val = val;
        }
    }


    public enum GoodsType {

        /**
         * 询盘
         */
        ENQUIRY("enquiry"),

        /**
         * 化浪自营 普通产品
         */
        HARLAN_NORMAL("harlan_normal"),

        /**
         * 化浪自营 热销产品
         */
        HARLAN_HOT("harlan_hot"),


        /**
         * 三方用户 普通商品
         */
        OTHERS_NORMAL("others_normal"),

        /**
         * 三方用户 热销产品
         */
        OTHERS_HOT("others_hot");


        private String val;

        public String getVal() {
            return val;
        }

        private GoodsType(String val) {
            this.val = val;
        }
    }
}
