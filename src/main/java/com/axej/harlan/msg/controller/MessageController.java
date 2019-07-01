package com.axej.harlan.msg.controller;

import com.alibaba.fastjson.JSON;
import com.axej.harlan.common.base.AbstractController;
import com.axej.harlan.common.utils.Query;
import com.axej.harlan.common.utils.R;
import com.axej.harlan.msg.bean.MessageBean;
import com.axej.harlan.msg.service.MessageService;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

/**
 * Description：消息
 * Package com.axej.harlan.msg.controller
 * Class MessageController
 * Aauthor：Ning
 * Date：15:00 2018/12/20 
 */
@RestController
@RequestMapping(value = "/message")
public class MessageController extends AbstractController {

    @Autowired
    private MessageService messageService;

    /**
     * Send Json Message
     * @param messageBean
     * @return
     */
    @RequestMapping(value = "save")
    public R save(MessageBean messageBean){
        if(messageBean == null){
            logger.error("error param" + JSON.toJSONString(messageBean));
            return R.error("null param");
        }
        boolean flag = messageService.save(messageBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * Edit the message
     * @param messageBean
     * @return
     */
    @RequestMapping(value = "edit")
    public R edit(MessageBean messageBean){
        if(messageBean.getMess_id() == 0 && messageBean.getUser_id() == 0){
            logger.error("error param" + JSON.toJSONString(messageBean));
            return R.error("null param");
        }
        boolean flag = messageService.edit(messageBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * Delete the Message
     * @param messageBean
     * @return
     */
    @RequestMapping(value = "del")
    public R del(MessageBean messageBean){
        if(messageBean == null){
            logger.error("error param" + JSON.toJSONString(messageBean));
            return R.error("null param");
        }
        boolean flag = messageService.del(messageBean);
        if(flag){
            return R.ok("success");
        }else {
            return R.error("fail");
        }
    }

    /**
     * Query the Message
     * condition：1.user_id 2.mess_type 3.status 4.title
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryList")
    public R queryList(String jsonStr, Map<String, Object> map){
        if(jsonStr == null || (jsonStr.trim()).equals("")){
            logger.error("error param" + jsonStr);
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        if (map.get("page") == null || map.get("limit") == null) {
            logger.error("pagination param error");
            return R.error("pagination param error");
        }
        Query query = new Query(map);
        List<MessageBean> messageBeans = messageService.queryList(query);
        int total = messageService.queryTotal(query);
        return R.ok("success").put("data", messageBeans).put("count", total);
    }


    /**
     * Query all Messages
     * @param page
     * @param limit
     * @param map
     * @return
     */
    @RequestMapping(value = "queryByAll")
    public R queryByAll(int page, int limit, Map<String, Object> map){
        if(page == 0 && limit == 0){
            return R.error("null param");
        }
        map.put("page", page);
        map.put("limit", limit);
        Query query = new Query(map);
        List<MessageBean> messageBeans = messageService.queryByAll(query);
        int total = messageService.queryByTotal(query);
        return R.ok().put("data", messageBeans).put("count", total);
    }

    /**
     * Number Of Unread Messages
     * @param jsonStr
     * @param map
     * @return
     */
    @RequestMapping(value = "queryUnreadNumber")
    public R queryUnreadNumber(String jsonStr, Map<String, Object> map){
        if(StringUtils.isEmpty(jsonStr)){
            logger.error("error param" + jsonStr);
            return R.error("null param");
        }
        map = JSON.parseObject(jsonStr);
        int total = messageService.queryUnreadNumber(map);
        return R.ok().put("data", total);
    }
}
