from pathlib import Path

path = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = path.read_text()
text = text.replace('value={query} onChange={(e)=>{setQuery(e.target.value);go(\'shop\')}} placeholder="Search products"', 'value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search products"')
text = text.replace('function ProductView({product,onBack,onOrder})', 'function ProductView({product,onOrder})')
text = text.replace('<button className="back-link" onClick={onBack}><ChevronLeft size={17}/> Back to shop</button>', '<a className="back-link" href={routeHref(\'shop\')}><ChevronLeft size={17}/> Back to shop</a>')
text = text.replace('<ProductView product={currentProduct} onBack={()=>go(\'shop\')} onOrder={()=>setOrderProduct(currentProduct)} />', '<ProductView product={currentProduct} onOrder={()=>setOrderProduct(currentProduct)} />')
text = text.replace('<ProductView product={currentProduct} onBack={()=>go(\'shop\')} onOrder={()=>setOrderProduct(currentProduct)}/>', '<ProductView product={currentProduct} onOrder={()=>setOrderProduct(currentProduct)}/>')
path.write_text(text)
