package com.axej.harlan.cms.controller;

import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.goods.bean.FindGoodsBean;
import com.axej.harlan.goods.service.FindGoodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：系统询盘管理
 * Tools: IntelliJ IDEA
 * Aauthor：cheungn
 * Date：10:09 2019/4/10
 */
@RestController
@RequestMapping(value = "/cmsInquiry")
public class CmsInquiryController extends AbstractController {

    @Autowired
    private FindGoodsService findGoodsService;

    /**
     * 查询询盘
     * @param goods_state
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "pager")
    public R queryInquiryList(String goods_state, int page, int limit, Map<String, Object> map){
        map.put("goods_state", goods_state);
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<FindGoodsBean> list = findGoodsService.queryInquiryList(query);
        int total = findGoodsService.queryTotal(query);
        return R.ok().put("data", list).put("count", total);
    }

    /**
     * 详情
     * @param goods_id
     * @return
     */
    @RequestMapping(value = "detail")
    public R detail(int goods_id){
        if(goods_id == 0){
            return R.error("null param");
        }
        FindGoodsBean findGoodsBean = findGoodsService.queryInquiryObject(goods_id);
        if(findGoodsBean != null){
            return R.ok().put("data", findGoodsBean);
        }else {
            return R.error().put("data", null);
        }
    }
}
