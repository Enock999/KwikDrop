from pathlib import Path

app = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = app.read_text()
text = text.replace("const categories = ['All products','Tech','Home','Everyday'];", "const categories = ['All products','Tech','Home','Everyday'];\nconst supplierImage = (file) => `${import.meta.env.BASE_URL}products/${file}`;")
text = text.replace("'/products/", "supplierImage('")
# Close each transformed filename string before the comma/bracket delimiters.
import re
text = re.sub(r"supplierImage\('([^']+)'", r"supplierImage('\1')", text)
# The simple prefix replacement leaves valid supplierImage('file.jpg') only when the original quote is closed.
# Normalize the resulting forms explicitly by replacing the remaining quote before delimiters.
text = text.replace(".jpg'", ".jpg')")
# Undo accidental double-closing where already normalized by the previous replacement.
text = text.replace(".jpg'))", ".jpg')")
# In arrays, every supplierImage call now has the correct call syntax; ensure no malformed patterns remain.
app.write_text(text)
print('updated', app)
