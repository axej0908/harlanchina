package com.axej.harlan.goods.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.status.GoodsMallCons;
import com.axej.harlan.common.utils.ConcurrentDateUtils;
import com.axej.harlan.common.utils.PageUtils;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.GoodsMallBean;
import com.axej.harlan.goods.bean.ShopBean;
import com.axej.harlan.goods.service.GoodsMallService;
import org.apache.catalina.util.ConcurrentDateFormat;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Description：商城商品
 *
 * @author jaywechen
 * Date: 14:09 2017/12/20
 */
@RestController
@RequestMapping(value = "/goodsMall")
public class GoodsMallController extends AbstractController {

    @Autowired
    private GoodsMallService goodsMallService;


    /**
     * c1.保存商品
     *
     * @param goodsMallBean
     */
    @RequestMapping(value = "/save")
    public R save(GoodsMallBean goodsMallBean) {
        if (goodsMallBean == null) {
            return R.error("param error");
        }
        boolean flag = goodsMallService.save(goodsMallBean);
        if (flag) {
            return R.ok("success").put("goods_id", goodsMallBean.getGoods_id());
        } else {
            return R.error("fail");
        }
    }

    /**
     * 修改商品信息
     * (用作移动端 在第一次保存完商品自身属性参数之后,更新商品其他页面参数。比如品质、报告、金属)
     *
     * @param goodsMallBean
     */
    @RequestMapping(value = "/update")
    public R update(GoodsMallBean goodsMallBean) {
        if (goodsMallBean == null) {
            logger.error("error param:" + goodsMallBean);
            return R.error("error param");
        }
        boolean flag = goodsMallService.update(goodsMallBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }


    /**
     * 三方产品审核
     * @param goodsMallBean
     * @return
     */
    @RequestMapping(value = "putawayCheck")
    public R putawayCheck(GoodsMallBean goodsMallBean){
        if (goodsMallBean == null) {
            logger.error("error param:" + JSON.toJSONString(goodsMallBean));
            return R.error("error param");
        }
        boolean flag = goodsMallService.update(goodsMallBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }



    /**
     * 上架
     *
     * @param goods_id
     */
    @RequestMapping(value = "/onShelve")
    public R onShelve(int goods_id) {
        if (goods_id == 0) {
            logger.error("error param:" + goods_id);
            return R.error("error param");
        }
        GoodsMallBean goodsMallBean = new GoodsMallBean();
        goodsMallBean.setGoods_id(goods_id);
        goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.UP.getVal());
        goodsMallBean.setStatus("1");
        boolean flag = goodsMallService.update(goodsMallBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

    /**
     * 下架商品
     *
     * @date: 14:10 2017/12/20
     */
    @RequestMapping(value = "/offShelve")
    public R offShelve(int goods_id) {
        if (goods_id == 0) {
            logger.error("error param:" + goods_id);
            return R.error("error param");
        }
        //商品状态 1 正常状态  2 待审核  3已下架
        GoodsMallBean goodsMallBean = new GoodsMallBean();
        goodsMallBean.setGoods_id(goods_id);
        goodsMallBean.setGoods_state(GoodsMallCons.GoodsStatus.DOWN.getVal());
        goodsMallBean.setStatus("2");
        boolean flag = goodsMallService.update(goodsMallBean);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }


    /**
     * 删除商品
     *
     * @Method: delete
     */
    @RequestMapping(value = "/delete")
    public R delete(long goods_id) {
        if (goods_id == 0) {
            logger.error("error param:" + goods_id);
            return R.error("error param");
        }
        boolean flag = goodsMallService.delete(goods_id);
        if (flag) {
            return R.ok("success");
        } else {
            return R.error("failure");
        }
    }

    /**
     * 查询单个商品
     * 根据用户id或者商品id
     */
    @RequestMapping(value = "/detail")
    public R detail(int goods_id) {
        GoodsMallBean dbBean = goodsMallService.queryObject(goods_id);
        return R.ok("success").put("data", dbBean);
    }

    /**
     * 2.R1 自营/三方
     * one_type 一级分类
     * two_type 二级分类
     * goods_purity 纯度
     * goods_deliver 货期
     * goods_name 商品名称
     * goods_type  商品类型 harlan_normal/hot others_  enquiry
     * user_id 发布者id(如果商品是化浪自营则不传)
     * goods_state 产品状态 wait_audit up down
     * page
     * limit
     *
     * @return
     */
    @RequestMapping(value = "/list")
    public R queryList(Map<String, Object> map, String jsonStr) {
        if (map.size() == 0 && jsonStr != null) {
            map = JSON.parseObject(jsonStr);
            //纯度取值范围
            String initial_purity = null;
            String finish_purity = null;
            if(map.get("goods_purity") != null){
                String purity = map.get("goods_purity").toString();
                if(purity.contains(",")){
                    String[] puritys = purity.split(",");
                    initial_purity = puritys[0];
                    finish_purity = puritys[1];
                    //重新赋值
                    map.put("goods_purity", null);
                }
            }
            map.put("initial_purity", initial_purity);
            map.put("finish_purity", finish_purity);
            //货期取值范围
            String initial_deliver = null;
            String finish_deliver = null;
            if(map.get("goods_deliver") != null){
                String deliver = map.get("goods_deliver").toString();
                if(deliver.contains(",")){
                    String[] delivers = deliver.split(",");
                    initial_deliver = delivers[0];
                    finish_deliver = delivers[1];
                    //重新赋值
                    map.put("goods_deliver", null);
                }
            }
            map.put("initial_deliver", initial_deliver);
            map.put("finish_deliver", finish_deliver);
        } else {
            return R.error("null param");
        }
        Query query = new Query(map);
        List<GoodsMallBean> goodsMallBeans = new ArrayList<>();
        //判断是否 查询系统询盘
        int num = 0;
        if (map.get("goods_type") != null && GoodsMallCons.GoodsType.ENQUIRY.getVal().equals(map.get("goods_type").toString())) {
            goodsMallBeans = goodsMallService.queryEnquiryList(query);
            num = goodsMallService.queryTotal(query);
        } else {
            goodsMallBeans = goodsMallService.queryList(query);
            num = goodsMallService.queryListTotal(query);
        }
        PageUtils pageUtils = new PageUtils(goodsMallBeans, num, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 商品最新报价
     * 老用户 根据下单进行模糊搜索  新用户 根据注册时购物倾向
     * user_id
     * page
     * limit
     *
     * @return
     */
    @RequestMapping(value = "/guessYouLike")
    public R guessYouLike(String jsonStr) {
        Map<String, Object> map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        //step:1判断是否下过订单
        List<GoodsMallBean> list = goodsMallService.queryListGuessYouLike(query);
        return R.ok("success").put("data", list);
    }


    /**
     * 1.根据商品名称搜索店铺以及商品(搜索参数 )
     *
     * @param jsonStr searchParam
     *                page
     *                limit
     * @return
     */
    @RequestMapping(value = "/listByName")
    public R queryListByName(String jsonStr, Map<String, Object> map) {
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        List<GoodsMallBean> list = goodsMallService.queryListByName(query);
        int total = goodsMallService.queryTotalByName(query);
        PageUtils pageUtils = new PageUtils(list, total, query.getLimit(), query.getPage());
        return R.ok("success").put("data", pageUtils);
    }

    /**
     * 根据cas搜索
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "/searchCas")
    public R searchCas(String jsonStr , Map<String , Object> map){
        map = JSON.parseObject(jsonStr);
        Query query = new Query(map);
        List<GoodsMallBean> goodsMallBeans = goodsMallService.queryListByCas(query);
        int total = goodsMallService.queryTotalByCas(query);
        return R.ok("success").put("data" , goodsMallBeans).put("count" , total);
    }

    /**
     * 添加询盘
     * @param goodsMallBean
     * @return
     */
    @RequestMapping(value = "saveTheEnquiries")
    public R saveTheEnquiries(GoodsMallBean goodsMallBean){
        if (goodsMallBean == null) {
            return R.error("param error");
        }
        boolean flag = goodsMallService.saveTheEnquiries(goodsMallBean);
        if (flag) {
            return R.ok("success").put("goods_id", goodsMallBean.getGoods_id());
        } else {
            return R.error("fail");
        }
    }


    /**
     * 热销产品
     * @return
     */
    @RequestMapping(value = "queryHotSell")
    public R queryHotSell(){
        List<GoodsMallBean> goodsMallBeans = goodsMallService.queryHotSell();
        return R.ok().put("data", goodsMallBeans);
    }
}
