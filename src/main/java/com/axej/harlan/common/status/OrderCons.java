package com.axej.harlan.common.status;


/**
 * @author lava
 * 订单常量
 */
public class OrderCons {

    /**
     * 订单状态
     */
    public enum Status {

        /**
         * 待付款
         */
        WAIT_PAY("1"),

        /**
         * 待发货
         */
        WAIT_DELIVERY("2"),

        /**
         * 待收货
         */
        WAIT_RECEIVE("3"),


        /**
         * 已完成
         */
        COMPLETED("4");

        private String value;

        public String getValue() {
            return value;
        }

        private Status(String value) {
            this.value = value;
        }

    }
}

