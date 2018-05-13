window.onload = function() {
    Particles.init({
        selector: '.about__particle-effect',
        color: '#FFF9C4',
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