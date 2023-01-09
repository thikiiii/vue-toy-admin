declare namespace Service {
    // 基础响应结果
    interface BaseResult<D = any> {
        // 系统状态
        code: number
        // 系统状态信息
        msg: string
        // 业务code状态
        subCode: number
        // 业务状态信息
        subMsg: string
        // data
        result?: D
    }

    // 结果扩展
    type Result<D = any, T = {}> = BaseResult<D> & T

    // 分页
    interface Pagination {
        // 页数
        page: number
        // 每页数量
        size: number
    }

    // 包装 接口请求分页
    type WrapperPage<Q> = Pagination & Q
}
