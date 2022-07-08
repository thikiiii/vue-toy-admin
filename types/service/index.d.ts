declare namespace Server {
    // 基础响应
    interface BaseResponse {
        // 系统状态
        code: number
        // 系统状态信息
        msg: string
        // 业务code状态
        subCode: number
        // 业务状态信息
        subMsg: string
    }

    // 包装响应数据
    interface WrapperResponses<D> extends BaseResponse {
        data?: D
    }

    // 包装 Promise 响应数据
    type WrapperPromiseResponses<D> = Promise<WrapperResponses<D>>

    // 分页
    interface Pagination {
        // 页数
        page: number
        // 每页数量
        size: number
    }

    // 包装 接口请求分页
    type WrapperPageRequest<Q> = Pagination & Q

}