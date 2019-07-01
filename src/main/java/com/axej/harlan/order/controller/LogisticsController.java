package com.axej.harlan.order.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.order.bean.LogisticsBean;
import com.axej.harlan.order.service.LogisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * Description:免费监理更新物流信息
 * Created by IntelliJ IDEA
 * @author :jaywechen
 * Date:17:53 2017/12/15
 */
@RestController
@RequestMapping(value = "/logistics")
public class LogisticsController extends AbstractController {
    @Autowired
    private LogisticsService logisticsService;

    /**
     * 保存  物流信息(免费监理)
     *
     * @param logisticsBean os_content
     * @param logisticsBean supv_id
     * @param logisticsBean os_files(文件名)
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(LogisticsBean logisticsBean, MultipartFile os_files_file) {
        if (logisticsBean == null ){
            logger.error("null param");
            return R.error("null param").put("data",logisticsBean);
        }
        boolean flag = logisticsService.save(logisticsBean,os_files_file);
        if (flag){
            return R.ok("success").put("os_id", logisticsBean.getOs_id());
        } else{
            return R.error("failure");
        }
    }

    /**
     *  修改 物流信息（免费监理）
     *  logisticsBean - > os_id
     *  logisticsBean - > os_content
     *  logisticsBean - > os_files(文件名称)
     */
    @RequestMapping(value = "/update")
    public R update(LogisticsBean logisticsBean,MultipartFile os_files_file){
        if (logisticsBean == null){
            logger.error("error param");
            return R.error("error param");
        }
        boolean flag = logisticsService.update(logisticsBean,os_files_file);
        if (flag){
            return R.ok("success");
        }else {
            return R.error();
        }
    }

    /**
     * 删除 物流信息(免费监理)
     * @return
     */
    @RequestMapping(value = "delete/{os_id}")
    public R delete(@PathVariable("os_id") int os_id){
        if (os_id == 0){
            return R.error("error param"+os_id);
        }
        boolean flag = logisticsService.delete(os_id);
        if (flag){
            return R.ok();
        }else {
            return R.error();
        }
    }
}
