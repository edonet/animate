/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-11 09:16:57
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import { isFunction } from '@arted/utils/validate';
import { rAF, cAF } from './utils';
import createEasingFn from './easing';


/**
 *****************************************
 * 执行动画
 *****************************************
 */
export default function animate(duration, easing, callback) {

    // 根据参数重载函数
    switch (arguments.length) {
        case 1:
            return animate(0, 'linear', duration);
        case 2:
            return animate(duration, 'linear', easing);
        default:
            break;
    }

    // 创建动画
    if (isFunction(callback)) {
        let id = null,
            startTime = + new Date(),
            easingFn = typeof easing === 'function' ? easing : createEasingFn(easing),
            preventDefault = () => id = id && cAF(id) && null;

        // 请求下一帧
        id = rAF(function invokeAnimateFrame() {
            if (id) {
                let lostTime = new Date() - startTime,
                    progress = duration > 0 ? lostTime / duration : 0,
                    result;

                // 结束动画
                if (progress >= 1) {
                    return callback({ startTime, lostTime, progress: 1, value: 1, preventDefault });
                }

                // 执行回调
                result = callback({
                    startTime,
                    lostTime,
                    progress,
                    value: progress && easingFn(progress),
                    preventDefault
                });

                // 请求下一帧
                if (result !== false) {
                    id = rAF(invokeAnimateFrame);
                }
            }
        });

        // 返回停止函数
        return { stop: preventDefault };
    }
}
