from pathlib import Path

path = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = path.read_text()
anchor = "const chatUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;"
text = text.replace(anchor, anchor + "\nconst routeHref = (hash='') => `${import.meta.env.BASE_URL}index.html${hash ? `#${hash}` : ''}`;")
text = text.replace('<button className="brand" onClick={()=>go(\'\')} aria-label="KwikDrop home"><span>kwik</span><i>drop</i><b>.</b></button>', '<a className="brand" href={routeHref(\'\')} aria-label="KwikDrop home"><span>kwik</span><i>drop</i><b>.</b></a>')
text = text.replace('<button onClick={()=>go(\'\')}>Home</button><button onClick={()=>go(\'shop\')}>Shop</button><button onClick={()=>go(\'how-it-works\')}>How it works</button><button onClick={()=>go(\'delivery\')}>Delivery</button><button onClick={()=>go(\'faqs\')}>FAQs</button>', '<a href={routeHref(\'\')}>Home</a><a href={routeHref(\'shop\')}>Shop</a><a href={routeHref(\'how-it-works\')}>How it works</a><a href={routeHref(\'delivery\')}>Delivery</a><a href={routeHref(\'faqs\')}>FAQs</a>')
text = text.replace('<button className="brand footer-logo" onClick={()=>go(\'\)}><span>kwik</span><i>drop</i><b>.</b></button>', '<a className="brand footer-logo" href={routeHref(\'\)}><span>kwik</span><i>drop</i><b>.</b></a>')
path.write_text(text)
