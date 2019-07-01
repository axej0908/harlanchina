//package com.axej.harlan.moudle.config;
//
//import com.axej.harlan.user.oauth.OAuthRealm;
//import org.apache.shiro.mgt.SecurityManager;
//import org.apache.shiro.session.mgt.SessionManager;
//import org.apache.shiro.spring.LifecycleBeanPostProcessor;
//import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
//import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
//import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
//import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
//import org.springframework.aop.framework.autoproxy.DefaultAdvisorAutoProxyCreator;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import javax.servlet.Filter;
//import java.util.HashMap;
//import java.util.LinkedHashMap;
//import java.util.Map;
//
///**
// * Description:s1 shiro配置类
// * Created by IntelliJ IDEA
// * User:jaywechen
// * Date:17:15 2017/11/25
// */
//@Configuration
//public class ShiroConfig {
//
//    @Bean("sessionManager")
//    public SessionManager sessionManager(){
//        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
//        //定时清除过期会话
//        sessionManager.setSessionValidationSchedulerEnabled(true);
//        sessionManager.setSessionIdUrlRewritingEnabled(false);
//        return sessionManager;
//    }
//
//    @Bean("securityManager")
//    public SecurityManager securityManager(SessionManager sessionManager, OAuthRealm oAuthRealm){
//        DefaultWebSecurityManager securityManager = new DefaultWebSecurityManager();
//        //认证授权
//        securityManager.setRealm(oAuthRealm);
//        //会话
//        securityManager.setSessionManager(sessionManager);
//        return securityManager;
//    }
//
//    @Bean
//    public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager){
//        ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();
//        //设置security manager
//        shiroFilter.setSecurityManager(securityManager);
//
//        //oauth过滤
//        Map<String,Filter> filters = new HashMap<>();
////        filters.put("oauth",new Filter);
////        shiroFilterFactoryBean.setFilters(filters);
//
//        Map<String,String> filterMap = new LinkedHashMap<>();
//        filterMap.put("/sys/login", "anon");
//        filterMap.put("/**/*.css", "anon");
//        filterMap.put("/**/*.js", "anon");
//        filterMap.put("/**/*.html", "anon");
//        filterMap.put("/fonts/**", "anon");
//        filterMap.put("/plugins/**", "anon");
//        filterMap.put("/captcha.jpg", "anon");
//        filterMap.put("/", "anon");
//        filterMap.put("/**", "oauth2");
//
//        shiroFilter.setFilterChainDefinitionMap(filterMap);
//        return shiroFilter;
//    }
//
//
//    @Bean("lifecycleBeanPostProcessor")
//    public LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
//        return new LifecycleBeanPostProcessor();
//    }
//
//    @Bean
//    public DefaultAdvisorAutoProxyCreator defaultAdvisorAutoProxyCreator() {
//        DefaultAdvisorAutoProxyCreator proxyCreator = new DefaultAdvisorAutoProxyCreator();
//        proxyCreator.setProxyTargetClass(true);
//        return proxyCreator;
//    }
//
//    @Bean
//    public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
//        AuthorizationAttributeSourceAdvisor advisor = new AuthorizationAttributeSourceAdvisor();
//        advisor.setSecurityManager(securityManager);
//        return advisor;
//    }
//}
