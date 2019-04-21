$(function () {

    var base_module_list = $(".base_module");
    console.log(base_module_list.size());

    for (var i = 0; i < base_module_list.size(); i++) {
        var blogClassifyId = $(base_module_list).eq(i).attr("blogClassifyId");

        var temp_str = getJsonByblogClassifyId(blogClassifyId);

        $(base_module_list).eq(i).find(".m-tab-content ul").append(temp_str)

        console.log(blogClassifyId);
    }
});

//根据blogClassifyId 拿 内容
function getJsonByblogClassifyId(blogClassifyId) {
    var rows = 10;
    var html_text = "";

    $.ajax({
        type: "POST",
        url: "/indexBaseModule?blogClassifyId=" + blogClassifyId + "&rows=" + rows,
        async: false,
        dataType: "json",
        success: function (result) {

            for (var i = 0; i < 5; i++) {
                html_text = html_text + '<li><i></i><span>' + result[i].createDateTime + '</span><img  style="width: 50px;\n' +
                    '    height: 50px;" src= '+result[i].thumbnailImage +' /><a href="/blog/get?id=' + result[i].id + '" title="' + result[i].title + '">' + result[i].title + '</a></li>';

            }

        }
    });

    return html_text;

}