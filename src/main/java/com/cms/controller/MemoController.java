package com.cms.controller;

import com.cms.pojo.Memo;
import com.cms.pojo.MemoClassify;
import com.cms.service.MemoClassifyService;
import com.cms.service.MemoService;
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
@RequestMapping("/backstage/memo")
public class MemoController {
    @Autowired
    private MemoService memoService;

    @Autowired
    private MemoClassifyService memoClassifyService;


    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<MemoClassify> memoClassifyList = memoClassifyService.list(map );
        mav.addObject("memoClassifyList", memoClassifyList);

        mav.setViewName("/admin/page/memo/memo_manage");
        return mav;
    }

    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<MemoClassify> memoClassifyList = memoClassifyService.list(map );
        mav.addObject("memoClassifyList", memoClassifyList);

        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/memo/add");
        mav.setViewName("/admin/page/memo/add_or_update");

        return mav;
    }



    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value="id",required=false)String id
            ,HttpServletResponse response
            ,HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("isUse", 1);
        List<MemoClassify> memoClassifyList = memoClassifyService.list(map );
        mav.addObject("memoClassifyList", memoClassifyList);

        Memo memo = memoService.findById(Integer.parseInt(id));
        mav.addObject("memo", memo);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/memo/update?id="+id);
        mav.setViewName("/admin/page/memo/add_or_update");

        return mav;
    }

}
