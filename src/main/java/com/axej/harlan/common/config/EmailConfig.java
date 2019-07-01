package com.axej.harlan.common.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:11:00 2017/12/2
 */
@Configuration
@PropertySource("classpath:config/email.properties")
@ConfigurationProperties(prefix = "email")
public class EmailConfig {

    /**
     * 服务器地址
     */
    private String host;
    //邮箱协议
    private String protocol;
    //端口
    private String port;
    //发件方
    private String from;
    //发件方秘钥
    private String pass;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getPort() {
        return port;
    }

    public void setPort(String port) {
        this.port = port;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getPass() {
        return pass;
    }

    public void setPass(String pass) {
        this.pass = pass;
    }
}
