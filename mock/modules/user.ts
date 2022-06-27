export default [
    {
        url: '/mock/passwordLogin',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: ['tom', 'jerry']
            }
        }
    },
    {
        url: '/mock/getUserinfo',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: ['tom', 'jerry']
            }
        }
    }
]