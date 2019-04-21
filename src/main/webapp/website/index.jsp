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
    <title>${config.indexPageTitle}</title>
    <meta name="keywords" content="${config.indexPageKeywords }"/>
    <meta name="description" content="${config.indexPageDescription}"/>

    <!--添加 公共css -->
    <link rel="stylesheet" href="/static/css/website/base.css?version=${config.version}">
    <!--添加 公共css -->

    <!-- 首页 js加载-->
    <script src="${pageContext.request.contextPath}/static/js/website/website_index.js?version=${config.version}"></script>
    <!-- 首页 js加载-->


    <script type="text/javascript">
    </script>
</head>
<body>

<div class="wrap">

    <!-- 加载导航 -->
    <jsp:include page="/website/component/nav.jsp"/>
    <!-- 加载导航   -->

    <!-- 加载轮播 -->
    <jsp:include page="/website/component/carousel.jsp"/>
    <!-- 加载轮播 -->

    <!-- 基础模块 -->
    <jsp:include page="/website/component/base_module.jsp"/>
    <!-- 基础模块 -->

    <!-- 临时模块 -->
  <%--  <jsp:include page="/website/component/temp.jsp"/>--%>
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
    });
</script>

<script>
    layui.use(['carousel', 'form'], function(){
        var carousel = layui.carousel
            ,form = layui.form;

        //图片轮播
        carousel.render({
            elem: '#test10'
            ,width: '80%'
            ,height: '520px'
            ,interval: 5000
        });

    });
</script>
</html>