/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-15 11:20:24
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


/**
 *****************************************
 * 函数节流
 *****************************************
 */
export default function throttle(callback) {
    let id = null,
        lastContext = null,
        lastArgs = [];


    // 定义节流函数
    function throttled(...args) {

        // 更新参数
        lastContext = this;
        lastArgs = args;

        if (!id) {
            id = rAF(() => {
                id = null;
                callback.apply(lastContext, lastArgs);
                lastContext = null;
                lastArgs = [];
            });
        }
    }

    // 设置取消函数
    throttled.cancel = () => {
        id = id && cAF(id) && null;
        lastContext = null;
        lastArgs = [];
    };

    // 返回结果
    return isFunction(callback) && throttled;
}
