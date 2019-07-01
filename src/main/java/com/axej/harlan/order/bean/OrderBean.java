package com.axej.harlan.order.bean;

import com.axej.harlan.common.status.FiveSerCons;
import com.axej.harlan.user.bean.AddressBean;

import java.util.List;

/**
 * Description:订单表
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:18:08 2017/12/12
 */
public class OrderBean {
    private String order_id;
    private int buyer_id;
    private int seller_id;
    private String total_money;
    private int addr_id;
    private String supv_id;
    private String place_time;
    private String pay_time;
    private String done_time;
    private String transport_corporation;
    private String transport_number;
    private String payment_opt;
    private String package_opt;
    private String color_light;
    private String color_power;
    private int goods_id;
    private String status;
    private String chain_state;
    private String goods_name;
    private String goods_price;
    private int goods_num;
    private String contract;
    private String goods_unit;

    private String check_state;
    private String super_state;

    /** mapper映射冗余字段 */
    private String consignee;
    private String com_name;
    private String product_picture;
    private String user_name;

    /**
     * 平台检测映射冗余字段
     */
    /** 下单人 */
    //下单人名称
    private String buy_name;
    //下单人联系方式
    private String buy_phone;
    //下单人地址
    private String buy_site;

    /** 发货方 */
    //发货方名称
    private String sell_name;
    //发货方联系方式
    private String sell_phone;
    //发货方地址
    private String sell_site;

    /**【平台监理】映射冗余字段 */
    private List<OrderSuperBean> orderSuperBeans;

    /** 【平台检测】映射冗余字段 */
    private int check_id;
    private String total;

    /**  供应链金融   */
    private OrderChainBean orderChainBean;
    private String upload;

    public String getGoods_unit() {
        return goods_unit;
    }

    public void setGoods_unit(String goods_unit) {
        this.goods_unit = goods_unit;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getCom_name() {
        return com_name;
    }

    public void setCom_name(String com_name) {
        this.com_name = com_name;
    }

    public String getProduct_picture() {
        return product_picture;
    }

    public void setProduct_picture(String product_picture) {
        this.product_picture = product_picture;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getOrder_id() {
        return order_id;
    }

    public void setOrder_id(String order_id) {
        this.order_id = order_id;
    }

    public int getBuyer_id() {
        return buyer_id;
    }

    public void setBuyer_id(int buyer_id) {
        this.buyer_id = buyer_id;
    }

    public int getSeller_id() {
        return seller_id;
    }

    public void setSeller_id(int seller_id) {
        this.seller_id = seller_id;
    }

    public String getTotal_money() {
        return total_money;
    }

    public void setTotal_money(String total_money) {
        this.total_money = total_money;
    }

    public int getAddr_id() {
        return addr_id;
    }

    public void setAddr_id(int addr_id) {
        this.addr_id = addr_id;
    }

    public String getSupv_id() {
        return supv_id;
    }

    public void setSupv_id(String supv_id) {
        this.supv_id = supv_id;
    }

    public String getPlace_time() {
        return place_time;
    }

    public void setPlace_time(String place_time) {
        this.place_time = place_time;
    }

    public String getTransport_corporation() {
        return transport_corporation;
    }

    public void setTransport_corporation(String transport_corporation) {
        this.transport_corporation = transport_corporation;
    }

    public String getTransport_number() {
        return transport_number;
    }

    public void setTransport_number(String transport_number) {
        this.transport_number = transport_number;
    }

    public String getPayment_opt() {
        return payment_opt;
    }

    public void setPayment_opt(String payment_opt) {
        this.payment_opt = payment_opt;
    }

    public String getPay_time() {
        return pay_time;
    }

    public void setPay_time(String pay_time) {
        this.pay_time = pay_time;
    }

    public String getDone_time() {
        return done_time;
    }

    public void setDone_time(String done_time) {
        this.done_time = done_time;
    }

    public String getPackage_opt() {
        return package_opt;
    }

    public void setPackage_opt(String package_opt) {
        this.package_opt = package_opt;
    }

    public String getColor_light() {
        return color_light;
    }

    public void setColor_light(String color_light) {
        this.color_light = color_light;
    }

    public String getColor_power() {
        return color_power;
    }

    public void setColor_power(String color_power) {
        this.color_power = color_power;
    }

    public int getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(int goods_id) {
        this.goods_id = goods_id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getChain_state() {
        return chain_state;
    }

    public void setChain_state(String chain_state) {
        this.chain_state = chain_state;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public String getGoods_price() {
        return goods_price;
    }

    public void setGoods_price(String goods_price) {
        this.goods_price = goods_price;
    }

    public int getGoods_num() {
        return goods_num;
    }

    public void setGoods_num(int goods_num) {
        this.goods_num = goods_num;
    }

    public String getContract() {
        return contract;
    }

    public void setContract(String contract) {
        this.contract = contract;
    }

    public String getCheck_state() {
        return check_state;
    }

    public String getSuper_state() {
        return super_state;
    }

    public void setSuper_state(String super_state) {
        this.super_state = super_state;
    }

    public void setCheck_state(String check_state) {
        this.check_state = check_state;
    }

    public String getBuy_name() {
        return buy_name;
    }

    public void setBuy_name(String buy_name) {
        this.buy_name = buy_name;
    }

    public String getBuy_phone() {
        return buy_phone;
    }

    public void setBuy_phone(String buy_phone) {
        this.buy_phone = buy_phone;
    }

    public String getBuy_site() {
        return buy_site;
    }

    public void setBuy_site(String buy_site) {
        this.buy_site = buy_site;
    }

    public String getSell_name() {
        return sell_name;
    }

    public void setSell_name(String sell_name) {
        this.sell_name = sell_name;
    }

    public String getSell_phone() {
        return sell_phone;
    }

    public void setSell_phone(String sell_phone) {
        this.sell_phone = sell_phone;
    }

    public String getSell_site() {
        return sell_site;
    }

    public void setSell_site(String sell_site) {
        this.sell_site = sell_site;
    }

    public List<OrderSuperBean> getOrderSuperBeans() {
        return orderSuperBeans;
    }

    public void setOrderSuperBeans(List<OrderSuperBean> orderSuperBeans) {
        this.orderSuperBeans = orderSuperBeans;
    }

    public int getCheck_id() {
        return check_id;
    }

    public void setCheck_id(int check_id) {
        this.check_id = check_id;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public OrderChainBean getOrderChainBean() {
        return orderChainBean;
    }

    public void setOrderChainBean(OrderChainBean orderChainBean) {
        this.orderChainBean = orderChainBean;
    }

    public String getUpload() {
        return upload;
    }

    public void setUpload(String upload) {
        this.upload = upload;
    }
}
