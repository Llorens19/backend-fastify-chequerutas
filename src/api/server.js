const fastify = require('fastify')({ logger: true });

// Rutas básicas
fastify.get('/', async (request, reply) => {
    return { message: 'Hello from Fastify on port 4001!' };
});

// Iniciar el servidor
const start = async () => {
    try {
        await fastify.listen({ 
            port: 4001,
            host: '0.0.0.0'  // Esto permite conexiones desde cualquier IP
        });
        console.log('Fastify server running at http://0.0.0.0:4001');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();