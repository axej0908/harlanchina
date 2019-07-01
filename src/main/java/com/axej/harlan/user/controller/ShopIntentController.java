package com.axej.harlan.user.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.user.bean.ShopIntentBean;
import com.axej.harlan.user.service.ShopIntentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
* Description：购物倾向
* @author : jaywechen
* Date: 14:09 2017/12/20
*/
@RestController
@RequestMapping(value = "/shopIntent")
public class ShopIntentController extends AbstractController {

    @Autowired
    private ShopIntentService shopIntentService;

    /**
     * 保存 (购物倾向)
     *
     * @Method: save
     * @param shopIntentBean
     * @date: 14:09 2017/12/20
     */
    @RequestMapping(value = "/save")
    public R save(ShopIntentBean shopIntentBean){
        if(shopIntentBean == null){
            return R.error("param error");
        }
        boolean flag = shopIntentService.save(shopIntentBean);
        if(flag) {
            return R.ok();
        }else {
            return R.error();
        }
    }

    /**
     * 删除购物商品
     *
     * @Method: delete
     * @param shopIntent_id
     * @date: 14:10 2017/12/20
     */
    @RequestMapping(value = "/delete/{shopIntent_id}")
    public R delete(@PathVariable("shopIntent_id") Long shopIntent_id){
        if(shopIntent_id == null){
            logger.error("error param:"+shopIntent_id);
            return R.error("error param");
        }
        boolean flag = shopIntentService.delete(shopIntent_id);
        if(flag) {
            return R.ok("success");
        }else {
            return R.error("failure");
        }
    }

    /**
     * 修改 购物商品
     *
     * @Method: update
     * @param productBean
     * @date: 14:10 2017/12/20
     */
    @RequestMapping(value = "/update")
    public R update(ShopIntentBean productBean){
        if(productBean == null){
            logger.error("error param:"+productBean.toString());
            return R.error("error param");
        }
        boolean flag = shopIntentService.update(productBean);
        if (flag) {
            return R.ok("success");
        }else {
            return R.error("failure");
        }
    }

    /**
     * 查询 detail
     *
     * @Method: detail
     * @date: 14:10 2017/12/20
     */
    @RequestMapping(value = "/detail")
    public R detail(ShopIntentBean shopIntentBean){
        if(shopIntentBean == null || shopIntentBean.getShopIntent_id() == 0){
            logger.error("param error:"+shopIntentBean.getShopIntent_id());
            return R.error("param error");
        }
        ShopIntentBean dbBean = shopIntentService.queryObject(shopIntentBean);
        return R.ok("success").put("data",dbBean);
    }

    /**
     * 查询乱序的购物倾向
     * @return
     */
    @RequestMapping(value = "/list")
    public R queryRandomList(ShopIntentBean shopIntentBean){
        List<ShopIntentBean> shopIntentBeans = shopIntentService.queryRandomList(shopIntentBean);
        return R.ok("success").put("data",shopIntentBeans);
    }
}
