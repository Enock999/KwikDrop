import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowUpRight, BadgeCheck, ChevronDown, ChevronRight, Clock3,
  Heart, Menu, MessageCircle, Minus, Plus, Search, ShieldCheck,
  Sparkles, Truck, X, Zap
} from 'lucide-react';

// Change this one value to the real WhatsApp Business number before launch.
const WHATSAPP_NUMBER = '27821234567';
const STORE_AREAS = 'Umbilo + Glenwood';

const products = [
  {
    id: 'aroma-diffuser', name: 'Halo Mist Diffuser', category: 'Home', price: 349, oldPrice: 499,
    badge: 'Bestseller', rating: 4.9, reviews: 38,
    tagline: 'Turn any room into your calm place.',
    description: 'A whisper-quiet aroma diffuser with a soft ambient glow. Set the mood, reset your evening, and make home feel like your favourite place to be.',
    features: ['Whisper-quiet mist', 'Warm LED mood light', 'Up to 6 hours per fill'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'desk-lamp', name: 'Luma Desk Light', category: 'Tech', price: 289, oldPrice: 399,
    badge: 'New drop', rating: 4.8, reviews: 21,
    tagline: 'Good light. Better focus.',
    description: 'A sleek rechargeable desk light for late-night work, study sessions, and the corners of your home that deserve better light.',
    features: ['3 brightness modes', 'USB-C rechargeable', 'Flexible 180° neck'],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'travel-mug', name: 'Everyday Tumbler', category: 'Everyday', price: 239, oldPrice: 299,
    badge: 'Staff pick', rating: 4.9, reviews: 52,
    tagline: 'Your daily sip, upgraded.',
    description: 'A good-looking, spill-resistant tumbler that keeps your drink close and your day moving. Built for commutes, campus, and car cup holders.',
    features: ['Double-wall insulated', 'Leak-resistant lid', 'Fits standard cup holders'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'carry-organiser', name: 'Carry-All Organiser', category: 'Everyday', price: 199, oldPrice: 279,
    badge: 'Low stock', rating: 4.7, reviews: 17,
    tagline: 'Less rummaging. More living.',
    description: 'The tidy little home for your cables, chargers, cards, and everyday bits. Compact enough for a tote, clever enough for your whole routine.',
    features: ['8 smart compartments', 'Water-resistant shell', 'Slim travel profile'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1589363360147-4f2d51541551?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85']
  }
];

const categories = ['All finds', 'Home', 'Tech', 'Everyday'];

function money(value) { return `R${value.toLocaleString('en-ZA')}`; }
function whatsappUrl(product, quantity = 1) {
  const text = `Hi KwikDrop! I'd like to order:\n\n${product.name} × ${quantity}\nPrice: ${money(product.price * quantity)}\n\nI'm in ${STORE_AREAS}. Please confirm delivery and cash-on-delivery details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function App() {
  const [route, setRoute] = useState(window.location.hash);
  const [category, setCategory] = useState('All finds');
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const id = route.startsWith('#product/') ? route.replace('#product/', '') : null;
    setProduct(products.find((item) => item.id === id) || null);
    setQuantity(1);
    setLiked(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  const visibleProducts = useMemo(() => products.filter((item) => {
    const matchCategory = category === 'All finds' || item.category === category;
    const matchQuery = !query || `${item.name} ${item.tagline}`.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  }), [category, query]);

  const goHome = () => { window.location.hash = ''; setMenuOpen(false); };
  const openProduct = (item) => { window.location.hash = `product/${item.id}`; };

  return (
    <div className="app-shell">
      <div className="announcement"><Sparkles size={14} /> Local delivery in {STORE_AREAS} <span>·</span> Pay on delivery <ArrowUpRight size={14} /></div>
      <header className="site-header">
        <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <button className="brand" onClick={goHome} aria-label="KwikDrop home"><span>kwik</span><i>drop</i><b>.</b></button>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
          <button onClick={goHome}>Shop all</button><button onClick={() => { goHome(); setCategory('Home'); }}>Home</button><button onClick={() => { goHome(); setCategory('Tech'); }}>Tech</button><button onClick={() => { goHome(); setCategory('Everyday'); }}>Everyday</button>
        </nav>
        <div className="header-actions">
          <button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={19} /></button>
          <a className="whatsapp-top" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi KwikDrop! I have a question about your products.')}`} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>Chat to order</span></a>
        </div>
      </header>
      {searchOpen && <div className="searchbar"><Search size={17} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search useful finds..." /><button onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={17} /></button></div>}

      {product ? <ProductView product={product} quantity={quantity} setQuantity={setQuantity} liked={liked} setLiked={setLiked} goHome={goHome} /> : <HomeView visibleProducts={visibleProducts} category={category} setCategory={setCategory} openProduct={openProduct} />}

      <a className="floating-wa" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi KwikDrop! I want to see your latest finds.')}`} target="_blank" rel="noreferrer"><MessageCircle size={21} /><span>Chat with us</span></a>
      <footer className="site-footer"><div className="footer-brand"><button className="brand" onClick={goHome}><span>kwik</span><i>drop</i><b>.</b></button><p>Useful finds. Delivered kwik.</p></div><div className="footer-meta"><span>Durban, South Africa</span><span>© 2026 KwikDrop</span><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer">WhatsApp us <ArrowUpRight size={14} /></a></div></footer>
    </div>
  );
}

function HomeView({ visibleProducts, category, setCategory, openProduct }) {
  return <main>
    <section className="hero">
      <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> The local drop, delivered</div><h1>Little things<br /><em>made better.</em></h1><p>Useful, good-looking finds for your everyday. Curated for Durban, delivered to your door, and easy to order on WhatsApp.</p><div className="hero-ctas"><a className="button button-dark" href="#shop">Explore the drops <ArrowDown /></a><a className="text-link" href="#how-it-works">How it works <ArrowUpRight size={16} /></a></div></div>
      <div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card"><img src={products[0].image} alt="Halo Mist Diffuser in a warm home setting" /><span className="hero-label">01 / 04</span></div><div className="hero-sticker"><Zap size={16} fill="currentColor" /><span>new<br />energy</span></div><div className="hero-caption">THE GOOD<br />STUFF, KWIK.</div></div>
    </section>
    <section className="trust-strip"><div><Truck size={19} /><span><b>Local delivery</b> Umbilo + Glenwood</span></div><div><ShieldCheck size={19} /><span><b>Pay on delivery</b> No card, no stress</span></div><div><MessageCircle size={19} /><span><b>Order on WhatsApp</b> Real human help</span></div><div><Clock3 size={19} /><span><b>Quick replies</b> We're nearby</span></div></section>
    <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow">The current drop</div><h2>Find your next <em>favourite.</em></h2></div><p>Small upgrades. Big difference.<br />No endless scrolling required.</p></div><div className="category-row">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="product-grid">{visibleProducts.map((item, index) => <ProductCard key={item.id} product={item} index={index} openProduct={openProduct} />)}</div></section>
    <section className="editorial" id="how-it-works"><div className="editorial-image"><img src={products[2].image} alt="Coffee tumbler and morning setup" /><div className="editorial-tag">picked for<br /><b>real life</b></div></div><div className="editorial-copy"><div className="eyebrow">Why KwikDrop</div><h2>Good finds,<br /><em>without the fuss.</em></h2><p>We look for the useful stuff you’ll actually reach for. Then we make getting it simple: choose a drop, tap order, and chat to a real person on WhatsApp.</p><div className="steps"><div><span>01</span><b>Choose your find</b><small>Browse the latest drops</small></div><div><span>02</span><b>Tap to order</b><small>We’ll open a WhatsApp chat</small></div><div><span>03</span><b>Pay on delivery</b><small>We bring it to your area</small></div></div><a className="button button-outline" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi KwikDrop! Tell me about your latest drops.')}`} target="_blank" rel="noreferrer">Ask us anything <MessageCircle size={17} /></a></div></section>
    <section className="quote-section"><div className="quote-mark">“</div><blockquote>It feels like finding the good corner of the internet — but it’s right here in Durban.</blockquote><div className="quote-author"><div className="avatar">N</div><span><b>Neo M.</b><small>Glenwood, Durban</small></span><div className="stars">★★★★★</div></div></section>
  </main>;
}

function ProductCard({ product, index, openProduct }) { return <article className="product-card" onClick={() => openProduct(product)}><div className="product-image-wrap"><img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} /><span className="product-badge">{product.badge}</span><button className="quick-add" onClick={(e) => { e.stopPropagation(); openProduct(product); }}>View drop <ArrowUpRight size={15} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.tagline}</p></div><div className="product-price"><b>{money(product.price)}</b><del>{money(product.oldPrice)}</del></div></div><div className="product-rating"><span>★★★★★</span> {product.rating} <i>({product.reviews})</i></div></article> }

function ProductView({ product, quantity, setQuantity, liked, setLiked, goHome }) {
  const [activeImage, setActiveImage] = useState(0);
  useEffect(() => setActiveImage(0), [product.id]);
  return <main className="detail-page"><button className="back-link" onClick={goHome}><ArrowLeft size={16} /> Back to all finds</button><div className="detail-grid"><div className="gallery"><div className="main-product-image"><img src={product.thumbs[activeImage]} alt={product.name} /><span className="gallery-count">0{activeImage + 1} / 03</span></div><div className="thumb-row">{product.thumbs.map((image, index) => <button className={activeImage === index ? 'thumb active' : 'thumb'} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div></div><div className="detail-copy"><div className="eyebrow">{product.category} / {product.badge}</div><div className="detail-title-row"><h1>{product.name}</h1><button className={liked ? 'like-btn liked' : 'like-btn'} onClick={() => setLiked(!liked)} aria-label="Save product"><Heart size={20} fill={liked ? 'currentColor' : 'none'} /></button></div><div className="detail-rating"><span>★★★★★</span> <b>{product.rating}</b> <u>{product.reviews} happy customers</u></div><p className="detail-tagline">{product.tagline}</p><p className="detail-description">{product.description}</p><ul className="feature-list">{product.features.map((feature) => <li key={feature}><BadgeCheck size={17} /> {feature}</li>)}</ul><div className="price-block"><div><strong>{money(product.price)}</strong> <del>{money(product.oldPrice)}</del></div><span>Save {money(product.oldPrice - product.price)}</span></div><div className="order-box"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><a className="order-button" href={whatsappUrl(product, quantity)} target="_blank" rel="noreferrer"><MessageCircle size={19} /> Order on WhatsApp <ArrowUpRight size={17} /></a></div><div className="delivery-note"><Truck size={18} /><div><b>Delivered around {STORE_AREAS}</b><span>Chat with us to confirm your delivery window. Pay when it arrives.</span></div></div><div className="accordion"><details open><summary>What happens after I order? <ChevronDown size={17} /></summary><p>WhatsApp opens with your product and quantity already filled in. We’ll confirm availability, your address, and a delivery time — then you pay on arrival.</p></details><details><summary>Is delivery free? <ChevronDown size={17} /></summary><p>We’ll confirm the small local delivery fee in WhatsApp before we dispatch, so there are no surprises.</p></details></div></div></div><div className="mobile-sticky-cta"><a href={whatsappUrl(product, quantity)} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Order on WhatsApp · {money(product.price * quantity)}</a></div></main>;
}

function ArrowDown() { return <ChevronRight size={17} className="arrow-down" />; }

export default App;
