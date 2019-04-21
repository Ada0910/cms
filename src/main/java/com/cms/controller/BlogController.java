package com.cms.controller;

import com.cms.pojo.Blog;
import com.cms.pojo.BlogClassify;
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
@RequestMapping("/backstage/blog")
public class BlogController {

    @Autowired
    private BlogClassifyService blogClassifyService;
    @Autowired
    private BlogService blogService;

    /**
     * 展示页面
     *
     * 时间 2018年11月29日 下午4:45:58
     * 谢伟宁
     * @return
     * @throws Exception
     */
    @RequestMapping("/manage")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        Map<String, Object> map = new HashMap<String, Object>();
        List<BlogClassify> blogClassifyList = blogClassifyService.list(map );
        mav.addObject("blogClassifyList", blogClassifyList);
        mav.setViewName("/admin/page/blog/blog_manage");
        return mav;
    }

    @RequestMapping("/add")
    public ModelAndView add() throws Exception {
        ModelAndView mav = new ModelAndView();

        mav.addObject("title", "添加文章");


        Map<String, Object> map = new HashMap<String, Object>();
        List<BlogClassify> blogClassifyList = blogClassifyService.list(map );
        mav.addObject("blogClassifyList", blogClassifyList);


        mav.addObject("btn_text", "添加");
        mav.addObject("save_url", "/admin/blog/add");
        mav.setViewName("/admin/page/blog/add_or_update");
        return mav;
    }

    @RequestMapping("/edit")
    public ModelAndView edit(@RequestParam(value="id",required=false)String id
            ,HttpServletResponse response
            ,HttpServletRequest request) throws Exception {
        ModelAndView mav = new ModelAndView();

        Map<String, Object> map = new HashMap<String, Object>();
        List<BlogClassify> blogClassifyList = blogClassifyService.list(map );
        mav.addObject("blogClassifyList", blogClassifyList);
        Blog blog = blogService.findById(Integer.parseInt(id));
        mav.addObject("title", "修改文章-"+blog.getTitle());

        mav.addObject("isEdit", true);

        mav.addObject("blog", blog);
        mav.addObject("btn_text", "修改");
        mav.addObject("save_url", "/admin/blog/update?id="+id);
        mav.setViewName("/admin/page/blog/add_or_update");
        return mav;
    }

}
