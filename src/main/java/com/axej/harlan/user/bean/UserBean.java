package com.axej.harlan.user.bean;

import com.axej.harlan.goods.bean.ShopBean;

import java.util.List;

/**
 * Description:用户bean
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:15:07 2017/11/23
 */
public class UserBean {
    private int user_id;
    private String user_name;
    private String user_phone;
    private String user_password;
    private String user_code;
    private String user_type;
    private String user_email;
    private String company_name;
    private String company_address;
    private String company_landline;
    private String trade_tendency;
    private String u_QQ;
    private String u_wechat;
    private String u_weibo;
    private String register_time;
    private String user_state;
    private String user_photo;
    private String user_gender;
    private String user_area;
    private String domestic;

    private String real_name;

    /**
     * 供货或者采购
     */
    private String biz_type;
    private String cardo_src;
    private String cardn_src;
    private String cardh_src;
    private String contact_name;
    private String contact_phone;
    private String attachment;
    private String license_src;


    private int shop_id;
    /**
     * just for mapping
     */
    private ShopBean shopBean;

    public String getReal_name() {
        return real_name;
    }

    public void setReal_name(String real_name) {
        this.real_name = real_name;
    }

    public String getCardo_src() {
        return cardo_src;
    }

    public void setCardo_src(String cardo_src) {
        this.cardo_src = cardo_src;
    }

    public String getCardn_src() {
        return cardn_src;
    }

    public void setCardn_src(String cardn_src) {
        this.cardn_src = cardn_src;
    }

    public String getCardh_src() {
        return cardh_src;
    }

    public void setCardh_src(String cardh_src) {
        this.cardh_src = cardh_src;
    }

    public String getContact_name() {
        return contact_name;
    }

    public void setContact_name(String contact_name) {
        this.contact_name = contact_name;
    }

    public String getContact_phone() {
        return contact_phone;
    }

    public void setContact_phone(String contact_phone) {
        this.contact_phone = contact_phone;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getLicense_src() {
        return license_src;
    }

    public void setLicense_src(String license_src) {
        this.license_src = license_src;
    }

    public String getBiz_type() {
        return biz_type;
    }

    public void setBiz_type(String biz_type) {
        this.biz_type = biz_type;
    }

    public String getUser_email() {
        return user_email;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public int getShop_id() {
        return shop_id;
    }

    public void setShop_id(int shop_id) {
        this.shop_id = shop_id;
    }

    public ShopBean getShopBean() {
        return shopBean;
    }

    public void setShopBean(ShopBean shopBean) {
        this.shopBean = shopBean;
    }

    public String getDomestic() {
        return domestic;
    }

    public void setDomestic(String domestic) {
        this.domestic = domestic;
    }

    public String getUser_gender() {
        return user_gender;
    }

    public void setUser_gender(String user_gender) {
        this.user_gender = user_gender;
    }

    public String getUser_area() {
        return user_area;
    }

    public void setUser_area(String user_area) {
        this.user_area = user_area;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getUser_phone() {
        return user_phone;
    }

    public void setUser_phone(String user_phone) {
        this.user_phone = user_phone;
    }

    public String getUser_password() {
        return user_password;
    }

    public void setUser_password(String user_password) {
        this.user_password = user_password;
    }

    public String getUser_code() {
        return user_code;
    }

    public void setUser_code(String user_code) {
        this.user_code = user_code;
    }

    public String getUser_type() {
        return user_type;
    }

    public void setUser_type(String user_type) {
        this.user_type = user_type;
    }

    public String getCompany_name() {
        return company_name;
    }

    public void setCompany_name(String company_name) {
        this.company_name = company_name;
    }

    public String getCompany_address() {
        return company_address;
    }

    public void setCompany_address(String company_address) {
        this.company_address = company_address;
    }

    public String getCompany_landline() {
        return company_landline;
    }

    public void setCompany_landline(String company_landline) {
        this.company_landline = company_landline;
    }

    public String getTrade_tendency() {
        return trade_tendency;
    }

    public void setTrade_tendency(String trade_tendency) {
        this.trade_tendency = trade_tendency;
    }

    public String getU_QQ() {
        return u_QQ;
    }

    public void setU_QQ(String u_QQ) {
        this.u_QQ = u_QQ;
    }

    public String getU_wechat() {
        return u_wechat;
    }

    public void setU_wechat(String u_wechat) {
        this.u_wechat = u_wechat;
    }

    public String getU_weibo() {
        return u_weibo;
    }

    public void setU_weibo(String u_weibo) {
        this.u_weibo = u_weibo;
    }

    public String getRegister_time() {
        return register_time;
    }

    public void setRegister_time(String register_time) {
        this.register_time = register_time;
    }

    public String getUser_state() {
        return user_state;
    }

    public void setUser_state(String user_state) {
        this.user_state = user_state;
    }

    public String getUser_photo() {
        return user_photo;
    }

    public void setUser_photo(String user_photo) {
        this.user_photo = user_photo;
    }
}
