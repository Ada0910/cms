package com.cms.controller.admin;

import com.cms.pojo.Carousel;
import com.cms.pojo.PageBean;
import com.cms.pojo.User;
import com.cms.service.CarouselService;
import com.cms.util.DateUtil;
import com.cms.util.ResponseUtil;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import net.sf.json.JSONObject;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin/carousel")
public class AdminCarouselController {

    @Autowired
    private CarouselService carouselService;

    /**
     * 轮播图片加载列表
     *
     * 时间 2018年11月22日 下午4:28:09 谢伟宁
     *
     * @param page
     * @param rows
     * @param isUse
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/list")
    public String list(@RequestParam(value = "page", required = false) String page,
                       @RequestParam(value = "limit", required = false) String rows,
                       @RequestParam(value = "isUse", required = false) String isUse, HttpServletResponse response,
                       HttpServletRequest request) throws Exception {
        PageBean pageBean = new PageBean(Integer.parseInt(page), Integer.parseInt(rows));
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("start", pageBean.getStart());
        map.put("size", pageBean.getPageSize());
        map.put("isUse", isUse);

        List<Carousel> list = carouselService.list(map);
        Integer total = carouselService.getTotal(map);
        Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm").create();

        map.put("data", list);
        map.put("count", total);
        map.put("code", 0);
        map.put("msg", "");
        ResponseUtil.write(response, gson.toJson(map));

        return null;
    }

    /**
     * 添加轮播图片
     *
     * 时间 2018年11月22日 下午4:54:21 谢伟宁
     *
     * @param carousel
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/add")
    public String add(Carousel carousel, HttpServletResponse response, HttpServletRequest request) throws Exception {
        carousel.setCreateDateTime(new Date());
        carousel.setUpdateDateTime(new Date());

        /**
         * 获得当前用户
         */
        User currentUser = (User) SecurityUtils.getSubject().getSession().getAttribute("currentUser");
        carousel.setCreateUserId(currentUser.getId());
        int resultTotal = carouselService.add(carousel);
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

    @RequestMapping("/addImageUrl")
    public String addImageUrl(@RequestParam(value = "name", required = false) String name,
                              @RequestParam("file") MultipartFile file, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        JSONObject result = new JSONObject();

        if (!file.isEmpty()) {
            String webPath = request.getServletContext().getRealPath("");// tomcat的实际路径
            String filePath = "/static/upload_image/carousel/";
            String imageName = DateUtil.formatDate(new Date(), "yyyy-MM-dd-hh-mm-ss-SSS") + ".jpg";

            file.transferTo(new File(webPath + filePath + imageName));
            result.put("success", true);
            result.put("path", filePath + imageName);
        }
        ResponseUtil.write(response, result.toString());

        return null;
    }

    /**
     * 更新轮播图
     *
     * 时间 2018年11月22日 下午6:06:30
     * 谢伟宁
     * @param carousel
     * @param response
     * @param request
     * @return
     * @throws Exception
     */
    @RequestMapping("/update")
    public String update(Carousel carousel,HttpServletResponse response, HttpServletRequest request)throws Exception{
        carousel.setUpdateDateTime(new Date());
        int resultTotal = carouselService.update(carousel);
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

    /**
     * 删除轮播图
     *
     * 时间 2018年11月22日 下午6:09:51
     * 谢伟宁
     * @param ids
     * @param response
     * @return
     * @throws Exception
     */
    @RequestMapping("/delete")
    public String delete(@RequestParam(value = "ids", required = false) String ids, HttpServletResponse response) throws Exception{
        String[] idsStr = ids.split(",");
        JSONObject result = new JSONObject();
        for (int i = 0; i < idsStr.length; i++) {
            carouselService.delete(Integer.parseInt(idsStr[i]));
        }
        result.put("success", true);
        ResponseUtil.write(response, result.toString());
        return null;
    }

}
