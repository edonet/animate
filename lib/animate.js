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
import defer from '@arted/utils/defer';
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
        let animId = null,
            deferred = defer(),
            startTime = + new Date(),
            easingFn = typeof easing === 'function' ? easing : createEasingFn(easing),
            promise = deferred.promise,
            stop;


        // 定义中上方法
        promise.stop = stop = result => {
            if (animId) {
                deferred.resolve(result);
                animId && cAF(animId);
                animId = null;
            }
        };

        // 请求下一帧
        animId = rAF(function invokeAnimateFrame() {
            if (animId) {
                try {
                    let lostTime = new Date() - startTime,
                        progress = duration > 0 ? lostTime / duration : 0,
                        result;

                    // 结束动画
                    if (progress >= 1) {
                        callback({
                            stop,
                            startTime,
                            lostTime,
                            progress: 1,
                            value: easingFn(1),
                            preventDefault: stop
                        });

                        // 绷带动画
                        return stop();
                    }

                    // 执行回调
                    result = callback({
                        stop,
                        startTime,
                        lostTime,
                        progress,
                        value: progress && easingFn(progress),
                        preventDefault: stop
                    });

                    // 请求下一帧
                    if (animId && result !== false) {
                        return animId = rAF(invokeAnimateFrame);
                    } else {
                        stop();
                    }
                } catch (err) {
                    return deferred.reject(err);
                }
            }
        });

        // 返回停止函数
        return promise;
    }
}
