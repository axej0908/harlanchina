package com.axej.harlan.order.bean;

/**
 * @Author: jaywechen
 * @Description: 购物车实体类
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:18 2018/2/26
 */
public class CartBean {
    private int cart_id;
    private int user_id;
    private int goods_id;
    private int goods_num;
    private String goods_name;
    private String goods_price;
    private String color_light;
    private String color_power;
    private String deliver_addr;
    private String create_time;
    private String product_picture;
    private String package_opt;
    //冗余
    private boolean checked;

    public String getPackage_opt() {
        return package_opt;
    }

    public void setPackage_opt(String package_opt) {
        this.package_opt = package_opt;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public String getProduct_picture() {
        return product_picture;
    }

    public void setProduct_picture(String product_picture) {
        this.product_picture = product_picture;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public int getCart_id() {
        return cart_id;
    }

    public void setCart_id(int cart_id) {
        this.cart_id = cart_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public int getGoods_id() {
        return goods_id;
    }

    public void setGoods_id(int goods_id) {
        this.goods_id = goods_id;
    }

    public int getGoods_num() {
        return goods_num;
    }

    public void setGoods_num(int goods_num) {
        this.goods_num = goods_num;
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

    public String getDeliver_addr() {
        return deliver_addr;
    }

    public void setDeliver_addr(String deliver_addr) {
        this.deliver_addr = deliver_addr;
    }
}
