package com.axej.harlan.harlaneye.controller;

import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.common.utils.*;
import com.axej.harlan.harlaneye.bean.LoadingSupervisionBean;
import com.axej.harlan.harlaneye.service.LoadingSupervisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(value = "/Supervision")
public class LoadingSupervisionController extends JsonUtils {

    @Autowired private LoadingSupervisionService loadingSupervisionService;
    /**
     * 插入监装表
     */
    @RequestMapping({"insertSupervision"})
    public void insertSupervision(LoadingSupervisionBean loadingSupervisionBean)
    {
        JSONObject json=new JSONObject();

        if(loadingSupervisionBean !=null)
        {   SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            loadingSupervisionBean.setApply_date(df.format(new Date()));
            loadingSupervisionBean.setSupervision_id(UUIDGenerator.getUUID());
            loadingSupervisionBean.setStatus("1");
            if(loadingSupervisionService.insertSupervision(loadingSupervisionBean))
            {
                json.put("code",200);
                json.put("result",0);
                json.put("data","{}");
                json.put("msg","插入监装订单成功");
            }else{
                json.put("code",500);
                json.put("result",-1);
                json.put("data","{}");
                json.put("msg","插入监装订单到数据库操作失败");
            }
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","插入失败，监装订单不能为空");
        }

        writeJson(json);
    }


    /**
     * 根据用户ID和状态返回 不同状态下的监装订单，其中如果状态值=0 表示获取全部状态下的订单
     */
    @RequestMapping({"getSupervisionByUserAndStatus"})
    public void getSupervisionByUserAndStatus(String user_id,int supervision_status,int limit,int page)
    {
        JSONObject json=new JSONObject();
        List<LoadingSupervisionBean> loadingSupervisionBeanList =new ArrayList<LoadingSupervisionBean>();
        loadingSupervisionBeanList = loadingSupervisionService.getSupervisionByUserAndStatus(user_id, supervision_status);
        if(loadingSupervisionBeanList!=null)
        {
            Paper paper=new Paper(loadingSupervisionBeanList,loadingSupervisionBeanList.size(),limit,page);
            json.put("code",200);
            json.put("result",0);
            json.put("data", paper);
            json.put("msg","获取监装订单成功，用户ID="+user_id+",当前状态="+supervision_status);
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","无此用户ID="+user_id+",当前状态="+supervision_status+"的数据");
        }


        writeJson(json);
    }


    /**
     * 根据状态值，获取系统下所有监装订单
     */
    @RequestMapping({"getSupervisionByStatus"})
    public L getSupervisionByStatus(int supervision_status,int limit, int page)
    {

        List<LoadingSupervisionBean> loadingSupervisionBeanList =new ArrayList<LoadingSupervisionBean>();
        loadingSupervisionBeanList = loadingSupervisionService.getSupervisionByStatus(supervision_status);
        if(loadingSupervisionBeanList!=null)
        {
            return L.ok(loadingSupervisionBeanList.size(),loadingSupervisionBeanList);
        }else{
            return L.error("无监装订单数据");
        }

    }

    /**
     * 根据监装订单ID获取监装订单信息
     */
    @RequestMapping({"getSupervisionById"})
    public void getSupervisionById(String supervision_id)
    {
        JSONObject json=new JSONObject();
        LoadingSupervisionBean loadingSupervisionBean = loadingSupervisionService.getSupervisionById(supervision_id);
        if(loadingSupervisionBean !=null)
        {
            json.put("code",200);
            json.put("result",0);
            json.put("data", loadingSupervisionBean);
            json.put("msg","查找监装订单成功，ID="+supervision_id);
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","无数据，当前监装订单ID="+supervision_id);
        }

        writeJson(json);
    }

    /**
     * 根据监装订单ID 修改订单状态
     *
     */
    @RequestMapping({"updateSupervisionStatusById"})
    public void updateSupervisionStatusById(String supervision_id ,int supervision_status)
    {
        JSONObject json=new JSONObject();
        if(loadingSupervisionService.updateSupervisionStatusById(supervision_id, supervision_status))
        {
            json.put("code",200);
            json.put("result",0);
            json.put("data","{}");
            json.put("msg","根据监装ID修改订单状态为="+supervision_status+",成功！");
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","根据监装ID修改订单状态为="+supervision_status+",失败！");
        }
        writeJson(json);
    }

    /**
     * 根据监装订单ID，修改报价
     */
    @RequestMapping({"updateSupervisionPrice"})
    public void updateSupervisionPrice(String supervision_id,double inspection_fee,double analysis_fee,double paper_fee,double  added_fee,double others_fee,double travelling_fee,double englishreport_fee,double total_fee)
    {
        JSONObject json=new JSONObject();
        if(loadingSupervisionService.updateSupervisionPrice(supervision_id, inspection_fee, analysis_fee, paper_fee, added_fee, others_fee, travelling_fee, englishreport_fee,total_fee))
        {
            json.put("code",200);
            json.put("result",0);
            json.put("data","{}");
            json.put("msg","修改监装订单成功！");
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("data","{}");
            json.put("msg","修改监装订单失败！");
        }
        writeJson(json);
    }

    /**
     * 文件上传接口
     * param:testing_id 检测订单编号
     *       fileType 文件类型，=1表示用户上传的委托单，=2表示后台上传的发票；=3表示后台上传的检测报告
     */
    @RequestMapping({"uploadFiles"})
    public void uploadFiles(String supervision_id, int fileType, MultipartFile file)
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
            if(loadingSupervisionService.uploadFiles(supervision_id, fileType, res)){
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



}
