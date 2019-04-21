package com.cms.controller.admin;


import com.cms.pojo.Blog;
import com.cms.pojo.Config;
import com.cms.pojo.PageBean;
import com.cms.pojo.User;
import com.cms.service.BlogService;
import com.cms.util.DateUtil;
import com.cms.util.FileUtil;
import com.cms.util.ResponseUtil;
import com.cms.util.StringUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.ContextLoader;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin/blog")
public class AdminBlogController {

    @Autowired
    private BlogService blogService;

    @RequestMapping("/list")
    public String list(@RequestParam(value = "page", required = false) String page,
                       @RequestParam(value = "limit", required = false) String rows,
                       @RequestParam(value = "q", required = false) String q,
                       @RequestParam(value = "blogClassifyId", required = false) String blogClassifyId,
                       @RequestParam(value = "createUserId", required = false) String createUserId,
                       HttpServletResponse response,
                       HttpServletRequest request) throws Exception {
        PageBean pageBean = new PageBean(Integer.parseInt(page), Integer.parseInt(rows));
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        map.put("q", StringUtil.formatLike(q));
        map.put("createUserId", createUserId);
        map.put("blogClassifyId", blogClassifyId);

        List<Blog> list = blogService.list(map);
        Integer total = blogService.getTotal(map);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();


        map.clear();
        map.put("data", list);
        map.put("count", total);
        map.put("code", 0);
        map.put("msg", "");
        ResponseUtil.write(response, gson.toJson(map));
        return null;
    }

    @RequestMapping("/add")
    public String add(Blog blog  , HttpServletResponse response, HttpServletRequest request) throws Exception {
        blog.setCreateDateTime(new Date());
        blog.setUpdateDateTime(new Date());
        blog.setClickHit(0);
        blog.setReplyHit(0);

        User currentUser = (User) SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        blog.setCreateUserId(currentUser.getId());
        int resultTotal = blogService.add(blog);

        //从缓存中取出config
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        Config config = (Config)  servletContext.getAttribute("config");
        //从缓存中取出config
        blog.setUrl(config.getWebSite()+"/a/blog/get?id="+blog.getId());
        blogService.update(blog);


        JSONObject result = new JSONObject();
        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "添加成功");
            result.put("btn_disable", true);
        } else {
            result.put("success", false);
            result.put("msg", "添加失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/delete")
    public String delete(@RequestParam(value = "ids", required = false) String ids, HttpServletResponse response)
            throws Exception {
        String[] idsStr = ids.split(",");
        JSONObject result = new JSONObject();

        for (int i = 0; i < idsStr.length; i++) {
            blogService.delete(Integer.parseInt(idsStr[i]));
        }
        result.put("success", true);
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/findById")
    public String findById(@RequestParam(value="id")String id,HttpServletResponse response)throws Exception{
        Blog blog=blogService.findById(Integer.parseInt(id));
        Gson gson =new Gson();
        ResponseUtil.write(response, gson.toJson(blog));
        return null;
    }

    @RequestMapping("/addThumbnailImage")
    public String addThumbnailImage(
            @RequestParam(value="name",required=false)String name,
            @RequestParam("file") MultipartFile file,
            HttpServletResponse response, HttpServletRequest request) throws Exception {
        JSONObject result = new JSONObject();

        if(!file.isEmpty()){
            String webPath=request.getServletContext().getRealPath("");
            String filePath= "/static/upload_image/blog/"+DateUtil.formatDate(new Date(), "yyyy-MM-dd")+"/";
            FileUtil.makeDirs(webPath+filePath);

            String imageName=DateUtil.formatDate(new Date(), "yyyy-MM-dd-hh-mm-ss-SSS")+".jpg";

            file.transferTo(new File(webPath+filePath+imageName));
            result.put("success", true);
            result.put("path", filePath+imageName);
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/update")
    public String update(Blog blog, HttpServletResponse response, HttpServletRequest request) throws Exception {
        blog.setUpdateDateTime(new Date());

        //从缓存中取出config
        WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();
        ServletContext servletContext = webApplicationContext.getServletContext();
        Config config = (Config)  servletContext.getAttribute("config");
        //从缓存中取出config
        blog.setUrl(config.getWebSite()+"/a/blog/get?id="+blog.getId());

        int resultTotal = blogService.update(blog);
        JSONObject result = new JSONObject();


        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "修改成功");
            result.put("btn_disable", false);
        } else {
            result.put("success", false);
            result.put("msg", "修改失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }


}
