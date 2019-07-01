package com.axej.harlan.user.bean;

/**
 * Description:收货地址管理
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:12:02 2017/12/2
 */
public class AddressBean {
    //主键-自增长
    private int addr_id;
    //收货人
    private String consignee;
    private String province;
    private String city;
    private String area;
    //详细地址
    private String detail;
    //移动电话
    private String mobile;
    //固定电话
    private String landline;
    //是否默认 1默认 0普通
    private boolean is_default;
    /*@外键*/
    private int user_id;

    public void setAddr_id(int addr_id) {
        this.addr_id = addr_id;
    }

    public int getAddr_id() {
        return addr_id;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLandline() {
        return landline;
    }

    public void setLandline(String landline) {
        this.landline = landline;
    }

    public boolean isIs_default() {
        return is_default;
    }

    public void setIs_default(boolean is_default) {
        this.is_default = is_default;
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    @Override
    public String toString() {
        return "AddressBean{" +
                "addr_id=" + addr_id +
                ", consignee='" + consignee + '\'' +
                ", province='" + province + '\'' +
                ", city='" + city + '\'' +
                ", area='" + area + '\'' +
                ", detail='" + detail + '\'' +
                ", mobile='" + mobile + '\'' +
                ", landline='" + landline + '\'' +
                ", is_default='" + is_default + '\'' +
                ", user_id='" + user_id + '\'' +
                '}';
    }
}
