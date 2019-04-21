package com.cms.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.cms.pojo.Blog;
import com.cms.pojo.BlogClassify;
import com.cms.pojo.Carousel;
import com.cms.service.BlogClassifyService;
import com.cms.service.BlogService;
import com.cms.service.CarouselService;
import com.cms.service.PublicService;
import com.cms.util.MyUtil;
import com.cms.util.ResponseUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * 用户登录
 *
 * @author 谢伟宁
 */
@Controller
@RequestMapping("/")
public class IndexController {

    @Autowired
    private PublicService publicService;

    @Autowired
    private CarouselService carouselService;

    @Autowired
    private BlogClassifyService blogClassifyService;

    @Autowired
    private BlogService blogService;

    @RequestMapping("/index")
    public ModelAndView index(HttpServletResponse res, HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        List<Carousel> carouselList = carouselService.index_list();
        mav.addObject("carouselList", carouselList);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        map.put("pos", 1);
        List<BlogClassify> baseModuleList = blogClassifyService.list(map);
        mav.addObject("baseModuleList", baseModuleList);
        mav.setViewName("/website/index");
        return mav;
    }

    /**
     * 电脑登陆
     */
    @RequestMapping("/login")
    public ModelAndView login(HttpServletResponse res, HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        String UserAgent = req.getHeader("User-Agent");
        // 判断AppleWebKit 和 Firefox

        if (MyUtil.checkUserAgent(UserAgent)) {
            mav.setViewName("/admin/login/login");
        } else {
            mav.setViewName("/admin/common/default_menu");
        }
        return mav;
    }

    /**
     * 后台主页跳转
     */
    @RequestMapping("/admin/main")
    public ModelAndView admin_main(HttpServletResponse res, HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();

        publicService.addLeftMenu(mav);

        System.out.println(MyUtil.getRemoteAddress(req));

        String UserAgent = req.getHeader("User-Agent");
        if (MyUtil.checkUserAgent(UserAgent)) {
            mav.setViewName("/admin/main");
        } else {
            mav.setViewName("/admin/common/default_menu");
        }
        return mav;
    }

    /**
     * /index_base_module?blogClassifyId1&rows=10
     * 拿到首页  基础模块的数据
     */
    @RequestMapping("/indexBaseModule")
    public String indexBaseModule(@RequestParam(value = "blogClassifyId", required = false) Integer blogClassifyId
            , @RequestParam(value = "rows", required = false) Integer rows, HttpServletResponse response, HttpServletRequest request
            , RedirectAttributes attr) throws Exception {

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        map.put("blogClassifyId", blogClassifyId);
        map.put("start", 0);
        map.put("size", rows);
        List<Blog> blogList = blogService.list2(map);

        Gson gson = new GsonBuilder().setDateFormat("MM-dd").create();

        ResponseUtil.write(response, gson.toJson(blogList));
        return null;
    }

}
