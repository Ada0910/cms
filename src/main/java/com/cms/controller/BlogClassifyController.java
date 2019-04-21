package com.cms.controller;

import com.cms.pojo.BlogClassify;
import com.cms.service.BlogClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/backstage/blog/classify")
public class BlogClassifyController {

    @Autowired
    private BlogClassifyService blogClassifyService;

    /**
     * 页面跳转
     *
     * 时间 2018年11月29日 下午3:52:18
     * 谢伟宁
     * @return
     * @throws Exception
     */
    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/admin/page/blog_classify/blog_classify_manage");
        return mav;
    }
    /**
     * 添加
     *
     * 时间 2018年11月29日 下午4:10:03
     * 谢伟宁
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/blog/classify/add");
        mav.setViewName("/admin/page/blog_classify/add_or_update");
        return mav;
    }

    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value="id",required=false)String id
            ,HttpServletResponse response
            ,HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        BlogClassify classify = blogClassifyService.findById(Integer.parseInt(id));
        mav.addObject("classify", classify);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/blog/classify/update?id="+id);
        mav.setViewName("/admin/page/blog_classify/add_or_update");
        return mav;
    }

}
