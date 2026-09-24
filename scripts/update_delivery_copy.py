from pathlib import Path

path = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = path.read_text()
text = text.replace('Please confirm stock, delivery fee and timing before dispatch.', 'Please confirm stock and delivery timing before dispatch. Delivery is free in our starting area.')
path.write_text(text)
