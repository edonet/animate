/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-15 11:52:15
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载依赖
 *****************************************
 */
import animate from './animate';
import easing from './easing';
import throttle from './throttle';
import { rAF, cAF } from './utils';


/**
 *****************************************
 * 抛出接口
 *****************************************
 */
export default animate;
export { rAF, cAF, easing, throttle };
