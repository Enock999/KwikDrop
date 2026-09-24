from pathlib import Path

path = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = path.read_text()
text = text.replace('Free Durban delivery', 'Free delivery')
text = text.replace('Durban delivery', 'Free delivery')
path.write_text(text)
