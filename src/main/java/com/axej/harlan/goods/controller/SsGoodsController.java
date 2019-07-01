package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.status.GoodsMallCons;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.service.GoodsMallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Description：商城商品
 *
 * @author jaywechen
 * Date: 14:09 2017/12/20
 */
@Controller
public class SsGoodsController extends AbstractController {

    @Autowired
    private GoodsMallService goodsMallService;


    /**
     * 删除商品
     *
     * @Method: delete
     */
    @RequestMapping(value = "/index_type.html")
    public ModelAndView index_type(String oneType, String twoType, ModelMap map) {
        map.put("oneType",oneType);
        map.put("twoType",twoType);
        return new ModelAndView("index_type",map);
    }

}
