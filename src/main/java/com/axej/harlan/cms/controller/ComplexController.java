package com.axej.harlan.cms.controller;

import com.axej.harlan.cms.bean.ComplexBean;
import com.axej.harlan.cms.service.ComplexService;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：合成图片
 * Package com.axej.harlan.cms.controller
 * Class ComplexController
 * Aauthor：Ning
 * Date：11:13 2018/8/13
 */
@RestController
@RequestMapping(value = "/complex")
public class ComplexController {

    @Autowired
    private ComplexService complexService;

    /**
     * 保存
     * @param complexBean
     * @return
     */
    @RequestMapping(value = "/save")
    public R save(ComplexBean complexBean){
        if(complexBean == null){
            return R.error("param null");
        }
        boolean flag = complexService.save(complexBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 修改
     * @param complexBean
     * @return
     */
    @RequestMapping(value = "/edit")
    public R alter(ComplexBean complexBean){
        if(complexBean.getComplex_id() == 0){
            return R.error("param null");
        }
        boolean flag = complexService.update(complexBean);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 删除
     * @param complex_id
     * @return
     */
    @RequestMapping(value = "/del")
    public R del(int complex_id){
        if(complex_id == 0){
            return R.error("param null");
        }
        boolean flag = complexService.delete(complex_id);
        if(flag){
            return R.ok("success");
        }
        return R.error("fail");
    }

    /**
     * 查询每个合成路线下所有的图片
     * @param synthetic_id
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "/list")
    public R list(int synthetic_id , int page , int limit , Map<String , Object> map){
        if(synthetic_id == 0){
            return R.error("param null");
        }
        map.put("synthetic_id" , synthetic_id);
        map.put("page" , page);
        map.put("limit" , limit);
        Query query = new Query(map);
        List<ComplexBean> complexBeans = complexService.queryList(query);
        int total = complexService.queryTotal(query);
        return R.ok("success").put("data" , complexBeans).put("count" , total);
    }
}
