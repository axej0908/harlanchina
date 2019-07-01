package com.axej.harlan.common.intercept;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Description:
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:16:05 2017/12/14
 */
@Configuration
public class CWebMvcConfig extends WebMvcConfigurerAdapter {

    @Value("${cjw.filePath}")
    private String filePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/**").addResourceLocations(filePath);
        registry.addResourceHandler("/files/**").addResourceLocations("classpath:/files/");
        super.addResourceHandlers(registry);
    }

    @Override
    public void addViewControllers( ViewControllerRegistry registry ) {
        registry.addViewController( "/" ).setViewName( "forward:/guide_en.html" );
        registry.setOrder(Ordered.HIGHEST_PRECEDENCE );
        super.addViewControllers( registry );
    }

}
