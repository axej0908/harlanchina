package com.axej.harlan.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:15:52 2017/11/23
 */
@Configuration
@PropertySource("classpath:config/alipay.properties")
@ConfigurationProperties(prefix = "alipay")
public class AlipayConstant {

    private String name;
    private String pass;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;

    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}
