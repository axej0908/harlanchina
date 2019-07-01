package com.axej.harlan.user.bean;

/**
* Description：选择平时购物的商品
* @author : jaywechen
*/
public class ShopIntentBean {

    private int shopIntent_id;
    private String product_name;
    private String create_time;
    private String product_type;
    private String domestic;

    public String getDomestic() {
        return domestic;
    }

    public void setDomestic(String domestic) {
        this.domestic = domestic;
    }

    public int getShopIntent_id() {
        return shopIntent_id;
    }

    public void setShopIntent_id(int shopIntent_id) {
        this.shopIntent_id = shopIntent_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getCreate_time() {
        return create_time;
    }

    public void setCreate_time(String create_time) {
        this.create_time = create_time;
    }

    public String getProduct_type() {
        return product_type;
    }

    public void setProduct_type(String product_type) {
        this.product_type = product_type;
    }
}
