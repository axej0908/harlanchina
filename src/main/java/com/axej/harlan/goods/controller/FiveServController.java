package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.FiveServBean;
import com.axej.harlan.goods.service.FiveServ;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @Author: jaywechen
 * @Description: 五大服务的提交和查看
 * @Created by: IntelliJ IDEA
 * @Modified By: jaywechen
 * @Date: 10:03 2018/3/7
 */
@RestController
@RequestMapping(value = "/fiveSer")
public class FiveServController {

    @Autowired
    private FiveServ fiveServ;

    /**
     * 1.保存
     * @param fiveServBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(FiveServBean fiveServBean){
        if (fiveServBean == null){
            return R.error("param null");
        }
        boolean flag = fiveServ.save(fiveServBean);
        if (flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * 修改
     * @param param
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(FiveServBean param){
        if(param.getFive_id() == 0){
            return R.error("null param");
        }
        int i = fiveServ.update(param);
        if(i == 1){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }


    /**
     * 2.分页查询
     * @param jsonStr
     * @param map
     * user_id
     * page
     * limit
     * five_type
     * @return
     */
    @RequestMapping(value = "/pager")
    public R pager(String jsonStr,Map<String,Object> map){
        if (StringUtils.isEmpty(jsonStr)){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        List<FiveServBean> list = fiveServ.queryList(query);
        int total = fiveServ.queryTotal(query);
        PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
        return R.ok("success").put("data",pageUtils);
    }
    /**
     * 2.个人中心harlan眼服务
     * @param jsonStr
     * @param map
     * user_id
     * page
     * limit
     * five_type
     * @return
     */
    @RequestMapping(value = "/per_pager")
    public R per_pager(String jsonStr,Map<String,Object> map){
        if (StringUtils.isEmpty(jsonStr)){
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        /*if(map.get("five_type").equals("har")){
            List<FiveServBean> list = fiveServ.dimType(query);
            int total = fiveServ.dimTotal(query);
            PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
            return R.ok("success").put("data",pageUtils);
        }*/
        List<FiveServBean> list = fiveServ.per_queryList(query);
        int total = fiveServ.per_queryTotal(query);
        PageUtils pageUtils = new PageUtils(list,total,query.getLimit(),query.getPage());
        return R.ok("success").put("data",pageUtils);
    }
}
