package com.cms.controller.admin;

import com.cms.pojo.BlogClassify;
import com.cms.pojo.PageBean;
import com.cms.service.BlogClassifyService;
import com.cms.util.ResponseUtil;
import com.cms.util.StringUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/admin/blog/classify")
public class AdminBlogClassifyController {

    @Autowired
    private BlogClassifyService blogClassifyService;

    /**
     * 获取列表
     *
     * 时间 2018年11月29日 下午3:41:39
     * 谢伟宁
     * @param page
     * @param rows
     * @param q
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
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

        List<BlogClassify> list = blogClassifyService.list(map);
        Integer total = blogClassifyService.getTotal(map);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();

        map.clear();
        map.put("data", list);
        map.put("count", total);
        map.put("code", 0);
        map.put("msg", "");
        ResponseUtil.write(response, gson.toJson(map));
        return null;
    }

    /**
     * 添加
     *
     * 时间 2018年11月29日 下午3:55:48
     * 谢伟宁
     * @param classify
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public String add(BlogClassify classify, HttpServletResponse response, HttpServletRequest request) throws Exception {
        classify.setCreateDateTime(new Date());
        classify.setUpdateDateTime(new Date());

        int resultTotal = blogClassifyService.add(classify);
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
    /**
     * 更新
     *
     * 时间 2018年11月29日 下午4:14:52
     * 谢伟宁
     * @param classify
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/update")
    public String update(BlogClassify classify, HttpServletResponse response, HttpServletRequest request) throws Exception {
        classify.setUpdateDateTime(new Date());
        int resultTotal = blogClassifyService.update(classify);
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
            blogClassifyService.delete(Integer.parseInt(idsStr[i]));
        }
        result.put("success", true);
        ResponseUtil.write(response, result.toString());
        return null;
    }

}
