<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
    <!-- JSTL -->

    ${config.headStr} ${config.layuiStr}

    <!-- 加入移动布局 -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no" />
    <!-- 加入移动布局 -->

    <!--添加  vue.js 支持加载-->
    <script src="${pageContext.request.contextPath}/static/vue/vue.min.js"></script>
    <!--添加  vue.js 支持加载-->

    <!--异步上传 js-->
    <script
            src="${pageContext.request.contextPath}/static/AjaxFileUpload/ajaxfileupload.js"></script>
    <!--异步上传 js-->

    <title>${title}</title>

    <script>

        $(function() {
            if ("${carousel.type}" != "") {
                $("#type").val("${carousel.type}");
            }
        });

        var save_url = '${save_url}';
        function save() {
            var index = layer.msg('提交中，请稍候', {
                icon : 16,
                time : false,
                shade : 0.8
            });

            var isUse = $('input[name="isUse"]:checked').val();
            if (isUse) {
            } else {
                isUse = 0;
            }
            var type = $("#type").val();

            $.post(save_url, {
                title : app.title,
                url : app.url,
                isUse : isUse,
                type : type,
                orderNo : app.orderNo,
                imageUrl : app.imageUrl
            }, function(result) {
                if (result.success) {
                    //调用 父窗口的  关闭所有窗口 并且刷新 页面
                    window.parent.closeDlg(result.msg);
                } else {
                    layer.closeAll(); //关闭loading
                    layer.msg(result.msg);
                }
            }, 'json');
        }

        function uploadFile(file) {
            $.ajaxFileUpload({
                url : '/admin/carousel/addImageUrl', //用于文件上传的服务器端请求地址
                secureuri : false, //一般设置为false
                fileElementId : 'file', //文件上传空间的id属性  <input type="file" id="file" name="file" />
                type : 'post',
                dataType : 'text', //返回值类型 一般设置为json
                success : function(result) //服务器成功响应处理函数
                {
                    var result = eval('(' + result + ')');
                    if (result.success) {
                        app.imageUrl = result.path;
                        $("#imageUrlDiv").empty();
                        $("#imageUrlDiv").append('<img style="width: 200px;" src="' + result.path + '" />');
                    }
                },
                error : function(result) //服务器响应失败处理函数
                {}
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
<div style="padding: 10px;">
    <div class="layui-form layui-form-pane">

        <div class="layui-form-item">
            <label class="layui-form-label">标题</label>
            <div class="layui-input-block">
                <input type="text" id="name" autocomplete="off"
                       value="${carousel.title }" v-model="title" placeholder="请输入 标题"
                       class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">链接地址</label>
            <div class="layui-input-block">
                <input type="text" id="trueName" autocomplete="off"
                       value="${carousel.url }" v-model="url" placeholder="链接地址"
                       class="layui-input">
            </div>
        </div>

        <style>/* 下拉显示到富文本上面 */
        .layui-form-select {
            z-index: 9999;
        }
        </style>

        <div class="layui-form-item">
            <label class="layui-form-label">跳转类型</label>
            <div class="layui-input-block">
                <select name="type" id="type" lay-filter="type">
                    <option value="1">站内跳转</option>
                    <option value="2">新窗口跳转</option>
                </select>
            </div>
        </div>


        <div class="layui-form-item" pane="">
            <label class="layui-form-label">是否显示</label>
            <div class="layui-input-block">
                <c:choose>
                    <c:when test="${carousel.isUse==1}">
                        <input type="checkbox" id="isUse" name="isUse" checked=""
                               value="1" lay-filter="isUse" lay-skin="switch" lay-text="是|否" />
                    </c:when>
                    <c:when test="${carousel.isUse==0 || carousel.isUse==null }">
                        <input type="checkbox" id="isUse" name="isUse" value="1"
                               lay-filter="isUse" lay-skin="switch" lay-text="是|否" />
                    </c:when>
                </c:choose>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">显示位置</label>
            <div class="layui-input-block">
                <input type="text" id="trueName" autocomplete="off"
                       value="${carousel.orderNo }" v-model="orderNo"
                       placeholder="请输入显示位置（1表示图一）" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item"
             style="border-bottom: 1px solid #9E9E9E;">
            <label class="layui-form-label">展示图片</label>
            <div class="layui-input-block">
                <!-- <input type="file" id="trueName" autocomplete="off" class="layui-input"> -->
                <input type="file" name="file" id="file"
                       onchange="uploadFile(this)" class="layui-input" />
                <div id="imageUrlDiv" style="min-height: 10px;">
                    <img style="width: 200px;" alt="" src="${carousel.imageUrl }" />
                </div>
            </div>
        </div>

        <div class="layui-form-item">
            <div class="layui-input-block" style="margin-left: 0px;">
                <button id="save" onclick="save()" class="layui-btn" lay-submit=""
                        lay-filter="demo1">${btn_text}</button>
            </div>
        </div>

    </div>

</div>

</body>

<script>
    layui.use([ 'laydate', 'laypage', 'layer', 'table', 'carousel',
        'upload', 'element' ], function() {
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
        el : '#app',
        data : {}
    });
</script>
</html>