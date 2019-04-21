package com.cms.controller;

import com.cms.pojo.Link;
import com.cms.service.LinkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/backstage/link")
public class LinkController {

    @Autowired
    private LinkService linkService;

    /**
     * 友情链接
     * <p>
     * 时间 2018年11月24日 下午3:13:11
     * 谢伟宁
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("pageTitle", "用户管理");
        mav.addObject("title", "用户管理");
        mav.setViewName("/admin/page/link/link_manage");
        return mav;
    }

    /**
     * 友情链接添加
     * <p>
     * 时间 2018年11月24日 下午3:33:47
     * 谢伟宁
     *
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/link/add");
        mav.setViewName("/admin/page/link/add_or_update");
        return mav;
    }

    /**
     * 修改
     * <p>
     * 时间 2018年11月24日 下午3:36:54
     * 谢伟宁
     *
     * @param id
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value = "id", required = false) String id
            , HttpServletResponse response
            , HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        Link link = linkService.findById(Integer.parseInt(id));
        mav.addObject("link", link);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/link/update?id=" + id);
        mav.setViewName("/admin/page/link/add_or_update");
        return mav;
    }


}
