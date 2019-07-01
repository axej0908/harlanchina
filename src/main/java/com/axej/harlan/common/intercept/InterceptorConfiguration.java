/*

package com.axej.harlan.common.intercept;


import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;


*/
/**
 * Description:注册拦截器
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:12:08 2017/12/6
 *//*


@Component
public class InterceptorConfiguration extends WebMvcConfigurerAdapter {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //1.注册拦截器m
        InterceptorRegistration ir = registry.addInterceptor(new LoginInterceptor());

        //2.配置拦截路径
        ir.addPathPatterns("/**");
        //3.配置不拦截的路径
        ir.excludePathPatterns("/log/**","/product/**","/files/**");
    }
}

*/
