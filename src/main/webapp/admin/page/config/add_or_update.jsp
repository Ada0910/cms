<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <!-- JSTL -->
    ${config.headStr} ${config.layuiStr}

    <!-- 加入移动布局 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
    <!-- 加入移动布局 -->


    <!--添加  vue.js 支持加载-->
    <script src="${pageContext.request.contextPath}/static/vue/vue.min.js"></script>
    <!--添加  vue.js 支持加载-->

    <!--异步上传 js-->
    <script
            src="${pageContext.request.contextPath}/static/AjaxFileUpload/ajaxfileupload.js"></script>
    <!--异步上传 js-->

    <style>
        .layui-form-pane .layui-form-label {
            width: 130px;
        }

        .layui-form-pane .layui-input-block {
            margin-left: 130px;
        }
    </style>

    <script>
        var save_url = '${save_url}';

        function save() {
            //loading
            var index = layer.load(1, {
                shade: [0.1, '#fff']
                //0.1透明度的白色背景
            });

            $.post(save_url, {
                webName: app.webName,
                stationName: app.stationName,
                webSite: app.webSite,
                headStr: app.headStr,
                layuiStr: app.layuiStr,
                countStr: app.countStr,
                backstageLogo: app.backstageLogo,
                publicNumber: app.publicNumber,
                personalCode: app.personalCode,
                logo: app.logo,
                indexPageTitle: app.indexPageTitle,
                indexPageKeywords: app.indexPageKeywords,
                indexPageDescription: app.indexPageDescription,
                record: app.record,
                version: app.version,
                foodInfo: app.foodInfo,
                navStr: app.navStr
            }, function (result) {
                if (result.success) {
                    //调用 父窗口的  关闭所有窗口 并且刷新 页面
                    window.parent.closeDlg(result.msg);
                } else {
                    layer.msg(result.msg);
                }
            }, 'json');
        }

        function uploadFile(file) {
            $.ajaxFileUpload({
                url:  '/admin/config/addBackstageLogo', //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type: 'post',
                dataType: 'text', //返回值类型 一般设置为json
                success: function (result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.backstageLogo = result.path;
                        $("#backstageLogo_div").empty();
                        $("#backstageLogo_div").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error: function (result) //服务器响应失败处理函数
                {
                }
            });
            return false;
        }

        function uploadFile2(file) {
            $.ajaxFileUpload({
                url:  '/admin/config/publicNumber', //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'file2', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type: 'post',
                dataType: 'text', //返回值类型 一般设置为json
                success: function (result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.gzh = result.path;
                        $("#publicNumber_div").empty();
                        $("#publicNumber_div").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error: function (result) //服务器响应失败处理函数
                {
                }
            });
            return false;
        }

        function uploadFile3(file) {
            $.ajaxFileUpload({
                url:  '/admin/config/addPersonalCode', //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'file3', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type: 'post',
                dataType: 'text', //返回值类型 一般设置为json
                success: function (result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.geren_erweima = result.path;
                        $("#personalCode_div").empty();
                        $("#personalCode_div").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error: function (result) //服务器响应失败处理函数
                {
                }
            });
            return false;
        }


        function uploadFile4(file) {
            $.ajaxFileUpload({
                url:   '/admin/config/addLogo', //用于文件上传的服务器端请求地址
                secureuri: false, //一般设置为false
                fileElementId: 'file4', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type: 'post',
                dataType: 'text', //返回值类型 一般设置为json
                success: function (result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.logo = result.path;
                        $("#logo_div").empty();
                        $("#logo_div").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error: function (result) //服务器响应失败处理函数
                {
                }
            });
            return false;
        }
    </script>
    <style>
        html, body {

        }

        .layui-form-item {
            margin-bottom: 3px;
        }
    </style>
</head>
<body id="app">

<div style="padding: 10px; overflow: hidden; margin-bottom: 200px;">
    <div class="layui-form layui-form-pane">
        <div class="layui-form-item">
            <label class="layui-form-label">网站名称</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="webName"
                       value="${config.webName }" placeholder="请输入 网站名称"
                       class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">公司名称</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="stationName"
                       value="${config.stationName }" placeholder="请输入  公司名称"
                       class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">网址</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="webSite"
                       value="${config.webSite }" placeholder="请输入  网址  "
                       class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">head的头文件 </label>
            <div class="layui-input-block">
					<textarea placeholder="head 头文件 " v-model="headStr"
                              class="layui-textarea">${config.headStr}</textarea>
            </div>
        </div>

        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">layuiStr </label>
            <div class="layui-input-block">
					<textarea placeholder="layuiStr" v-model="layuiStr"
                              class="layui-textarea">${config.layuiStr}</textarea>
            </div>
        </div>

        <%--<div class="layui-form-item layui-form-text">
            <label class="layui-form-label">统计代码</label>
            <div class="layui-input-block">
					<textarea placeholder="请输入  统计代码" v-model="countStr"
                              class="layui-textarea">${config.countStr}</textarea>
            </div>
        </div>--%>
    </div>

    <div class="layui-form layui-form-pane">
        <div class="layui-form-item"
             style="border-bottom: 1px solid #9E9E9E;">
            <label class="layui-form-label" style="width: 358px;">设置后台页面
                logo图片200*60 </label>
            <div class="layui-input-block" style="margin-left: 360px;">
                <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                <input type="file" name="file" id="file" class="layui-input"
                       onchange="uploadFile(this)"/>
                <div id="backstageLogo_div" style="min-height: 10px;">
                    <img style="width: 200px;" alt="" src="${config.backstageLogo }"/>
                </div>
            </div>
        </div>

        <div class="layui-form-item"
             style="border-bottom: 1px solid #9E9E9E;">
            <label class="layui-form-label" style="width: 358px;">设置公众号二维码</label>
            <div class="layui-input-block" style="margin-left: 360px;">
                <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                <input type="file" name="file2" id="file2" class="layui-input"
                       onchange="uploadFile2(this)"/>
                <div id="publicNumber_div" style="min-height: 10px;">
                    <img style="width: 200px;" alt="" src="${config.publicNumber }"/>
                </div>
            </div>
        </div>

        <div class="layui-form-item"
             style="border-bottom: 1px solid #9E9E9E;">
            <label class="layui-form-label" style="width: 358px;">个人 二维码</label>
            <div class="layui-input-block" style="margin-left: 360px;">
                <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                <input type="file" name="file3" id="file3" class="layui-input"
                       onchange="uploadFile3(this)"/>
                <div id="personalCode_div" style="min-height: 10px;">
                    <img style="width: 200px;" alt="" src="${config.personalCode }"/>
                </div>
            </div>
        </div>


        <div class="layui-form-item"
             style="border-bottom: 1px solid #9E9E9E;">
            <label class="layui-form-label" style="width: 358px;">logo图片
                尺寸：宽无所谓，高必须是60px</label>
            <div class="layui-input-block" style="margin-left: 360px;">
                <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                <input type="file" name="file4" id="file4" class="layui-input"
                       onchange="uploadFile4(this)"/>
                <div id="logo_div" style="min-height: 10px;">
                    <img style="width: 200px;" alt="" src="${config.logo }"/>
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">首页 标题</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="indexPageTitle"
                       value="${config.indexPageTitle }" placeholder="请输入 首页  标题"
                       class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">首页 关键词</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="indexPageKeywords"
                       value="${config.indexPageKeywords }"
                       placeholder="请输入 首页 关键词   keywords" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">首页 描述 摘要</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off"
                       v-model="indexPageDescription"
                       value="${config.indexPageDescription }"
                       placeholder="请输入 首页  描述 摘要  _description" class="layui-input">
            </div>
        </div>

       <%-- <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">备案信息</label>
            <div class="layui-input-block">
					<textarea placeholder="record" v-model="beian_"
                              class="layui-textarea">${config.record}</textarea>
            </div>
        </div>--%>

        <div class="layui-form-item">
            <label class="layui-form-label">版本</label>
            <div class="layui-input-block">
                <input type="text" autocomplete="off" v-model="version"
                       value="${config.version }" placeholder="版本" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">网页底部内容</label>
            <div class="layui-input-block">
					<textarea style="height: 500px;" placeholder="请输入  网页底部内容"
                              v-model="foodInfo" class="layui-textarea">${config.foodInfo}</textarea>
            </div>
        </div>


        <div class="layui-form-item layui-form-text">
            <label class="layui-form-label">导航内容</label>
            <div class="layui-input-block">
					<textarea style="height: 500px;" placeholder="请输入  导航内容"
                              v-model="navStr" class="layui-textarea">${config.navStr}</textarea>
            </div>
        </div>


    </div>

    <div class="site-demo-button" style="margin-top: 20px;">
        <button id="save" onclick="save()"
                class="layui-btn site-demo-layedit" data-type="content">${btn_text }</button>
    </div>

</div>


<script>
    layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel',
        'upload', 'element'], function () {
        var laydate = layui.laydate, //日期
            laypage = layui.laypage //分页
        layer = layui.layer //弹层
            , table = layui.table //表格
            , carousel = layui.carousel //轮播
            , upload = layui.upload //上传
            , element = layui.element; //元素操作
    });
</script>

<script>
    var app = new Vue({
        el: '#app',
        data: {}
    });
</script>

</body>
</html>