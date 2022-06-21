export default [
    {
        url: '/user/login',
        method: 'post',
        timeout: 0,
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: [ 'tom', 'jerry' ]
            }
        }
    }
]