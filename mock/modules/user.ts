export default [
    {
        url: '/user/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                data: ['tom', 'jerry']
            }
        }
    }
]