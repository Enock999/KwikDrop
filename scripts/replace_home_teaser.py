from pathlib import Path

p = Path('/home/ubuntu/KwikDrop/src/App.jsx')
s = p.read_text()
start = s.index('<Reveal><section className="featured-rail">')
end = s.index('</section></Reveal><Reveal><section className="editorial', start) + len('</section></Reveal>')
replacement = '''<Reveal><section className="shop-teaser"><div className="shop-teaser-copy"><div className="eyebrow">The shop is one click away</div><h2>Find your next <em>useful thing.</em></h2><p>We keep the collection small and considered. Browse the full range, see the details, and order with a real person in your corner.</p><button className="button button-dark" onClick={goShop}>Enter the shop <ArrowUpRight size={17}/></button></div><div className="shop-teaser-collage"><div className="teaser-tile tile-home"><img src={products[0].image} alt="Home essentials"/><span>Home</span></div><div className="teaser-tile tile-tech"><img src={products[1].image} alt="Tech and workspace products"/><span>Tech</span></div><div className="teaser-tile tile-everyday"><img src={products[2].image} alt="Everyday products"/><span>Everyday</span></div></div></section></Reveal>'''
p.write_text(s[:start] + replacement + s[end:])
print('homepage catalog preview replaced')
