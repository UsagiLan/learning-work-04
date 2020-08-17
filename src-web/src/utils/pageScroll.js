
class PageScroll {
    constructor() {
        this.container = '';
        this.scrollTop = 0;
    }

    init(container) {
        console.log('container-------', container)
        this.container = container;
    }

    disable() {
        this.scrollTop = $(window).scrollTop();                            
        $(this.container).css({
            "position":"fixed",
            "top":-this.scrollTop,
        });
    }

    enable() {
        $(this.container).css({
            "position":"static",   //去除相对于窗口的定位
        });
        $(window).scrollTop(this.scrollTop);
    }
}

export default new PageScroll();