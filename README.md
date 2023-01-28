# 计划

* Layout布局
* SystemConfig
* 封装 axios


1. 接口请求的类型get，post，option，put， content-type： form-data， json常规配置，还是其他类型
2. get和post，统一传参参数data *
3. 调用只需要关注正确的响应，不需要关注错误的问题
4. 错误响应统一处理，错误响应又要分类处理，token过期，无关刷新token，等
5. 响应，又要区分全部响应，错误响应，正确响应类似promise，resolve，reject，finally
6. 全局配置的请求验签token，deviceid，id，userId等
7. whiteList配置
8. 多服务配置
9. ts，增加了T型提示功能
10. 自动重试


# 待优化
1. 接口请求响应优化
2. 
