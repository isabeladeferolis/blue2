document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const canvas = card.querySelector('.water-canvas');
        const ctx = canvas.getContext('2d');
        let particles = [];
        const numParticles = 15; // Número de "gotas" para simular o efeito
        const particleColor = 'rgba(173, 216, 230, 0.5)'; // Cor azul claro semitransparente

        // Ajusta o tamanho do canvas para o tamanho do card
        const resizeCanvas = () => {
            canvas.width = card.offsetWidth;
            canvas.height = card.offsetHeight;
        };

        // Cria as partículas iniciais
        const createParticles = () => {
            particles = [];
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 5 + 2, // Raio entre 2 e 7
                    speedX: (Math.random() - 0.5) * 0.5, // Velocidade horizontal lenta
                    speedY: (Math.random() - 0.5) * 0.5, // Velocidade vertical lenta
                    alpha: Math.random() * 0.5 + 0.2 // Transparência entre 0.2 e 0.7
                });
            }
        };

        // Desenha as partículas
        const drawParticles = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor.replace('0.5', p.alpha); // Usa a transparência individual
                ctx.fill();
            });
        };

        // Atualiza a posição das partículas
        const updateParticles = () => {
            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                p.x += p.speedX;
                p.y += p.speedY;

                // Reinicia a partícula se sair da tela
                if (p.x < -p.radius || p.x > canvas.width + p.radius || p.y < -p.radius || p.y > canvas.height + p.radius) {
                    particles[i] = {
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 5 + 2,
                        speedX: (Math.random() - 0.5) * 0.5,
                        speedY: (Math.random() - 0.5) * 0.5,
                        alpha: Math.random() * 0.5 + 0.2
                    };
                }
            }
        };

        // Loop principal da animação
        const animate = () => {
            updateParticles();
            drawParticles();
            requestAnimationFrame(animate);
        };

        // Inicializa a animação
        resizeCanvas();
        createParticles();
        animate();

        // Reajusta o canvas se o tamanho do card mudar (ex: responsividade)
        window.addEventListener('resize', resizeCanvas);
    });
});