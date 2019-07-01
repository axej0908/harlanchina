package com.axej.harlan.goods.bean;

import com.axej.harlan.order.bean.CartBean;
import com.axej.harlan.order.bean.OrderBean;
import com.axej.harlan.order.bean.OrderItemBean;

import java.util.List;

/**
 * @Author: jaywechen
 * @Description: 店铺
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 16:11 2018/1/20
 */
public class ShopBean {
    private int shop_id;
    private int user_id;
    private String shop_name;
    private String com_name;
    private String com_addr;
    private String contact_name;
    private String contact_mobile;
    private String com_logo;
    private String com_license;
    private String per_card;
    private String per_addr;
    private String domestic;
    private String create_time;
    private String shop_state;
    private String rank;
    private int total_volumes;

    /**
     * 订单信息
     */
    private List<OrderBean> orderBeans;
    /**
     * 商品列表
     */
    private List<GoodsMallBean> merchandiseBeans;
    /**
     * 商品 一对一列表
     */
    private GoodsMallBean goodsMallBean;

    /**
     * 购物车列表
     */
    private List<CartBean> cartBeans;
    /**
     * 订单项列表
     */
    private List<OrderItemBean> orderItemBeans;

    public int getShop_id() {
        return shop_id;
    }

    public void setShop_id(int shop_id) {
        this.shop_id = shop_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getShop_name() {
        return shop_name;
    }

    public void setShop_name(String shop_name) {
        this.shop_name = shop_name;
    }

    public String getCom_name() {
        return com_name;
    }

    public void setCom_name(String com_name) {
        this.com_name = com_name;
    }

    public String getCom_addr() {
        return com_addr;
    }

    public void setCom_addr(String com_addr) {
        this.com_addr = com_addr;
    }

    public String getContact_name() {
        return contact_name;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public String getContact_mobile() {
        return contact_mobile;
    }

    public void setContact_mobile(String contact_mobile) {
        this.contact_mobile = contact_mobile;
    }

    public String getCom_logo() {
        return com_logo;
    }

    public void setCom_logo(String com_logo) {
        this.com_logo = com_logo;
    }

    public String getCom_license() {
        return com_license;
    }

    public void setCom_license(String com_license) {
        this.com_license = com_license;
    }

    public String getPer_card() {
        return per_card;
    }

    public void setPer_card(String per_card) {
        this.per_card = per_card;
    }

    public String getPer_addr() {
        return per_addr;
    }

    public void setPer_addr(String per_addr) {
        this.per_addr = per_addr;
    }

    public String getDomestic() {
        return domestic;
    }

    public void setDomestic(String domestic) {
        this.domestic = domestic;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getShop_state() {
        return shop_state;
    }

    public void setShop_state(String shop_state) {
        this.shop_state = shop_state;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }

    public int getTotal_volumes() {
        return total_volumes;
    }

    public void setTotal_volumes(int total_volumes) {
        this.total_volumes = total_volumes;
    }

    public List<OrderBean> getOrderBeans() {
        return orderBeans;
    }

    public void setOrderBeans(List<OrderBean> orderBeans) {
        this.orderBeans = orderBeans;
    }

    public List<GoodsMallBean> getMerchandiseBeans() {
        return merchandiseBeans;
    }

    public void setMerchandiseBeans(List<GoodsMallBean> merchandiseBeans) {
        this.merchandiseBeans = merchandiseBeans;
    }

    public GoodsMallBean getGoodsMallBean() {
        return goodsMallBean;
    }

    public void setGoodsMallBean(GoodsMallBean goodsMallBean) {
        this.goodsMallBean = goodsMallBean;
    }

    public List<CartBean> getCartBeans() {
        return cartBeans;
    }

    public void setCartBeans(List<CartBean> cartBeans) {
        this.cartBeans = cartBeans;
    }

    public List<OrderItemBean> getOrderItemBeans() {
        return orderItemBeans;
    }

    public void setOrderItemBeans(List<OrderItemBean> orderItemBeans) {
        this.orderItemBeans = orderItemBeans;
    }
}
