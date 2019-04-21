package com.cms.controller.admin;

import com.cms.pojo.Config;
import com.cms.service.ConfigService;
import com.cms.util.ResponseUtil;
import com.google.gson.Gson;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;

/**
 * 网站配置修改controller
 *
 * @author 谢伟宁
 */
@Controller
@RequestMapping("/admin/config")
public class AdminConfigControlller {

    @Autowired
    private ConfigService configService;

    @RequestMapping("/update")
    public String update(Config config, HttpServletResponse response, HttpServletRequest request) throws Exception {

        int resultTotal = configService.update(config);
        JSONObject result = new JSONObject();

        if (resultTotal > 0) {
            result.put("success", true);
            result.put("msg", "修改成功");
        } else {
            result.put("success", false);
            result.put("msg", "修改失败");
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/findById")
    public String findById(@RequestParam(value = "id", required = false) String id, HttpServletResponse response,
                           HttpServletRequest request) throws Exception {
        Gson gson = new Gson();
        Config config = configService.findById(Integer.parseInt(id));
        ResponseUtil.write(response, gson.toJson(config));
        return null;
    }

    @RequestMapping("/addBackstageLogo")
    public String addBackstageLogo(@RequestParam(value = "name", required = false) String name,
                                   @RequestParam("file") MultipartFile file, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        JSONObject result = new JSONObject();

        if (!file.isEmpty()) {
            String webPath = request.getServletContext().getRealPath("");
            String filePath = "/static/upload_image/config/";
            String imageName = "backstageLogo.jpg";
            file.transferTo(new File(webPath + filePath + imageName));
            result.put("success", true);
            result.put("path",  filePath + imageName);
        }
        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/publicNumber")
    public String addPublicNumber(@RequestParam(value = "name", required = false) String name,
                                  @RequestParam("file2") MultipartFile file, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        JSONObject result = new JSONObject();

        if (!file.isEmpty()) {
            String webPath = request.getServletContext().getRealPath("");
            String filePath = "/static/upload_image/config/";
            String imageName = "publicNumber.jpg";

            file.transferTo(new File(webPath + filePath + imageName));
            result.put("success", true);
            result.put("path",  filePath + imageName);
        }

        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/addPersonalCode")
    public String addPersonalCode(@RequestParam(value = "name", required = false) String name,
                                  @RequestParam("file3") MultipartFile file, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        JSONObject result = new JSONObject();

        if (!file.isEmpty()) {
            String webPath = request.getServletContext().getRealPath("");
            String filePath = "/static/upload_image/config/";
            String imageName = "personalCode.jpg";
            file.transferTo(new File(webPath + filePath + imageName));
            result.put("success", true);
            result.put("path", filePath + imageName);
        }

        ResponseUtil.write(response, result.toString());
        return null;
    }

    @RequestMapping("/addLogo")
    public String add_logo(@RequestParam(value = "name", required = false) String name,
                           @RequestParam("file4") MultipartFile file, HttpServletResponse response, HttpServletRequest request)
            throws Exception {
        JSONObject result = new JSONObject();

        if (!file.isEmpty()) {
            String webPath = request.getServletContext().getRealPath("");
            String filePath = "/static/upload_image/config/";
            String imageName = "logo.jpg";
            file.transferTo(new File(webPath + filePath + imageName));
            result.put("success", true);
            result.put("path",  filePath + imageName);
        }

        ResponseUtil.write(response, result.toString());
        return null;
    }

}
