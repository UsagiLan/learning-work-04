function ease(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function reverseEase(y) {
    return 1 - Math.sqrt(1 - y * y);
}

function watch(target, prop, callback) {
    Object.defineProperty(target, prop, {
        get: function () {
            return this["_" + prop];
        },
        set: function (value) {
            this["_" + prop] = value;
            callback();
        }
    });
};

export class Touch {
    private max = 0
    private sensitivity = 1//灵敏度
    private deceleration = 0.0006// 减速率
    private maxRegion = 600
    private springMaxRegion = 60

    // other
    private x1: number;
    private x2: number;
    private y1: number;
    private y2: number;
    private tickID: number;
    private preY: number;
    private _preventMove: boolean;
    private _firstTouchMove: boolean;
    private startTime: number;
    private isTouchStart: boolean;
    private start: number;
    private min: number;
    private move_target: HTMLElement;
    private target: HTMLElement;

    private scrollFrobid: boolean = false;// 禁止滑动


    private hasMaxSpeed: boolean;
    private maxSpeed: number;

    private change: Function;

    private clickFunList: Function[] = [];

    // private animationEnd: Function;


    constructor(target: HTMLElement, move_target?: HTMLElement, option?) {
        option = option || {};
        target.addEventListener("touchstart", this._start.bind(this))
        target.addEventListener("touchmove", this._move.bind(this))
        target.addEventListener("touchend", this._end.bind(this))

        watch(target, "translateY", () => {
            var trand = target["translateY"];
            var transform = "translateY(" + trand + "px)"
            if (this.move_target && this.move_target.style) {
                this.move_target.style.top = this.move_target.style.webkitTransform = transform;
            }
        });
        this.target = target;
        this.move_target = move_target;
        this.target["translateY"] = 0;
        this.change = option.change || function () {
        }
    }

    // 容器中的列表会动态更新，所以提供此方法更新容器中的列表
    updateMoveTarget(move_target: HTMLElement) {
        cancelAnimationFrame(this.tickID);
        this.move_target = move_target;
        this.target["translateY"] = 0;
    }

    private _start(evt) {
        this.full();
        this.y1 = this.preY = evt.touches[0].pageY;
        cancelAnimationFrame(this.tickID);
        this.start = this.preY;
        this.isTouchStart = true;
        this.startTime = new Date().getTime();
        this._firstTouchMove = true;
        this._preventMove = false;
    }

    private full() {
        if (this.move_target && this.target) {
            var inner_height = this.move_target.offsetHeight;
            var target_height = this.target.offsetHeight;
            this.min = target_height - inner_height;
            if (this.min > 0) {
                this.scrollFrobid = true;
            } else {
                this.scrollFrobid = false;
            }
        }

    }

    private _move(evt) {
        if (this.isTouchStart) {
            var len = evt.touches.length,
                currentY = evt.touches[0].pageY;
            if (this._firstTouchMove) {
                this._firstTouchMove = false;
            }
            if (!this._preventMove && !this.scrollFrobid) {
                var d = currentY - this.preY;
                var f = 0.7;
                if (this.target["translateY"] > 0 || this.target["translateY"] < this.min) {
                    f = 0.3;
                }
                d = d * f;
                this.target["translateY"] = (Number(this.target["translateY"]) || 0) + d;
                this.preY = currentY;
            }
            evt.preventDefault();
            this.y2 = currentY;
        }
    }

    private _end(evt) {
        if (this.isTouchStart) {
            this.isTouchStart = false;
            var self = this;
            var current = this.target["translateY"];
            // console.log("touche end..", current, this.max)
            var triggerTap = (Math.abs(evt.changedTouches[0].pageX - this.x1) < 30 && Math.abs(evt.changedTouches[0].pageY - this.y1) < 30);
            if (Date.now() - this.startTime < 300 && (Math.abs(evt.changedTouches[0].pageY - this.start) < 5)) {
                // 我认为是点击咯
                this._click(evt.target);
                evt.preventDefault();

            } else if (current > this.max) {
                // console.log('current > this.max', this.max)
                this._to(this.max, 400, ease, this.change, (value) => {
                });
            } else if (current < this.min) {
                // console.log('current < this.min', current, this.min)
                this._to(this.min, 400, ease, this.change, function (value) {
                }.bind(this));
            } else if (!this._preventMove) {
                // console.log('!this._preventMove', current, this.min)
                var dt = new Date().getTime() - this.startTime;
                if (dt < 300) {
                    var distance = (evt.changedTouches[0].pageY - this.start) * this.sensitivity;
                    var speed = Math.abs(distance) / dt;
                    var speed2 = 0.6 * speed;
                    if (this.hasMaxSpeed && speed2 > this.maxSpeed) {
                        speed2 = this.maxSpeed;
                    }
                    var destination = current + (speed2 * speed2) / (2 * this.deceleration) * (distance < 0 ? -1 : 1);
                    var tRatio = 1;

                    // console.log('快速滑动', evt.changedTouches[0], this.sensitivity, {distance, speed, destination, tRatio})
                    // 持续时间
                    if (destination < this.min) {
                        if (destination < this.min - this.maxRegion) {
                            tRatio = reverseEase((current - this.min + this.springMaxRegion) / (current - destination));
                            destination = this.min - this.springMaxRegion;
                        } else {
                            tRatio = reverseEase((current - this.min + this.springMaxRegion * (this.min - destination) / this.maxRegion) / (current - destination));
                            destination = this.min - this.springMaxRegion * (this.min - destination) / this.maxRegion;
                        }
                    } else if (destination > this.max) {
                        if (destination > this.max + this.maxRegion) {
                            tRatio = reverseEase((this.max + this.springMaxRegion - current) / (destination - current));
                            destination = this.max + this.springMaxRegion;
                        } else {
                            tRatio = reverseEase((this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion - current) / (destination - current));
                            destination = this.max + this.springMaxRegion * (destination - this.max) / this.maxRegion;
                        }
                    }

                    var duration = Math.round(speed / self.deceleration) * tRatio;
                    self._to(Math.round(destination), duration, ease, self.change, (value) => {
                        if (self.target["translateY"] > self.max) {
                            cancelAnimationFrame(self.tickID);
                            self._to(self.max, 600, ease, self.change, self.animationEnd);

                        } else if (self.target["translateY"] < self.min) {
                            cancelAnimationFrame(self.tickID);
                            self._to(self.min, 600, ease, self.change, self.animationEnd);

                        } else {
                            self.animationEnd.call(self, value);
                        }
                    });
                } else {
                    self._correction();
                }
            } else {
                self._correction();
            }

        }
    }

    private _to(value, time, ease, onChange, onEnd) {
        var beginTime = Date.now()
        var el = this.target;
        var current = el["translateY"];
        var dv = value - current;
        var self = this;
        if (this.scrollFrobid) {
            return;
        }
        var toTick = function () {

            var dt = Date.now() - beginTime;
            if (dt >= time) {
                el["translateY"] = value;
                onEnd && onEnd.call(self, value);
                return;
            }
            el["translateY"] = dv * ease(dt / time) + current;
            self.tickID = requestAnimationFrame(toTick);
        };
        toTick();
    }

    private _correction() {
        var el = this.target;
        var value = el["translateY"];
        this._to(value, 400, ease, this.change, function (value) {
            this.animationEnd.call(this, value);
        }.bind(this));
    }

    private _click(ele: HTMLElement) {
        this.clickFunList.forEach((item) => {
            item(ele);
        })
    }

    on(evt: string, fun: (evt: HTMLElement) => void) {
        if (typeof fun == 'function') {
            this.clickFunList.push(fun);
        }
    }

    private animationEnd() {

    }
}