from pathlib import Path

app = Path('/home/ubuntu/KwikDrop/src/App.jsx')
text = app.read_text()
text = text.replace('<div className="hero-product-card"><span>FEATURED NOW</span><strong>Halo Mist Diffuser</strong><small>From {money(349)}</small></div>', '<div className="hero-product-card"><span>THE NEXT DROP</span><strong>Wireless earbuds</strong><small>Ask us when they land.</small></div>')
app.write_text(text)

css = Path('/home/ubuntu/KwikDrop/src/styles.css')
css.write_text(css.read_text() + """

/* Premium earbud hero: cinematic, layered, and safe on touch devices. */
.hero-cinematic{isolation:isolate;min-height:calc(100svh - 112px);background:#06111f;overflow:hidden}
.hero-cinematic .hero-bg{inset:-5%;background-image:url('/KwikDrop/kwikdrop-earbuds-hero-b.jpg');background-size:cover;background-position:center right;transform:scale(1.06);animation:heroCinematicZoom 14s cubic-bezier(.2,.8,.2,1) 1 both;will-change:transform}
.hero-cinematic .hero-shade{background:linear-gradient(90deg,rgba(3,12,24,.94) 0%,rgba(3,12,24,.78) 31%,rgba(3,12,24,.18) 65%,rgba(3,12,24,.12) 100%),linear-gradient(0deg,rgba(3,12,24,.42),transparent 45%);z-index:1}
.hero-cinematic:before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:radial-gradient(circle at 72% 42%,rgba(201,242,120,.12),transparent 20%),radial-gradient(circle at 90% 18%,rgba(243,109,85,.14),transparent 25%);mix-blend-mode:screen;animation:heroGlow 8s ease-in-out 1 both}
.hero-cinematic:after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;opacity:.18;background-image:radial-gradient(rgba(255,255,255,.7) 1px,transparent 1px);background-size:29px 29px;mask-image:linear-gradient(90deg,transparent,black 60%,transparent);animation:particleDrift 12s linear 1 both}
.hero-cinematic .hero-content{z-index:4;animation:heroCopyIn .9s cubic-bezier(.2,.8,.2,1) .12s both}
.hero-cinematic .hero-product-card{z-index:5;backdrop-filter:blur(15px);background:rgba(7,23,39,.72);border:1px solid rgba(201,242,120,.55);box-shadow:0 25px 80px rgba(0,0,0,.35),0 0 0 1px rgba(243,109,85,.13);animation:heroBadgeIn .9s cubic-bezier(.2,.8,.2,1) .42s both}
.hero-cinematic .hero-product-card:after{content:"";position:absolute;inset:-18px;border:1px solid rgba(201,242,120,.24);border-radius:inherit;transform:rotate(-5deg);pointer-events:none}
.hero-cinematic .hero-product-card span{color:var(--mint)}
.hero-cinematic .hero-product-card strong{color:#fff}
.hero-cinematic .hero-product-card small{color:#c9d6df}
.hero-cinematic .hero-scroll{z-index:4;color:#d9e5ed;animation:scrollCueIn .8s ease 1.1s both}
.hero-cinematic .hero-actions .button-primary{box-shadow:0 0 0 0 rgba(243,109,85,.45);animation:ctaPulse 3.5s ease-in-out 1.2s 2}
@keyframes heroCinematicZoom{from{transform:scale(1.12)}to{transform:scale(1.04)}}
@keyframes heroGlow{from{opacity:.2;transform:scale(.96)}to{opacity:1;transform:scale(1.04)}}
@keyframes particleDrift{from{transform:translate3d(-2%,1%,0)}to{transform:translate3d(2%,-1%,0)}}
@keyframes heroCopyIn{from{opacity:0;transform:translate3d(-24px,18px,0)}to{opacity:1;transform:none}}
@keyframes heroBadgeIn{from{opacity:0;transform:translate3d(28px,22px,0) rotate(4deg)}to{opacity:1;transform:translate3d(0,0,0) rotate(3deg)}}
@keyframes scrollCueIn{from{opacity:0;transform:translateY(12px)}to{opacity:.78;transform:none}}
@keyframes ctaPulse{0%,100%{box-shadow:0 0 0 0 rgba(243,109,85,0)}45%{box-shadow:0 0 0 11px rgba(243,109,85,.16)}}
@media(max-width:760px){.hero-cinematic{min-height:calc(100svh - 94px);min-height:620px}.hero-cinematic .hero-bg{background-position:68% center;transform:scale(1.12)}.hero-cinematic .hero-shade{background:linear-gradient(180deg,rgba(3,12,24,.36),rgba(3,12,24,.78) 52%,rgba(3,12,24,.96) 100%),linear-gradient(90deg,rgba(3,12,24,.38),transparent)}.hero-cinematic .hero-content{padding-top:clamp(150px,29vh,250px)}.hero-cinematic .hero-product-card{right:18px;top:118px;transform:rotate(2deg) scale(.86);transform-origin:top right}.hero-cinematic:after{background-size:22px 22px;opacity:.1}}
@media(prefers-reduced-motion:reduce){.hero-cinematic .hero-bg,.hero-cinematic:before,.hero-cinematic:after,.hero-cinematic .hero-content,.hero-cinematic .hero-product-card,.hero-cinematic .hero-scroll,.hero-cinematic .hero-actions .button-primary{animation:none!important;transform:none!important}}
""")
