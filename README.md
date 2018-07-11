# animate
A simple utils to create javascript animation!

## Installation
npm
``` shell
$ npm install @arted/animate
```

or yarn
``` shell
$ yarn add @arted/animate
```

## Usage
``` javascript
import animate from '@arted/animate';

// 执行动画
animate(300, 'ease-in', ({ value, progress }) => {
    // todo something with value or progress;
});
```
