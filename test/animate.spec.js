/**
 *****************************************
 * Created by lifx
 * Created on 2018-07-11 09:18:39
 *****************************************
 */
'use strict';


/**
 *****************************************
 * 加载模块
 *****************************************
 */
import delay from '@arted/utils/delay';
import animate from '../lib/animate';
import throttle from '../lib/throttle';
import { rAF } from '../lib/utils';


/**
 *****************************************
 * 测试模块
 *****************************************
 */
describe('测试【animate】', () => {

    /* 执行动画 */
    test('执行动画', () => {
        let cb = jest.fn(() => false),
            lastTime = 0;

        // 无限循环动画
        animate(event => {

            // 校验时间
            expect(event.value).toBe(0);
            expect(event.lostTime).toBeGreaterThan(lastTime);

            // 缓存最后时间
            lastTime = event.lostTime;

            // 校验结果
            expect(event.startTime).toBeLessThan(+ new Date());
            expect(event.lostTime).toBeGreaterThan(0);

            // 中上动画
            return event.lostTime < 400 || cb(event.lostTime);
        });


        // 线性动画
        animate(300, event => {

            // 校验结束动画时间
            if (event.progress === 1) {
                return expect(event.lostTime).toBeGreaterThanOrEqual(300);
            }

            // 校验进度
            expect(event.lostTime / 300).toBe(event.progress);
            expect(event.value).toBe(event.progress);
        });

        // 缓存动画
        animate(300, 'ease-in', event => {
            expect(event.value).toBeLessThanOrEqual(event.progress);
        });

        // 自定义缓存动画
        animate(300, x => 2 * x, event => {
            expect(event.value).toBe(event.progress * 2);
        });

        // 等待执行结束
        return new Promise(resolve => setTimeout(() => {

            // 校验回调结果
            expect(cb.mock.calls).toHaveLength(1);
            expect(cb.mock.calls[0][0]).toBe(lastTime);
            expect(lastTime).toBeGreaterThanOrEqual(400);

            // 完成测试
            resolve();
        }, 500));
    });

    /* 连续动画 */
    test('连续动画', async () => {
        let cb = jest.fn(),
            anim;

        // 执行动画
        await animate(100, cb);

        // 校验结果
        expect(cb).toBeCalled();
        expect(cb.mock.calls[0][0].value).toBeGreaterThan(0);
        expect(cb).toHaveBeenLastCalledWith(expect.objectContaining({ value: 1, progress: 1 }));

        // 执行动画
        cb = jest.fn();
        await animate(100, x => 2 * x, cb);

        // 校验结果
        expect(cb).toBeCalled();
        expect(cb.mock.calls[0][0].value).toBeGreaterThan(0);
        expect(cb).toHaveBeenLastCalledWith(expect.objectContaining({ value: 2, progress: 1 }));

        // 内部阻止
        cb = jest.fn(e => e.value < 1.5 || e.stop(1.5));
        anim = animate(100, x => 2 * x, cb);

        // 校验结果
        expect(await anim).toBe(1.5);
        expect(cb).toBeCalled();
        expect(cb.mock.calls[0][0].value).toBeGreaterThan(0);
        expect(cb.mock.calls[cb.mock.calls.length - 1][0].value).toBeGreaterThan(1.5);

        // 外部阻止
        cb = jest.fn();
        anim = animate(100, x => 2 * x, cb);
        setTimeout(() => anim.stop(50), 50);

        // 校验结果
        expect(await anim).toBe(50);
        expect(cb).toBeCalled();
        expect(cb.mock.calls[0][0].value).toBeGreaterThan(0);
        expect(cb.mock.calls[cb.mock.calls.length - 1][0].value).toBeLessThan(2);
    });

    /* 函数节流 */
    test('函数节流', async () => {
        let cb = jest.fn(),
            throttled = throttle(cb),
            len = 10;

        // 循环执行
        while(len --) {
            await delay(throttled(len), 5);
        }

        // 等待下一帧结束
        await new Promise(resolve => rAF(resolve));

        // 校验结果
        expect(cb).toHaveBeenLastCalledWith(0);
        expect(cb.mock.calls.length).toBeGreaterThan(0);
        expect(cb.mock.calls.length).toBeLessThan(9);
    });
});
