import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft, ArrowUpRight, BadgeCheck, ChevronDown, ChevronRight, Clock3,
  Heart, Menu, MessageCircle, Minus, Plus, Search, ShieldCheck,
  Sparkles, Truck, X, Zap, MapPin, CircleHelp, PackageCheck, UserRound
} from 'lucide-react';

// Replace this placeholder with your real WhatsApp Business number before launch.
const WHATSAPP_NUMBER = '27821234567';
const STORE_AREAS = 'Umbilo + Glenwood';
const DELIVERY_NOTE = 'We confirm the delivery fee and availability with you before dispatch.';

// Keep this catalog honest and editable. Product claims should match the supplier listing.
const products = [
  {
    id: 'aroma-diffuser', name: 'Halo Mist Diffuser', category: 'Home', price: 349,
    badge: 'Home essential', status: 'Available to order',
    tagline: 'A calmer atmosphere, at the push of a button.',
    description: 'A compact aroma diffuser with a soft ambient glow for bedrooms, living rooms, and work spaces. Message us and we’ll confirm current stock before arranging delivery.',
    features: ['Quiet mist output', 'Ambient LED light', 'Compact everyday size'],
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'desk-lamp', name: 'Luma Desk Light', category: 'Tech', price: 289,
    badge: 'Workspace', status: 'Available to order',
    tagline: 'Better light for focused little moments.',
    description: 'A rechargeable desk light for late-night work, study sessions, and the corners of your home that deserve better light. Stock is confirmed personally before delivery.',
    features: ['Multiple brightness modes', 'USB rechargeable', 'Adjustable neck'],
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'travel-mug', name: 'Everyday Tumbler', category: 'Everyday', price: 239,
    badge: 'Everyday carry', status: 'Available to order',
    tagline: 'A better cup for the daily move.',
    description: 'A good-looking insulated tumbler for commutes, campus, and car cup holders. Ask us about the colour currently available before you order.',
    features: ['Double-wall insulated', 'Secure lid', 'Cup-holder friendly'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85']
  },
  {
    id: 'carry-organiser', name: 'Carry-All Organiser', category: 'Everyday', price: 199,
    badge: 'For the daily bag', status: 'Available to order',
    tagline: 'A place for the small things.',
    description: 'A compact organiser for cables, chargers, cards, and everyday bits. Message us to confirm the current colour and stock before we arrange delivery.',
    features: ['Multiple compartments', 'Water-resistant outer', 'Slim travel profile'],
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
    thumbs: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1589363360147-4f2d51541551?auto=format&fit=crop&w=1200&q=85','https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85']
  }
];

const categories = ['All finds', 'Home', 'Tech', 'Everyday'];
function money(value) { return `R${value.toLocaleString('en-ZA')}`; }
function whatsappUrl(product, quantity = 1, customer = null) {
  const customerBlock = customer ? `\nCUSTOMER DETAILS\nName: ${customer.name}\nEmail: ${customer.email}\nWhatsApp: ${customer.phone}\nAddress: ${customer.address}\nSuburb: ${customer.suburb}\nPreferred time: ${customer.time}\nNotes: ${customer.notes || 'None'}` : '';
  const text = `Hi KwikDrop! I'd like to check availability and order:\n\n${product.name} × ${quantity}\nEstimated total: ${money(product.price * quantity)}\n${customerBlock}\n\nPlease confirm stock, delivery fee and timing before dispatch.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
function chatUrl(message) { return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`; }

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
    setQuantity(1); setLiked(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);
  const visibleProducts = useMemo(() => products.filter((item) => {
    const matchCategory = category === 'All finds' || item.category === category;
    const matchQuery = !query || `${item.name} ${item.tagline} ${item.category}`.toLowerCase().includes(query.toLowerCase());
    return matchCategory && matchQuery;
  }), [category, query]);
  const goHome = () => { window.location.hash = ''; setMenuOpen(false); };
  const jump = (id) => { setMenuOpen(false); if (window.location.hash) window.location.hash = ''; setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 20); };
  const openProduct = (item) => { window.location.hash = `product/${item.id}`; };

  return <div className="app-shell">
    <div className="announcement"><MapPin size={14} /> Local Durban delivery <span>·</span> Pay when it arrives <ArrowUpRight size={14} /></div>
    <header className="site-header">
      <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      <button className="brand" onClick={goHome} aria-label="KwikDrop home"><span>kwik</span><i>drop</i><b>.</b></button>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'}>
        <button onClick={goHome}>Shop</button><button onClick={() => jump('how-it-works')}>How it works</button><button onClick={() => jump('delivery')}>Delivery</button><button onClick={() => jump('faq')}>FAQs</button>
      </nav>
      <div className="header-actions"><button className="icon-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search"><Search size={19} /></button><a className="whatsapp-top" href={chatUrl('Hi KwikDrop! I have a question before ordering.')} target="_blank" rel="noreferrer"><MessageCircle size={17} /><span>Chat to order</span></a></div>
    </header>
    {searchOpen && <div className="searchbar"><Search size={17} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the current drop..." /><button onClick={() => { setSearchOpen(false); setQuery(''); }}><X size={17} /></button></div>}
    {product ? <ProductView product={product} quantity={quantity} setQuantity={setQuantity} liked={liked} setLiked={setLiked} goHome={goHome} /> : <HomeView visibleProducts={visibleProducts} category={category} setCategory={setCategory} openProduct={openProduct} jump={jump} />}
    <a className="floating-wa" href={chatUrl('Hi KwikDrop! I want to ask about your current products.')} target="_blank" rel="noreferrer"><MessageCircle size={21} /><span>Chat with us</span></a>
    <footer className="site-footer"><div className="footer-brand"><button className="brand" onClick={goHome}><span>kwik</span><i>drop</i><b>.</b></button><p>A small local store for useful things.</p></div><div className="footer-meta"><span>Durban, South Africa</span><span>© 2026 KwikDrop</span><a href={chatUrl('Hi KwikDrop! I need help with an order.')} target="_blank" rel="noreferrer">WhatsApp support <ArrowUpRight size={14} /></a></div></footer>
  </div>;
}

function HomeView({ visibleProducts, category, setCategory, openProduct, jump }) {
  return <main>
    <section className="hero trust-hero"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot" /> A local store, done properly</div><h1>Useful things.<br /><em>Good service.</em></h1><p>KwikDrop brings practical, good-looking products to people around Durban. Browse online, ask us anything on WhatsApp, and pay when your order arrives.</p><div className="hero-ctas"><a className="button button-dark" href="#shop">Shop the current drop <ArrowDown /></a><button className="text-link" onClick={() => jump('how-it-works')}>See how it works <ArrowUpRight size={16} /></button></div><div className="hero-assurance"><span><ShieldCheck size={16} /> No card details needed</span><span><UserRound size={16} /> Real person replies</span></div></div><div className="hero-art"><div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" /><div className="hero-card"><img src={products[0].image} alt="A KwikDrop home product" /><span className="hero-label">CURRENT DROP</span></div><div className="hero-sticker"><Zap size={16} fill="currentColor" /><span>local<br />& easy</span></div><div className="hero-caption">SELECTED FOR<br />EVERYDAY LIFE.</div></div></section>
    <section className="trust-strip"><div><Truck size={19} /><span><b>Local delivery</b> Umbilo + Glenwood first</span></div><div><ShieldCheck size={19} /><span><b>Pay on delivery</b> No online payment pressure</span></div><div><MessageCircle size={19} /><span><b>Order by WhatsApp</b> Ask before you buy</span></div><div><PackageCheck size={19} /><span><b>Stock confirmed</b> Before we dispatch</span></div></section>
    <section className="shop-section" id="shop"><div className="section-heading"><div><div className="eyebrow">The current drop</div><h2>Useful finds, <em>carefully chosen.</em></h2></div><p>We keep the range small so we can<br />keep the service personal.</p></div><div className="category-row">{categories.map((item) => <button key={item} className={category === item ? 'category active' : 'category'} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="product-grid">{visibleProducts.map((item, index) => <ProductCard key={item.id} product={item} index={index} openProduct={openProduct} />)}</div></section>
    <section className="editorial" id="how-it-works"><div className="editorial-image"><img src={products[2].image} alt="An everyday tumbler beside a morning coffee" /><div className="editorial-tag">small store<br /><b>big care</b></div></div><div className="editorial-copy"><div className="eyebrow">A simple local order</div><h2>Know what happens<br /><em>before you tap.</em></h2><p>There’s no complicated checkout and no guessing whether someone is actually nearby. We use WhatsApp to confirm the details with you first.</p><div className="steps"><div><span>01</span><b>Choose a product</b><small>Read the details and see the price in rands</small></div><div><span>02</span><b>Message KwikDrop</b><small>We confirm stock, area, fee and delivery time</small></div><div><span>03</span><b>Receive and pay</b><small>Pay on delivery once everything is right</small></div></div><a className="button button-outline" href={chatUrl('Hi KwikDrop! I want help choosing a product.')} target="_blank" rel="noreferrer">Talk to a person <MessageCircle size={17} /></a></div></section>
    <section className="confidence-section" id="delivery"><div className="section-heading"><div><div className="eyebrow">The KwikDrop promise</div><h2>Clear answers.<br /><em>No awkward surprises.</em></h2></div><p>We’re building this store one<br />good local order at a time.</p></div><div className="confidence-grid"><div><ShieldCheck size={22} /><h3>Pay when it arrives</h3><p>You don’t need to enter card details online. We confirm your order in WhatsApp, then you pay on delivery.</p></div><div><MapPin size={22} /><h3>Local by design</h3><p>We’re starting with Umbilo and Glenwood so delivery stays simple, quick to coordinate, and personal.</p></div><div><CircleHelp size={22} /><h3>Ask before ordering</h3><p>Want to know the colour, size, stock or delivery fee? Message us first. That’s exactly what WhatsApp is for.</p></div></div></section>
    <section className="faq-section" id="faq"><div className="eyebrow">Questions people should not have to guess</div><h2>Before you order.</h2><div className="faq-list"><details open><summary>How does ordering work? <ChevronDown size={17} /></summary><p>Tap “Order on WhatsApp” on any product. A message opens with the item and quantity already included. We confirm availability, your area, the delivery fee and a suitable time before dispatch.</p></details><details><summary>Where do you deliver? <ChevronDown size={17} /></summary><p>KwikDrop is starting with Umbilo and Glenwood. If you are nearby, message us anyway and we’ll let you know whether we can deliver to you.</p></details><details><summary>When do I pay? <ChevronDown size={17} /></summary><p>Payment is made when the order arrives. We do not ask you to enter card details on this website.</p></details><details><summary>What if I have a question about a product? <ChevronDown size={17} /></summary><p>Ask us on WhatsApp before ordering. We would rather answer a question clearly than have you buy something that is not right for you.</p></details></div></section>
  </main>;
}

function ProductCard({ product, index, openProduct }) { return <article className="product-card" onClick={() => openProduct(product)}><div className="product-image-wrap"><img src={product.image} alt={product.name} loading={index > 1 ? 'lazy' : 'eager'} /><span className="product-badge">{product.badge}</span><button className="quick-add" onClick={(e) => { e.stopPropagation(); openProduct(product); }}>See details <ArrowUpRight size={15} /></button></div><div className="product-info"><div><h3>{product.name}</h3><p>{product.tagline}</p></div><div className="product-price"><b>{money(product.price)}</b><small>pay on delivery</small></div></div><div className="product-status"><span className="status-dot" /> {product.status}</div></article>; }

function ProductView({ product, quantity, setQuantity, liked, setLiked, goHome }) {
  const [activeImage, setActiveImage] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  useEffect(() => { setActiveImage(0); setFormOpen(false); }, [product.id]);
  return <main className="detail-page"><button className="back-link" onClick={goHome}><ArrowLeft size={16} /> Back to the current drop</button><div className="detail-grid"><div className="gallery"><div className="main-product-image"><img src={product.thumbs[activeImage]} alt={product.name} /><span className="gallery-count">0{activeImage + 1} / 03</span></div><div className="thumb-row">{product.thumbs.map((image, index) => <button className={activeImage === index ? 'thumb active' : 'thumb'} key={image} onClick={() => setActiveImage(index)}><img src={image} alt={`${product.name} view ${index + 1}`} /></button>)}</div></div><div className="detail-copy"><div className="eyebrow">{product.category} / {product.badge}</div><div className="detail-title-row"><h1>{product.name}</h1><button className={liked ? 'like-btn liked' : 'like-btn'} onClick={() => setLiked(!liked)} aria-label="Save product"><Heart size={20} fill={liked ? 'currentColor' : 'none'} /></button></div><div className="detail-status"><span className="status-dot" /> {product.status} · stock confirmed in WhatsApp</div><p className="detail-tagline">{product.tagline}</p><p className="detail-description">{product.description}</p><ul className="feature-list">{product.features.map((feature) => <li key={feature}><BadgeCheck size={17} /> {feature}</li>)}</ul><div className="price-block"><div><strong>{money(product.price)}</strong><small> per item · pay on delivery</small></div><span>Price in ZAR</span></div><div className="order-box"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="order-button" onClick={() => setFormOpen(true)}><MessageCircle size={19} /> Continue to order <ArrowUpRight size={17} /></button></div><div className="delivery-note"><Truck size={18} /><div><b>Delivery around {STORE_AREAS}</b><span>{DELIVERY_NOTE}</span></div></div><div className="accordion"><details open><summary>What happens after I tap? <ChevronDown size={17} /></summary><p>You’ll enter your delivery details once. We’ll send one complete order message to WhatsApp so we can confirm stock, delivery fee and timing with you.</p></details><details><summary>Can I ask for another colour or option? <ChevronDown size={17} /></summary><p>Yes. Send us a message before ordering and we’ll tell you what is currently available from our supplier.</p></details></div></div></div><div className="mobile-sticky-cta"><button onClick={() => setFormOpen(true)}><MessageCircle size={18} /> Continue to order · {money(product.price * quantity)}</button></div>{formOpen && <OrderForm product={product} quantity={quantity} onClose={() => setFormOpen(false)} />}</main>;
}

function OrderForm({ product, quantity, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', suburb: 'Umbilo', time: 'Any suitable time', notes: '' });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));
  const submit = (event) => {
    event.preventDefault();
    const next = {};
    ['name', 'email', 'phone', 'address', 'suburb'].forEach((key) => { if (!form[key].trim()) next[key] = 'Please fill this in'; });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (Object.keys(next).length) { setErrors(next); return; }
    setErrors({}); setSent(true);
    window.open(whatsappUrl(product, quantity, form), '_blank', 'noopener,noreferrer');
  };
  return <div className="order-modal" role="dialog" aria-modal="true" aria-label="Complete your KwikDrop order"><div className="order-modal-card"><div className="order-modal-head"><div><div className="eyebrow">Almost there</div><h2>Tell us where to bring it.</h2><p>{product.name} × {quantity} · {money(product.price * quantity)}</p></div><button className="icon-btn" onClick={onClose} aria-label="Close order form"><X size={20} /></button></div>{sent ? <div className="order-sent"><div className="sent-icon"><MessageCircle size={24} /></div><h3>Your order message is ready.</h3><p>WhatsApp should have opened with all your details included. Send the message there and we’ll confirm stock, delivery fee and timing.</p><button className="button button-dark" onClick={onClose}>Back to product</button></div> : <form className="order-form" onSubmit={submit}><div className="form-intro"><ShieldCheck size={17} /><span>We only use these details to arrange this delivery. No card details required.</span></div><div className="form-grid"><label>Full name<input value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />{errors.name && <small>{errors.name}</small>}</label><label>Email address<input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="you@example.com" />{errors.email && <small>{errors.email}</small>}</label><label>WhatsApp number<input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="e.g. 082 123 4567" />{errors.phone && <small>{errors.phone}</small>}</label><label>Suburb<select value={form.suburb} onChange={(e) => update('suburb', e.target.value)}><option>Umbilo</option><option>Glenwood</option><option>Nearby — ask us</option></select>{errors.suburb && <small>{errors.suburb}</small>}</label><label className="full-field">Delivery address<input value={form.address} onChange={(e) => update('address', e.target.value)} placeholder="Street, house or unit number" />{errors.address && <small>{errors.address}</small>}</label><label>Preferred time<select value={form.time} onChange={(e) => update('time', e.target.value)}><option>Any suitable time</option><option>Morning</option><option>Afternoon</option><option>Early evening</option></select></label><label>Delivery note <span className="optional">optional</span><input value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Gate code, colour request..." /></label></div><button className="form-submit" type="submit"><MessageCircle size={18} /> Send complete order to WhatsApp <ArrowUpRight size={17} /></button><p className="form-footnote">We’ll confirm the delivery fee and availability before anything is dispatched.</p></form>}</div></div>;
}
function ArrowDown() { return <ChevronRight size={17} className="arrow-down" />; }
export default App;
