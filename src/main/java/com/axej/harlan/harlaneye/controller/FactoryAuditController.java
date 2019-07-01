package com.axej.harlan.harlaneye.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.axej.harlan.common.utils.*;
import com.axej.harlan.harlaneye.bean.FactoryAuditBean;
import com.axej.harlan.harlaneye.service.FactoryAuditService;
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
@RequestMapping(value = "/FactoryAudit")
public class FactoryAuditController extends JsonUtils {

    @Autowired
    FactoryAuditService factoryAuditService;

    /**
     * des:用户提交实地验厂表单
     * @param factoryAuditBean
     */
    @RequestMapping({"insertFactoryAudit"})
    public void insertFactoryAudit(FactoryAuditBean factoryAuditBean)
    {
        JSONObject json=new JSONObject();

        if(factoryAuditBean!=null)
        {

            factoryAuditBean.setFactory_id(UUIDGenerator.getUUID());
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
            factoryAuditBean.setApply_date(df.format(new Date()));
            factoryAuditBean.setStatus("1");
            if(factoryAuditService.insertFactoryAudit(factoryAuditBean))
            {
                json.put("code",200);
                json.put("result",0);
                json.put("msg","实地验厂表单插入成功");
                json.put("data","{}");
            }else{
                json.put("code",500);
                json.put("result",-1);
                json.put("msg","实地验厂，执行数据库插入操作失败");
                json.put("data","{}");
            }
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","实地验厂表单不能为空");
            json.put("data","{}");
        }

        writeJson(json);
    }

    /**
     * Des:获取用户全部或某个状态下的验厂订单
     *      如果状态值=0 表示获取全部状态，否则即获取对应状态下的值
     */
    @RequestMapping({"getFactoryAuditByUserAndStatus"})
    public void getFactoryAuditByUserAndStatus(String user_id,int factoryAudit_status,int limit,int page)
    {
        JSONObject json=new JSONObject();
        List<FactoryAuditBean> factoryAuditBeanList =new ArrayList<FactoryAuditBean>();
        factoryAuditBeanList=factoryAuditService.getFactoryAuditByUserAndStatus(user_id,factoryAudit_status);
        if(factoryAuditBeanList.size()>0)
        {
            Paper paper=new Paper(factoryAuditBeanList,factoryAuditBeanList.size(),limit,page);
            json.put("data",paper);
            json.put("code",200);
            json.put("result",0);
            json.put("msg","成功获取到用户的验厂数据");
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","没有该用户的实地验厂数据");
            json.put("data","{}");
        }


        writeJson(json);
    }

    /**
     * 根据验厂订单状态，获取所有订单列表
     */
    @RequestMapping({"getFactoryAuditByStatus"})
    public L getFactoryAuditByStatus(int factoryAudit_status,int limit,int page)
    {

        List<FactoryAuditBean> factoryAuditBeanList=factoryAuditService.getTestingByStatus(factoryAudit_status);
        if(factoryAuditBeanList!=null)
        {
            return L.ok(factoryAuditBeanList.size(),factoryAuditBeanList);
        }else{
            return L.error("查找失败");
        }

    }


    /**
     * Des:使用验厂订单编号，获取该订单的实地验厂所有数据
     */
    @RequestMapping({"getFactoryAuditById"})
    public void getFactoryAuditById(String factoryAudit_id){
        JSONObject json=new JSONObject();

        FactoryAuditBean factoryAuditBean =factoryAuditService.getFactoryAuditById(factoryAudit_id);
        if(factoryAuditBean!=null)
        {
            json.put("data",factoryAuditBean);
            json.put("code",200);
            json.put("result",0);
            json.put("msg","成功获取到ID="+factoryAudit_id+"的验厂数据");
        }else{
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","没有ID="+factoryAudit_id+"的实地验厂数据");
            json.put("data","{}");
        }


        writeJson(json);

    }


    /**
     * 修改验厂表单报价
     */
    @RequestMapping({"updateFactoryAuditPrice"})
    public void updateFactoryAuditPrice(String factoryAudit_id,double promanagement_fee,double supplier_fee,double englishreport_fee,double others_fee,double travelling_fee,double total_fee)
    {
        JSONObject json=new JSONObject();
        if(factoryAuditService.updateFactoryAuditPrice(factoryAudit_id,promanagement_fee,supplier_fee,englishreport_fee ,others_fee ,travelling_fee ,total_fee))
        {
            json.put("code",200);
            json.put("result",0);
            json.put("msg","修改验厂订单价格成功");
            json.put("data","{}");
        }else
        {
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","修改验厂订单价格失败");
            json.put("data","{}");
        }

        writeJson(json);
    }



    /**
    * 根据验厂订单编号，修改订单状态
    * */
    @RequestMapping({"updateFactoryAuditStatus"})
    public void updateFactoryAuditStatus(String factoryAudit_id,int factoryAudit_status)
    {
        JSONObject json=new JSONObject();
        if(factoryAuditService.updateFactoryAuditStatus(factoryAudit_id, factoryAudit_status))
        {
            json.put("code",200);
            json.put("result",0);
            json.put("msg","修改验厂订单状态成功");
            json.put("data","{}");
        }else
        {
            json.put("code",500);
            json.put("result",-1);
            json.put("msg","修改验厂订单状态失败");
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
    public void uploadFiles(String factoryAudit_id, int fileType, MultipartFile file)
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
            if(factoryAuditService.uploadFile(factoryAudit_id, fileType, res)){
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
