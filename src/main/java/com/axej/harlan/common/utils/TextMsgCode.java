package com.axej.harlan.common.utils;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * Description:发送短信验证码
 * Created by IntelliJ IDEA
 * User:jaywechen
 * Date:18:20 2017/11/28
 */
public class TextMsgCode {

    /**
     * 1. 产生随机验证码
     * @return
     */
    public static int produceCode(){
        int code = 0;
        Random random = new Random();
        while (code < 100000) {
            code = random.nextInt(999999);
        }
        return code;
    }


    //发送验证码
    public static Map<String,Object> sendCodeMod(String mobile,int code){
        HttpEntity entity = null;
        Map<String,Object> map=new HashMap<String,Object>();
        //1，获取3分钟后的时间
        Date date = new Date();
        date = new Date(date.getTime()+3*60*1000);
        //2，随机生成验证码
      /*  Random random = new Random();
        while(code < 100000){
            code = random.nextInt(999999);
        }*/
        //3，调用短信接口，发送验证码
        String path="https://dx.ipyy.net/sms.aspx?action=send&userid=5433&account=HarLan&password=123456&mobile="
                +mobile+"&content=【化浪】尊敬的用户，您的验证码为："+code+"，请您妥善保管！感谢您使用化浪平台。";
        @SuppressWarnings("deprecation")
        HttpClient httpclient = new DefaultHttpClient();
        HttpGet httpget = new HttpGet(path);
        HttpResponse response = null;
        try {
            response = httpclient.execute(httpget);
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            System.out.println(e.getMessage());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            System.out.println(e.getMessage());
        }
        entity = response.getEntity();
        map.put("entity", entity);
        map.put("code", code);
        map.put("time", new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date));
        System.out.println(map.toString());
        return map;
    }


    //发送验证码
    public static Map<String,Object> sendOrderMod(String mobile, String status){
        HttpEntity entity = null;
        Map<String,Object> map=new HashMap<String,Object>();
        //3，调用短信接口，发送验证码
        String path = "";
        //提交订单 发送短信通知
        if(status.equals("sub")){
            path = "https://dx.ipyy.net/sms.aspx?action=send&userid=5433&account=HarLan&password=123456&mobile="

                    +mobile+"&content=【化浪】尊敬的化浪供应商您好，您有一笔新订单，请及时处理。";
        //发货通知
        }else if(status.equals("con")){
            path = "https://dx.ipyy.net/sms.aspx?action=send&userid=5433&account=HarLan&password=123456&mobile="
                    +mobile+"&content=【化浪】尊敬的化浪采购商您好，您的订单已经发货，请您注意查收。";
        }
        @SuppressWarnings("deprecation")
        HttpClient httpclient = new DefaultHttpClient();
        HttpGet httpget = new HttpGet(path);
        HttpResponse response = null;
        try {
            response = httpclient.execute(httpget);
        } catch (ClientProtocolException e) {
            // TODO Auto-generated catch block
            System.out.println(e.getMessage());
        } catch (IOException e) {
            // TODO Auto-generated catch block
            System.out.println(e.getMessage());
        }
        entity = response.getEntity();
        map.put("entity", entity);
        System.out.println(map.toString());
        return map;
    }
}
