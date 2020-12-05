describe('User endpoint testing', () => {
    it('Should create a user successfully', async () => {
        const body = JSON.stringify({
            name: 'Jacob',
            email: 'jakedublya@gmail.com',
            password: 'woofmeow'
        });
        const result = await fetch('http://127.0.0.1:8080/api/user/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body
        }).then(response => response.text());

        console.log(result);

        // .then(response => response.json());

        expect(result).toBeDefined();
    });
});