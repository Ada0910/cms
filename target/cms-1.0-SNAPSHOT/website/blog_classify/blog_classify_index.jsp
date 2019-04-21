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
    <title>${blogClassify.name} - ${config.webName}</title>
    <meta name="keywords" content="${config.indexPageKeywords }"/>
    <meta name="description" content="${config.indexPageDescription}"/>


    <!--添加 公共css -->
    <link rel="stylesheet" href="/static/css/website/base.css?version=${config.version}">
    <!--添加 公共css -->

    <script type="text/javascript">
    </script>

    <style>

        /* 重写适合本页的css */
        .m-tab-content ul li {
            height: 60px;
            line-height: 48px;
            padding-left: 8px;
            position: relative;
            overflow: hidden;
            border-bottom: 1px solid #e2e0e0;
        }

        /* 重写适合本页的css */

    </style>
</head>
<body>

<div class="wrap">

    <!-- 加载导航 -->
    <jsp:include page="/website/component/nav.jsp"/>
    <!-- 加载导航   -->

    <div class="model" style="background-color: #ece9e9;">
        <div class="content" style="padding:10px 0px 10px 0px; ">

            <div style="padding: 10px; border: 1px solid #dadada; border-radius: 5px; min-height: 500px; background-color: white; width: 873px; float: left; margin-right: 10px;">

                <div style="overflow: hidden; border-bottom: 1px solid #e6e6e6; padding: 8px 0px 4px 0px;">
					<span class="layui-breadcrumb">
					  <a href="/index.html">首页</a>
					  <a href="${url}">${blogClassify.name}</a>
					</span>
                </div>

                <div style="overflow: hidden; padding: 20px 20px 20px 20px; ">
                    <div class="m-tab-content" style="min-height: 500px;">
                        <ul>
                            <c:forEach var="blog" items="${blogList}" varStatus="status">
                                <li><i></i><span><fmt:formatDate value="${blog.createDateTime}"
                                                                 pattern="yyyy-MM-dd HH:mm"/></span><img style="width: 50px;
                        height: 50px;" src="${blog.thumbnailImage}" /><a
                                        href="/blog/get?id=${blog.id}" title="${blog.title}"
                                        style=" font-size: 20px;">${blog.title}</a></li>
                            </c:forEach>
                        </ul>
                    </div>

                    <div id="fenye"></div>
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

        //自定义每页条数的选择项
        laypage.render({
            elem: 'fenye'
            , count: '${total}'
            , limit: '${rows}'
            , curr: '${page}'
            , jump: function (obj, first) {
                //console.log(obj);
                //首次不执行
                if (!first) {
                    console.log('${url}&page=' + obj.curr);
                    console.log(obj.curr);
                    console.log(obj.limit);

                    window.location.href = '${url}&page=' + obj.curr;
                }
            }
        });


    });
</script>
</html>