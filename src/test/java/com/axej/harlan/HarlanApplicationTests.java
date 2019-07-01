package com.axej.harlan;

import com.axej.harlan.common.config.AlipayConstant;
import com.axej.harlan.common.utils.Paper;


import com.axej.harlan.order.UserInfo;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.ArrayList;



@SpringBootTest
@EnableConfigurationProperties({AlipayConstant.class})
public class HarlanApplicationTests {



    public static void main(String[] args)
    {
        System.out.println(Integer.parseInt(String.valueOf(System.currentTimeMillis())));
    }



}
