    document.addEventListener('DOMContentLoaded', function() {
            const canvas = document.getElementById('stars');
            const ctx = canvas.getContext('2d');
            const container = document.querySelector('.starfield-container');
            
            // Canvas boyutunu konteynere göre ayarla
            let w = canvas.width = container.offsetWidth;
            let h = canvas.height = container.offsetHeight;
            
            // Yıldız sayısını ekran boyutuna göre ayarla
            const starsCount = window.innerWidth < 768 ? 800 : 1500;
            const stars = [];
            
            for(let i = 0; i < starsCount; i++){
                stars.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    size: Math.random() * 1.2 + 0.3,
                    speed: Math.random() * 0.008 + 0.002
                });
            }
            
            // Animasyon
            function animate(){
                ctx.clearRect(0, 0, w, h);
                
                for(let star of stars){
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.fill();
                    
                    // Döndürme hareketi
                    let dx = star.x - w/2;
                    let dy = star.y - h/2;
                    let angle = star.speed;
                    let cos = Math.cos(angle);
                    let sin = Math.sin(angle);
                    star.x = dx * cos - dy * sin + w/2;
                    star.y = dx * sin + dy * cos + h/2;
                    
                    // Yıldızlar ekran dışına çıkarsa yeniden konumlandır
                    if(star.x < 0 || star.x > w || star.y < 0 || star.y > h){
                        star.x = Math.random() * w;
                        star.y = Math.random() * h;
                    }
                }
                
                requestAnimationFrame(animate);
            }
            
            animate();
            
            // Pencere boyutu değişince canvas yeniden boyutlansın
            window.addEventListener('resize', () => {
                w = canvas.width = container.offsetWidth;
                h = canvas.height = container.offsetHeight;
                
                // Yıldızları yeniden oluştur
                stars.length = 0;
                const newStarsCount = window.innerWidth < 768 ? 800 : 1500;
                for(let i = 0; i < newStarsCount; i++){
                    stars.push({
                        x: Math.random() * w,
                        y: Math.random() * h,
                        size: Math.random() * 1.2 + 0.3,
                        speed: Math.random() * 0.008 + 0.002
                    });
                }
            });
        });
