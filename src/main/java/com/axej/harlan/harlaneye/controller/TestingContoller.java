package com.axej.harlan.harlaneye.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.common.utils.*;
import com.axej.harlan.harlaneye.bean.TestingBean;
import com.axej.harlan.harlaneye.service.TestingService;
import jdk.nashorn.internal.ir.RuntimeNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;


/**
 * des:化浪眼-检测服务，相关接口
 * author：xulei
 *
 */
@CrossOrigin
@RestController
@RequestMapping(value = "/Testing")
public class TestingContoller extends JsonUtils {

    @Autowired TestingService testingService;

    /**
     * Des:插入检测订单接口
     * @param testingBean
     * @return
     */
    @RequestMapping({"insertTesting"})
    public void insertTestingData(TestingBean testingBean){
        JSONObject json=new JSONObject();
        if(testingBean==null || testingBean.equals("")) {
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","插入失败，检测订单不能为空");
        }else
        {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            testingBean.setApply_date(df.format(new Date()));
            testingBean.setTesting_id(UUIDGenerator.getUUID());
            testingBean.setStatus("1");
            if(testingService.insert(testingBean))
            {
                json.put("code",200);
                json.put("result",0);
                json.put("data","{}");
                json.put("msg","检测订单插入成功");
            }else{
                json.put("code",500);
                json.put("result",-1);
                json.put("data","{}");
                json.put("msg","检测订单插入失败");
            }

        }
        writeJson(json);

    }

    /**
     * Des:修改订单状态，=1待受理；=2已取消（用户取消和管理后台驳回）；=3已受理待支付;=4待检测；=5检测中；=6已完成
     * @param testing_id,testing_status
     * @return R
     */

    @RequestMapping({"updateTesting"})
    public void updateTesting(String testing_id,int testing_status){
        JSONObject json=new JSONObject();
        if(testing_status!=0)
        {
            if(testingService.updateTesting(testing_id,testing_status))
            {
                json.put("code",200);
                json.put("result",0);
                json.put("data","{}");
                json.put("msg","修改检测订单成功，当前值="+testing_status);

            }else {
                json.put("code",500);
                json.put("result",-1);
                json.put("data","{}");
                json.put("msg","修改检测订单失败，检测订单编号="+testing_id);
            }

        }else{
            json.put("code",501);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","状态值不能为0");
        }
        writeJson(json);
    }


    /**
     * des:根据检测订单ID 获取该检测订单所有的数据
     * @param testingId
     * @return
     */
    @RequestMapping({"getTesting"})
    public void getTesting(String testingId)
    {
        JSONObject json=new JSONObject();
        TestingBean testingBean= testingService.getTesting(testingId);

        if( testingBean!=null)
        {
            json.put("code",200);
            json.put("result",0);
            json.put("data",testingBean);
            json.put("msg","成功找到检测订单="+testingId+"的订单");

        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","没有找到该订单");
        }
        writeJson(json);
    }

    /**
     * des:根据用户ID和状态 获取检测订单
     */
    @RequestMapping({"getTestingByUserAndStatus"})
    public void getTestingByUserAndStatus(String user_id,int testing_status,int limit,int page){
        JSONObject json =new JSONObject();
        List<TestingBean> testingBeanList =testingService.getTestingByUserAndStatus(user_id,testing_status);
        if(testingBeanList!=null)
        {
            Paper paper=new Paper(testingBeanList,testingBeanList.size(),limit,page);
            json.put("code",200);
            json.put("result",0);
            json.put("msg","成功获取用户id="+user_id+"的数据");
            json.put("listsize",testingBeanList.size());
            json.put("data",paper);

        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","获取用户id="+user_id+"的数据失败");
            json.put("data","{}");

        }
        writeJson(json);
    }

    /**
     * 根据订单状态获取所有检测订单，用于后台
     * @param testing_status
     * @param page
     * @param limit
     */
    @RequestMapping({"getTestingByStatus"})
    public L getTestingByStatus(int testing_status,int page,int limit)
    {

        List<TestingBean> testingBeanList=testingService.getTestingByStatus(testing_status);
        if(testingBeanList!=null)
        {
            return L.ok(testingBeanList.size(),testingBeanList);
        }else{
            return L.error("查找失败");
        }
    }



    /***
     * 管理后台修改检测报告的报价
     */
    @RequestMapping({"updateTestingPrice"})
    public void updateTestingPrice(String testing_id,double testing_prep_fee,double sample_prep_fee,double subcontracted_fee,double express_fee,double english_report_fee,double others_fee,double vat_fee,double total_fee,String sample_express_addr)
    {
        JSONObject json =new JSONObject();

        DecimalFormat df = new DecimalFormat("#.00");
        //二次校验，页面传回的总价，是否等于实际总价
        double tempTotalFee=testing_prep_fee+sample_prep_fee+subcontracted_fee+express_fee+english_report_fee+others_fee+vat_fee;
        if(df.format(tempTotalFee).equals(df.format(total_fee)))
        {
            if(testingService.updateTestingPrice(testing_id,testing_prep_fee,sample_prep_fee,subcontracted_fee,express_fee,english_report_fee,others_fee,vat_fee,total_fee,sample_express_addr))
            {
                json.put("code",200);
                json.put("result",0);
                json.put("msg","检测单报价成功");
                json.put("data","{}");
            }else{
                json.put("code",500);
                json.put("result",-1);
                json.put("msg","检测单报价失败");
                json.put("data","{}");
            }


        }else{
            //页面计算总价与服务端不一致
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","检测单报价失败,服务端计算总价和页面总价不一致");
            json.put("data","{}");

        }

        writeJson(json);
    }

    /**
     * 文件上传接口
     * param:testing_id 检测订单编号
     *       fileType 文件类型，=1表示用户上传的委托单，=2表示后台上传的发票；=3表示后台上传的检测报告
     */
    @RequestMapping({"uploadFiles"})
    public void uploadFiles(String testing_id, int fileType, MultipartFile file)
    {
        JSONObject json=new JSONObject();
        if (file == null || file.getSize() == 0) {
            json.put("code" , 500);
            json.put("result",-1);
            json.put("data" , "{}");
            json.put("msg" , "文件大小为0");

        }else{
            SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");//设置日期格式

            String res = FileUtils.upload(file,df.format(new Date()));

            //根据订单编号，上传对应的文件路径
            if(testingService.uploadFile(testing_id, fileType, res)){
                json.put("code" , 200);
                json.put("result",0);
                json.put("data" , "{}");
                json.put("msg" , "上传成功");
            }else{
                json.put("code" , 500);
                json.put("result",-1);
                json.put("data" , "{}");
                json.put("msg" , "上传文件失败");
            }
        }

        writeJson(json);
    }

    /**
     * DES：支付接口：用户调取支付接口，实现支付，修改订单状态，=1待受理；=2已取消（用户取消和管理后台驳回）；=3已受理待支付;=4待检测；=5检测中；=6已完成
     *      这里订单状态，先判断是否是=3 只有在状态值=3的情况下，才能进行支付
     * @param testing_id
     */
    public void payForTesting(String testing_id,int testing_cur_status)
    {
        JSONObject json=new JSONObject();
        if(testing_cur_status==3)
        {
            //TODO

        }else{
            json.put("code" , 500);
            json.put("result",-1);
            json.put("data" , "{}");
            json.put("msg" , "当前状态不允许支付，当前状态值="+testing_cur_status);
        }

        writeJson(json);

    }


}
