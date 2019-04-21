package com.cms.controller;

import java.awt.image.BufferedImage;
import java.io.File;
import java.util.Date;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.cms.util.DateUtil;
import com.cms.util.FileUtil;
import com.cms.util.QRCodeUtil;
import com.cms.util.ResponseUtil;

import net.sf.json.JSONObject;

@Controller
public class QRCodeController {


    /**
     * 二维码管理页面的跳转
     *
     * @param id
     * @return
     * @throws Exception
     */
    @RequestMapping("backstage/manage/qrcode")
    public ModelAndView manage() throws Exception {
        ModelAndView mav = new ModelAndView();
        mav.addObject("title", "二维码生成");
        mav.setViewName("/admin/page/qrcode/qrcode_manage");
        return mav;
    }

    /**
     * /qrcode/create
     *
     * @param content 将内容转成二维码返回
     */
    @RequestMapping("/backstage/manage/qrcode/create")
    public String getQRCode(@RequestParam(value = "content", required = false) String content,
                            HttpServletRequest requset, HttpServletResponse response) throws Exception {

        // 生成二维码QRCode图片
        BufferedImage bufImg = QRCodeUtil.qRCodeCommon(content, "jpg", QRCodeUtil.getSize(content));
        // 保存到电脑
        String fileName = DateUtil.formatDate(new Date(), "yyyyMMddHHmmssSSS");
        String path = requset.getSession().getServletContext().getRealPath("");
        String file_path = "/static/upload_image/qrcode/";

        path = path + file_path;
        FileUtil.makeDirs(path);
        try {
            // 把img存到服务器上面。 返回地址给对面
            ImageIO.write(bufImg, "jpg", new File(path + fileName + ".jpg"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        JSONObject result = new JSONObject();
        result.put("success", true);
        result.put("path", file_path + fileName + ".jpg");
        result.put("msg", "请将二维码图片保存到手机上面,或者电脑 ");
        ResponseUtil.write(response, result.toString());
        return null;
    }


}
