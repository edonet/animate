/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-11 10:47:18
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 申请下一帧
 *****************************************
 */
export const rAF = window.rAF = (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    (callback => setTimeout(callback, 1000 / 60))
);


/**
 *****************************************
 * 取消下一帧
 *****************************************
 */
export const cAF = window.cAF = (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oCancelAnimationFrame ||
    (id => clearTimeout(id))
);

