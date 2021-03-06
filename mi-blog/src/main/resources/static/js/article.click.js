var pager = {page:1,start:0,limit:10};
/*将初始化页面封装成一个方法*/
function initPage(id) {
    $("#total-num").text(pager.totalCount);
    $("#total-page").text(pager.totalPageNum);
    $("#current-page").text(pager.page);
    $.jqPaginator('#pagination', {
        totalPages: pager.totalPageNum,
        totalCounts: pager.totalCount,
        visiblePages: 5,
        currentPage: pager.page,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            pager.page = num;
            var type = $("#pagination").data("type");
            loadList(type,id);
            // 当前第几页
            $("#current-page").text(num);
            $(".chosen-select").chosen({
                max_selected_options: 5,
                no_results_text: "没有找到",
                allow_single_deselect: true
            });
            $(".chosen-select").trigger("liszt:updated");
        }
    });
}

/*将加载文章,文章分类,标签分类重构成一个方法*/
function  loadList(type,id) {
    var url = "";
    if (type == "article"){
        url = '/'+type+'/load';
    }
    else{
        url = '/'+type+'/load/'+id;
    }
    $.ajax({
        type: 'GET',
        url: url,
        data: pager,
        success: function (data) {
            $("#main-article").html(data);
            //初始化文章分页信息
            //初始化文章
            /*分享初始化*/
            $(".socialShare").socialShare({
                content: "文章分享",
                url: "www.baidu.com/",
                title:$("#article-title").text(),
                summary: 'MIYAOW个人博客分享,欢迎指教',
                pic: ''
            });
            $('#loader-wrapper .load_title').remove();
        }
    });
}
