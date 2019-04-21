package com.cms.controller;

import com.cms.pojo.DownClassify;
import com.cms.service.DownloadClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/backstage/down/classify")
public class DownloadClassifyController {

    @Autowired
    private DownloadClassifyService downloadClassifyService;

    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("pageTitle", "用户管理");
        mav.addObject("title", "用户管理");
        mav.setViewName("/admin/page/down_classify/down_classify_manage");
        return mav;
    }

    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value = "id", required = false) String id
            , HttpServletResponse response
            , HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        DownClassify classify = downloadClassifyService.findById(Integer.parseInt(id));
        mav.addObject("classify", classify);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/down/classify/update?id=" + id);
        mav.setViewName("/admin/page/down_classify/add_or_update");
        return mav;
    }

    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/down/classify/add");
        mav.setViewName("/admin/page/down_classify/add_or_update");
        return mav;
    }


}
