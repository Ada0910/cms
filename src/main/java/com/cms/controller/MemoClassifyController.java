package com.cms.controller;

import com.cms.pojo.MemoClassify;
import com.cms.service.MemoClassifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/backstage/memo/classify")
public class MemoClassifyController {

    @Autowired
    private MemoClassifyService memoClassifyService;

    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/admin/page/memo_classify/memo_classify_manage");
        return mav;
    }

    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/memo/classify/add");
        mav.setViewName("/admin/page/memo_classify/add_or_update");
        return mav;
    }

    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value = "id", required = false) String id
            , HttpServletResponse response
            , HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        MemoClassify classify = memoClassifyService.findById(Integer.parseInt(id));
        mav.addObject("classify", classify);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/memo/classify/update?id=" + id);
        mav.setViewName("/admin/page/memo_classify/add_or_update");
        return mav;
    }

}
