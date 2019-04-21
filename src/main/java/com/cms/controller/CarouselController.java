package com.cms.controller;

import com.cms.pojo.Carousel;
import com.cms.service.CarouselService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/backstage/carousel")
public class CarouselController {

    @Autowired
    private CarouselService carouselService;

    /**
     * 轮播页面跳转
     *
     * 时间 2018年11月22日 下午3:40:15
     * 谢伟宁
     * @return
     * @throws Exception
     */
    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception{
        ModelAndView  mav = new ModelAndView();
        mav.setViewName("/admin/page/carousel/carousel_manage");
        return mav;

    }

    /**
     * 轮播添加页面
     *
     * 时间 2018年11月22日 下午6:17:09
     * 谢伟宁
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public ModelAndView add()throws Exception{
        ModelAndView  mav = new ModelAndView();
        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/carousel/add");
        mav.setViewName("/admin/page/carousel/add_or_update");
        return mav;
    }

    /*
     * 轮播修改页面
     */
    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value="id",required=false)String id
            ,HttpServletResponse response
            ,HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();
        Carousel carousel = carouselService.findById(Integer.parseInt(id));
        mav.addObject("carousel", carousel);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/carousel/update?id="+id);
        mav.setViewName("/admin/page/carousel/add_or_update");
        return mav;
    }

}
