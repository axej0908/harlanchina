package com.axej.harlan.msg.bean;

/**
 * @Author: jaywechen
 * @Description: 价格快递
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 12:01 2018/3/1
 */
public class PriceBean {
    private int price_id;
    private String goods_name;
    private String goods_price;
    private String price_unit;
    private String currency_kinds;


    public int getPrice_id() {
        return price_id;
    }

    public void setPrice_id(int price_id) {
        this.price_id = price_id;
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

    public String getPrice_unit() {
        return price_unit;
    }

    public void setPrice_unit(String price_unit) {
        this.price_unit = price_unit;
    }

    public String getCurrency_kinds() {
        return currency_kinds;
    }

    public void setCurrency_kinds(String currency_kinds) {
        this.currency_kinds = currency_kinds;
    }
}
