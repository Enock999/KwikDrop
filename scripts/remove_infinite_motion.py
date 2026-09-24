from pathlib import Path

path = Path('/home/ubuntu/KwikDrop/src/styles.css')
text = path.read_text()
text = text.replace('animation:heroDrift 16s ease-in-out infinite', 'animation:heroDrift 16s ease-in-out 1')
text = text.replace('animation:cardFloat 4s ease-in-out infinite', 'animation:cardFloat 4s ease-in-out 1')
text = text.replace('animation:scrollPulse 1.7s ease-in-out infinite', 'animation:scrollPulse 1.7s ease-in-out 2')
text = text.replace('animation:orbitSpin 18s linear infinite', 'animation:orbitSpin 18s linear 1')
text = text.replace('animation:shopCardFloat 5s ease-in-out infinite', 'animation:shopCardFloat 5s ease-in-out 1')
path.write_text(text)
