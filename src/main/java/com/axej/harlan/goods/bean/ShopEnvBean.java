package com.axej.harlan.goods.bean;

/**
 * @author: lava
 * date: 10:00 2018/5/23
 * created by: IntelliJ IDEA
 * 店铺环境图片
 */
public class ShopEnvBean {
    private int env_id;
    private String environment_src;
    private String env_type;
    private int shop_id;

    public int getEnv_id() {
        return env_id;
    }

    public void setEnv_id(int env_id) {
        this.env_id = env_id;
    }

    public String getEnvironment_src() {
        return environment_src;
    }

    public void setEnvironment_src(String environment_src) {
        this.environment_src = environment_src;
    }

    public String getEnv_type() {
        return env_type;
    }

    public void setEnv_type(String env_type) {
        this.env_type = env_type;
    }

    public int getShop_id() {
        return shop_id;
    }

    public void setShop_id(int shop_id) {
        this.shop_id = shop_id;
    }
}
