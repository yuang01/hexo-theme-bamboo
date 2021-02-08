// 设置 tabs 标签
function setTabs() {
    $('.tabs .nav-tabs').on('click', 'a', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const $tab = $(e.target.parentElement.parentElement.parentElement);
        $tab.find('.nav-tabs .active').removeClass('active');
        $tab.find(e.target.parentElement).addClass('active');
        $tab.find('.tab-content .active').removeClass('active');
        $tab.find($(e.target).attr('class')).addClass('active');
        return false;
    });
}

$(function() {
    setTabs();
})