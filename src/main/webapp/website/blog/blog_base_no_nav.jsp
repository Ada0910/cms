<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <!-- JSTL -->
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
    <%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
    <!-- JSTL -->

    ${config.headStr}

    ${config.layuiStr}

    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>${blog.title} - ${config.webName}</title>
    <meta name="keywords" content="${blog.keywords }"/>
    <meta name="description" content="${blog.description}"/>


    <!--添加 公共css -->
    <link rel="stylesheet" href="/static/css/website/base.css?version=${config.version}">
    <!--添加 公共css -->


    <!--显示代码 模块 -->
    <script type="text/javascript" src="/static/ueditor/third-party/SyntaxHighlighter/shCore.js"></script>
    <link rel="stylesheet" href="/static/ueditor/third-party/SyntaxHighlighter/shCoreDefault.css">
    <script type="text/javascript">
        SyntaxHighlighter.all();
    </script>
    <!--显示代码 模块 -->


</head>
<body>

<div class="wrap">

    <!-- 加载导航 -->
    <jsp:include page="/website/component/nav.jsp"/>
    <!-- 加载导航   -->

    <div class="model" style="background-color: #ece9e9;">
        <div class="content" style="padding:10px 0px 10px 0px; ">

            <div style="padding: 10px; border: 1px solid #dadada; border-radius: 5px; min-height: 500px; background-color: white; width: 873px; float: left; margin-right: 10px;">


                <div style="overflow: hidden; border-bottom: 1px solid #e6e6e6; padding: 0px 0px 10px 0px;">
                    <h1 class="blog_title">
                        ${blog.title }
                    </h1>
                    <div style="text-align: center; font-style: normal; color: #999;">
                        [<span style="margin-right: 15px;"><fmt:formatDate value="${blog.createDateTime}"
                                                                           pattern="yyyy-MM-dd HH:mm"/></span>
                        <span style="margin-right: 15px;">类别：${blog.blogClassify.name}</span>
                        <span style="margin-right: 0px;">阅读(${blog.clickHit })</span>
                        ]
                    </div>
                </div>


                <div class="blog_content">

                    ${blog.content }

                </div>
            </div>





            <!--content 内部   清除浮动 -->
            <div style=" clear:both;"></div>


        </div>
    </div>


    <!-- 临时模块 -->
    <jsp:include page="/website/component/temp.jsp"/>
    <!-- 临时模块 -->

    <!-- 加载底部 模块 -->
    <jsp:include page="/website/component/foot.jsp"/>
    <!-- 加载底部 模块 -->

</div>


</body>
<script>
    layui.use(['laydate', 'laypage', 'layer', 'table', 'carousel',
        'upload', 'element'], function () {
        var laydate = layui.laydate //日期
            , laypage = layui.laypage //分页
        layer = layui.layer //弹层
            , table = layui.table //表格
            , carousel = layui.carousel //轮播
            , upload = layui.upload //上传
            , element = layui.element; //元素操作


        //调用示例
        layer.photos({
            photos: '.blog_content'
            , anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
        });


    });
</script>
</html>