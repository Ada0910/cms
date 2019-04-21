package com.cms.controller.admin;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.cms.pojo.MemoClassify;
import com.cms.pojo.PageBean;
import com.cms.service.MemoClassifyService;
import com.cms.util.ResponseUtil;
import com.cms.util.StringUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/admin/memo/classify")
public class AdminMemoClassifyController {

    @Autowired
    private MemoClassifyService memoClassifyService;


    @RequestMapping("/list")
    public String list(@RequestParam(value = "page", required = false) String page,
                       @RequestParam(value = "limit", required = false) String rows,
                       @RequestParam(value = "q", required = false) String q,
                       HttpServletResponse response,
                       HttpServletRequest request) throws Exception {
        PageBean pageBean = new PageBean(Integer.parseInt(page), Integer.parseInt(rows));
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        map.put("q", StringUtil.formatLike(q));

        List<MemoClassify> list = memoClassifyService.list(map);
        Integer total = memoClassifyService.getTotal(map);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();

        map.clear();
        map.put("data", list);
        map.put("count", total);
        map.put("code", 0);
        map.put("msg", "");
        ResponseUtil.write(response, gson.toJson(map));
        return null;
    }

    @RequestMapping("/update")
    public String update(MemoClassify classify, HttpServletResponse response, HttpServletRequest request) throws Exception {
        classify.setUpdateDateTime(new Date());
        int resultTotal = memoClassifyService.update(classify);
        JSONObject result = new JSONObject();

        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "添加成功");
        } else {
            result.put("success", false);
            result.put("msg", "添加失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/add")
    public String add(MemoClassify classify, HttpServletResponse response, HttpServletRequest request) throws Exception {
        classify.setCreateDateTime(new Date());
        classify.setUpdateDateTime(new Date());

        int resultTotal = memoClassifyService.add(classify);
        JSONObject result = new JSONObject();
        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "添加成功");
        } else {
            result.put("success", false);
            result.put("msg", "添加失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam(value = "ids", required = false) String ids, HttpServletResponse response)
            throws Exception {
        String[] idsStr = ids.split(",");
        JSONObject result = new JSONObject();

        for (int i = 0; i < idsStr.length; i++) {
            memoClassifyService.delete(Integer.parseInt(idsStr[i]));
        }
        result.put("success", true);
        ResponseUtil.write(response, result.toString());
        return null;
    }


}
