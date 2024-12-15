const cookie = require('cookie');

exports.handler = async (event) => {
  if (event.httpMethod === 'POST') {
    const { email, password } = JSON.parse(event.body);

    if (email === 'admin@example.com' && password === '12345') {
      const sessionId = new Date().getTime(); 
      const cookies = cookie.serialize('session_id', sessionId, {
        secure: process.env.NODE_ENV === 'production', 
        maxAge: 60 * 60 * 24, 
        path: '/',
      });

      return {
        statusCode: 200,
        headers: {
          'Set-Cookie': cookies, 
        },
        body: JSON.stringify({ message: 'Login exitoso' }),
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Credenciales incorrectas' }),
      };
    }
  }

  return { statusCode: 405, body: 'Método no permitido' };
};
