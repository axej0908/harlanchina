package com.axej.harlan.user.bean;

/**
 * @Author: jaywechen
 * @Description: 我的收藏
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 11:59 2018/1/29
 */
public class CollectionBean {
    private int col_id;
    private int user_id;
    private String col_type;
    private int mer_id;
    private String product_picture;
    private String cargo_name;
    private String cargo_purity;
    private String market_price;
    private String checked;
    private int shop_id;
    private String com_name;
    private String com_logo;

    public int getCol_id() {
        return col_id;
    }

    public void setCol_id(int col_id) {
        this.col_id = col_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getCol_type() {
        return col_type;
    }

    public void setCol_type(String col_type) {
        this.col_type = col_type;
    }

    public int getMer_id() {
        return mer_id;
    }

    public void setMer_id(int mer_id) {
        this.mer_id = mer_id;
    }

    public String getProduct_picture() {
        return product_picture;
    }

    public void setProduct_picture(String product_picture) {
        this.product_picture = product_picture;
    }

    public String getCargo_name() {
        return cargo_name;
    }

    public void setCargo_name(String cargo_name) {
        this.cargo_name = cargo_name;
    }

    public String getCargo_purity() {
        return cargo_purity;
    }

    public void setCargo_purity(String cargo_purity) {
        this.cargo_purity = cargo_purity;
    }

    public String getMarket_price() {
        return market_price;
    }

    public void setMarket_price(String market_price) {
        this.market_price = market_price;
    }

    public String getChecked() {
        return checked;
    }

    public void setChecked(String checked) {
        this.checked = checked;
    }

    public int getShop_id() {
        return shop_id;
    }

    public void setShop_id(int shop_id) {
        this.shop_id = shop_id;
    }

    public String getCom_name() {
        return com_name;
    }

    public void setCom_name(String com_name) {
        this.com_name = com_name;
    }

    public String getCom_logo() {
        return com_logo;
    }

    public void setCom_logo(String com_logo) {
        this.com_logo = com_logo;
    }
}
