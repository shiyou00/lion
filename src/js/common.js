$(function(){
    $('.handle-item button').on('click', function () {
        // 寻找元素
        const $this = $(this);
        const text = $this.text();
        const attr = $this.attr('data-type');
        const $top = $this.parents('.show-case-wrap');
        const $case_main = $top.find('.case-main');
        const $btns = $this.parent('.handle-item').find('button');

        if($(this).attr('data-item')){
            if(!isNaN(Number($(this).attr('data-item')))){
                // 说明是作用在单个项目上
                const $itemNum = $this.attr('data-item') - 1;
                $case_main.find('.case-item').eq($itemNum).css(attr,text);
            }else{
                // data-item === children 时表明作用于全体子项目
                $case_main.find('.case-item').css(attr,text);
            }
        }else{
            $case_main.css(attr,text);
        }

        // 激活状态
        $btns.removeClass("active");
        $(this).addClass("active");
    });
    $(".show-case-wrap br").remove();

    // 根据浏览器传递的type参数展示相应case = f1
    let param = [];
    let val = '';
    const search = window.location.search;
    if(window.location.search){
        param = search.substring(1,search.length).split('&');
    }

    param.forEach((item)=>{
        if(item.includes('case')){
            val = item.split('=')[1];
        }
    });

    if(val && val !== 'all'){
        const arr = Array.from($('.case-box'));
        arr.forEach((item)=>{
            if($(item).attr('data-case') === val){
                $(item).show();
            }
        });
    }else{
        $('.case-box').show();
    }

    Array.from($('.case-box')).forEach((item)=>{
        const name = $(item).attr('data-case');
        const h = $(item).height();
        console.log(name,h);
    })
});