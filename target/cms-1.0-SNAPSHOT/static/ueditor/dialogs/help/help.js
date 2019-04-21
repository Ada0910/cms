/**
 * Created with JetBrains PhpStorm.
 * User: xuheng
 * Date: 12-9-26
 * Time: ����1:06
 * To change this template use File | Settings | File Templates.
 */
/**
 * tab��������¼�
 * @param tabHeads
 * @param tabBodys
 * @param obj
 */
function clickHandler(tabHeads, tabBodys, obj) {
    //head��ʽ����
    for (var k = 0, len = tabHeads.length; k < len; k++) {
        tabHeads[k].className = "";
    }
    obj.className = "focus";
    //body����
    var tabSrc = obj.getAttribute("tabSrc");
    for (var j = 0, length = tabBodys.length; j < length; j++) {
        var body = tabBodys[j],
            id = body.getAttribute("id");
        body.onclick = function () {
            this.style.zoom = 1;
        };
        if (id != tabSrc) {
            body.style.zIndex = 1;
        } else {
            body.style.zIndex = 200;
        }
    }

}

/**
 * TAB�л�
 * @param tabParentId  tab�ĸ��ڵ�ID���߶�����
 */
function switchTab(tabParentId) {
    var tabElements = $G(tabParentId).children,
        tabHeads = tabElements[0].children,
        tabBodys = tabElements[1].children;

    for (var i = 0, length = tabHeads.length; i < length; i++) {
        var head = tabHeads[i];
        if (head.className === "focus") clickHandler(tabHeads, tabBodys, head);
        head.onclick = function () {
            clickHandler(tabHeads, tabBodys, this);
        }
    }
}

switchTab("helptab");

document.getElementById('version').innerHTML = parent.UE.version;