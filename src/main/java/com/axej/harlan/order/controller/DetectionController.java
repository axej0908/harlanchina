package com.axej.harlan.order.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.FileUtils;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.DetectionBean;
import com.axej.harlan.order.service.DetectionService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 付费三方检测操作
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 15:09 2017/12/23
 */
@RestController
@RequestMapping(value = "/detection")
public class DetectionController extends AbstractController{

    @Autowired
    private DetectionService detectionService;

    /**
     * 上传 需要检测的文件
     * @param file
     * @param mobile (委托人手机号)
     * @return
     */
    @RequestMapping(value = "/upload")
    public R upload(MultipartFile file,String mobile){
        String path = FileUtils.upload(file,mobile);
        return R.ok("success").put("data",path);
    }

    /**
     * 保存
     * @param detectionBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(DetectionBean detectionBean){
        if (detectionBean == null || detectionBean.getDetect_id() != 0){
            logger.error("error param");
            return R.error("error param");
        }
        boolean flag = detectionService.save(detectionBean);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }


    /**
     * 查看 所有的申请三方检测的列表
     * @param jsonStr
     * user_id
     * page
     * limit
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(String jsonStr){
        if (!StringUtils.isNotBlank(jsonStr)) {
            return R.error("error param");
        }
        Map<String,Object> map = JSON.parseObject(jsonStr);
        if (map.get("page")==null || map.get("limit")==null){
            return R.error("error param");
        }
        Query query = new Query(map);
        List<DetectionBean> list = detectionService.queryList(query);
        int total = detectionService.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
        return R.ok().put("data",pageUtils);
    }

    /**
     * 查看 详情
     * @param detectionBean
     * @return
     */
    @RequestMapping(value = "/detail")
    public R detail(DetectionBean detectionBean){

        return R.ok();
    }
}
