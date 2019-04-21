package com.cms.controller;

import com.cms.pojo.Blog;
import com.cms.pojo.BlogClassify;
import com.cms.pojo.PageBean;
import com.cms.service.BlogClassifyService;
import com.cms.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RequestMapping("/blog/classify")
public class IndexBlogClassifyController {

    @Autowired
    private BlogClassifyService blogClassifyService;
    @Autowired
    private BlogService blogService;



    @RequestMapping("/get")
    public ModelAndView get(@RequestParam(value = "id", required = false) Integer id,
                            @RequestParam(value = "page", required = false) Integer page,
                            @RequestParam(value = "rows", required = false) Integer rows,
                            HttpServletResponse res, HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        if (page == null) page = 1;
        if (rows == null) rows = 100;

        mav.addObject("page", page);
        mav.addObject("rows", rows);

        BlogClassify blogClassify = blogClassifyService.findById(id);
        mav.addObject("blogClassify", blogClassify);

        PageBean pageBean = new PageBean(page, rows);
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        map.put("blogClassifyId", id);
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        List<Blog> blogList = blogService.list(map);
        Integer total = blogService.getTotal(map);
        mav.addObject("total", total);
        mav.addObject("blogList", blogList);

        mav.addObject("url", "/blog/classify/get?id=" + id);

        mav.setViewName("/website/blog_classify/blog_classify_index");
        return mav;
    }

}
