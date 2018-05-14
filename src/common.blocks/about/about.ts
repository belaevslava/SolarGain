window.onload = function() {
    Particles.init({
        selector: '.about__particle-effect',
        color: '#EEEEEE',
        maxParticles: 130,
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 80
                }
            }, {
                breakpoint: 375,
                options: {
                    maxParticles: 50
                }
            }
        ]
    });
};