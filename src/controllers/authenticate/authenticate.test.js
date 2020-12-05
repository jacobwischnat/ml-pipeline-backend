describe('Authentication endpoint testing', () => {
    it('Should authenticate a user successfully', async () => {
        const body = JSON.stringify({
            email: 'jakedublya@gmail.com',
            password: 'woofmeow'
        });
        const result = await fetch('http://127.0.0.1:8080/api/auth/login', {
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