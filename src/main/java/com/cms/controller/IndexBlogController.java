package com.cms.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.cms.pojo.Blog;
import com.cms.service.BlogService;

@Controller
@RequestMapping("/blog")
public class IndexBlogController {

    @Autowired
    private BlogService blogService;


    @RequestMapping("/get")
    public ModelAndView get(@RequestParam(value = "id", required = false) Integer id, HttpServletResponse res,
                            HttpServletRequest req) throws Exception {
        ModelAndView mav = new ModelAndView();
        Blog blog = blogService.findById(id);
        mav.addObject("blog", blog);

        blog.setClickHit(blog.getClickHit() + 1);
        blogService.update(blog);

        switch (blog.getDisplayMode()) {
            case 0:
                mav.setViewName("/website/blog/blog_base");
                break;
            case 1:
                mav.setViewName("/website/blog/blog_full");
                break;
            case 2:
                mav.setViewName("/website/blog/wap_blog");
                break;
            case 3:
                mav.setViewName("/website/blog/blog_base_no_nav");
                break;
            case 4:
                mav.setViewName("/website/blog/blog_full_no_nav");
                break;
        }
        return mav;
    }
}
