$(function () {

    //阻止页面滑动
    $(document).on("mousewheel", prevenDefault);
    $(document).on("touchmove", prevenDefault);

    //弹出层内的子元素可以滑动,  在手机端会有个bug, 就是滑动顶部或底部的时候，就右可以滑动页面了
    $("#modal-body").on("mousewheel", innerScroll);
    //$("#modal-body").on("touchmove", stopPropagation);
    //手机端重写弹出层的滚动
    phoneScroll();
});


/**
 * 阻止默认事件
 */
function prevenDefault(e){
    e = e || window.event;
    e.preventDefault && e.preventDefault();
    e.returnValue = false;
}

/**
 * 阻止冒泡事件
 * @param e
 */
function stopPropagation(e){
    e = e || window.event;
    e.stopPropagation && e.stopPropagation();
    e.cancelBubble = false;
}

/**
 * pc端重新弹出层内部的滚动;
 * @param e
 * @returns {boolean}
 */
function innerScroll(e){
    // 阻止冒泡到document
    // document上已经preventDefault
    stopPropagation(e);

    var delta = e.wheelDelta || e.detail || 0;
    var box = $(this).get(0);

    if($(box).height() + box.scrollTop >= box.scrollHeight){
        if(delta < 0) {
            preventDefault(e);
            return false;
        }
    }
    if(box.scrollTop === 0){
        if(delta > 0) {
            preventDefault(e);
            return false;
        }
    }
    // 会阻止原生滚动
    // return false;
}

/**
 * 移动端的弹出层的内部滚动
 */
function phoneScroll(){
    // 移动端touch重写
    var startX, startY;

    $('#modal-body').on('touchstart', function(e){
        startX = e.originalEvent.changedTouches[0].pageX;
        startY = e.originalEvent.changedTouches[0].pageY;
    });

// 仿innerScroll方法
    $('#modal-body').on('touchmove', function(e){
        e.stopPropagation();
        console.log(e);
        var deltaX = e.originalEvent.changedTouches[0].pageX - startX;
        var deltaY = e.originalEvent.changedTouches[0].pageY - startY;

        // 只能纵向滚
        if(Math.abs(deltaY) < Math.abs(deltaX)){
            e.preventDefault();
            return false;
        }

        var box = $(this).get(0);

        if($(box).height() + box.scrollTop >= box.scrollHeight){
            if(deltaY < 0) {
                e.preventDefault();
                return false;
            }
        }
        if(box.scrollTop === 0){
            if(deltaY > 0) {
                e.preventDefault();
                return false;
            }
        }
        // 会阻止原生滚动
        // return false;
    });
}

console.log('w shi lai zi git-test上的修改  333 444');
