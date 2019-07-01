package com.axej.harlan.order.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.SupervisionBean;
import com.axej.harlan.order.service.SupervisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description:免费监理
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:17:21 2017/12/15
 */
@RestController
@RequestMapping(value = "/freeSupervision")
public class SupervisionController extends AbstractController{

    @Autowired
    private SupervisionService supervisionService;

    /**
     * 保存 - 免费监理记录 --(同时还要保存物流记录)
     * supervisionBean - > supv_name
     * supervisionBean - > log_number
     * supervisionBean - > logisticsBeans
     *
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(SupervisionBean supervisionBean,MultipartFile os_files_file){
        if (supervisionBean == null || supervisionBean.getSupv_id() != 0){
            logger.error("null param");
            return R.error("null param");
        }
        boolean flag = supervisionService.save(supervisionBean);
        if(flag){
            return R.ok("success").put("supv_id",supervisionBean.getSupv_id());
        } else{
            return R.error("failure");
        }
    }


    /**
     * 查询 列表(同时查询 监理记录 和 该监理记录下的所有物流记录)
     * @param supervisionBean
     * @return
     */
    @RequestMapping(value = "/detail")
    public R list(SupervisionBean supervisionBean){
        SupervisionBean dbBean = supervisionService.queryObject(supervisionBean);
        return R.ok().put("data",dbBean);
    }
}
