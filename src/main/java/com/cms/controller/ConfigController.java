package com.cms.controller;

import com.cms.pojo.Config;
import com.cms.service.ConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 网站配置
 *
 * @author 谢伟宁
 */
@Controller
@RequestMapping("/backstage/config/")
public class ConfigController {

    @Autowired
    private ConfigService configService;

    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.setViewName("/admin/page/config/config_manage");
        return mav;
    }

    /**
     * 网站配置修改
     * <p>
     * 时间 2018年11月22日 下午3:25:06
     * 谢伟宁
     *
     * @param id
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value = "id", required = false) String id, HttpServletResponse response,
                             HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        Config config = configService.findById(Integer.parseInt(id));
        mav.addObject("config", config);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url",  "/admin/config/update?id=" + id);
        mav.setViewName("/admin/page/config/add_or_update");
        return mav;
    }

}
