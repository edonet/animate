/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-11 15:55:40
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 缓动函数
 *****************************************
 */
export default function easing(name) {
    switch (name) {
        case 'linear':
            return function (x) {
                return x;
            };
        case 'ease-in-out':
            return function (x) {
                return x - Math.sin(2 * Math.PI * x) / (2 * Math.PI);
            };
        case 'ease-in':
            return function (x) {
                return Math.pow(x, 3);
            };
        case 'ease-out':
            return function (x) {
                return Math.pow(x - 1, 3) + 1;
            };
        case 'back-in':
            return function (x) {
                var s = 1.70158; return x * x * ((s + 1) * x - s);
            };
        case 'back-out':
            return function (x) {
                x -= 1; var s = 1.70158; return x * x * ((s + 1) * x + s) + 1;
            };
        case 'quadratic':
            return function (x) {
                return x * (2 - x);
            };
        case 'circular':
            return function (x) {
                return Math.sqrt(1 - (--x * x));
            };
        case 'elastic':
            return function (x) {
                return x < 0.4 ? Math.pow(2.5 * x, 3) : Math.sin(5 * x * Math.PI) * Math.cos(0.5 * x * Math.PI) / 3 + 1;
            };
        case 'bounce':
            return function (x) {
                var s = 7.5625,
                    p = 2.75;

                if (x < 1 / p) {
                    return s * x * x;
                } else if (x < 2 / p) {
                    x -= 1.5 / p;
                    return s * x * x + 0.75;
                } else if (x < 2.5 / p) {
                    x -= 2.25 / p;
                    return s * x * x + 0.9375;
                } else {
                    x -= 2.625 / p;
                    return s * x * x + 0.984375;
                }
            };
        default:
            return x => x;
    }
}

