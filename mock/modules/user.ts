export default [
    {
        url: '/mock/passwordLogin',
        method: 'post',
        timeout: 0,
        response: (res) => {
            console.log(res.body.username)
            return {
                code: 200,
                token: 'by simple admin'
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
                data: [ 'tom', 'jerry' ]
            }
        }
    }
]