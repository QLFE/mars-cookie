# mars-cookie [![NPM version][npm-image]][npm-url]

cookie 封装。

## 安装

```bash
$ npm install mars-cookie --save
```

## 使用方法
```
import cookie from 'mars-cookie';

cookie.set('data', {
  code: '1234546'
});


cookie.get('data'); // {code: '123456'}
```

## 文档

### API
#### set(key, value, options) 设置对应键值

- key: 存储键值
- value: 存储值，可以为任何类型
- options: cookie 选项


#### get(key) 获取对应键值

- key: 存储键值

#### remove(key) 删除对应键

- key: 存储键值

#### empty() 删除所有键值

#### getAll() 获取所有键值

[npm-image]: https://badge.fury.io/js/mars-cookie.svg
[npm-url]: https://npmjs.org/package/mars-cookie