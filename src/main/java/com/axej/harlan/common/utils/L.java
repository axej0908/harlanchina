package com.axej.harlan.common.utils;

import java.util.HashMap;
import java.util.List;

/**
 * @Author: jaywechen
 * @Description:
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:02 2018/3/17
 */
public class L extends HashMap<String,Object>{

    private static final String MSG_SUCCESS = "success";
    /**
     * success
     * @return
     */
    public static L ok(Integer count, List<?> list){
        L r = new L();
        r.put("code",0);
        r.put("msg",MSG_SUCCESS);
        r.put("count",count);
        r.put("data",list);
        return r;
    }

    public static L ok(){
        L r = new L();
        r.put("code",0);
        r.put("msg",MSG_SUCCESS);
        return r;
    }

    /**
     * faliure
     * @return
     */
    public static L error(String msg){
        L r = new L();
        r.put("code",0);
        r.put("msg",msg);
        return r;
    }
}
