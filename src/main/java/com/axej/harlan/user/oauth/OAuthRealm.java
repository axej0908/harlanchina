package com.axej.harlan.user.oauth;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:17:27 2017/11/25
 */
@Configuration
public class OAuthRealm extends AuthorizingRealm{
    /**
     * 授权 -
     * @param principals
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        return null;
    }

    /**
     * 登录 - 认证
     * @param token
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        String accessToken = (String) token.getPrincipal();
        //根据accessToken 查询用户信息

        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo();
        return info;
    }
}
