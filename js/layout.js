// ==========================================================
// 共通レイアウト（ヘッダー / フッター）を全ページに注入
// ==========================================================

const NAV_ITEMS = [
  { href: "index.html", label: "ホーム" },
  { href: "goods.html", label: "グッズ販売【郵送】" },
  { href: "hagi.html", label: "株式会社HAGI" },
  { href: "sponsorship.html", label: "ブース出店&サンプリング" },
  { href: "event.html", label: "過去のイベント" },
  { href: "recruit.html", label: "採用情報" },
];

const NAV_SUB_ITEMS = [
  { href: "oubo-form.html", label: "応募フォーム" },
  { href: "volunteer.html", label: "ボランティアスタッフ" },
  { href: "news.html", label: "ニュース" },
  { href: "tokushoho.html", label: "特定商取引法に基づく表示" },
  { href: "sdgs.html", label: "SDGsの取り組み" },
  { href: "influencer-casting.html", label: "インフルエンサーキャスティング" },
  { href: "sample-sale.html", label: "サンプルセール" },
  { href: "members.html", label: "Members" },
];

function currentPage() {
  const p = location.pathname.split("/").pop();
  return p === "" ? "index.html" : p;
}

function renderHeader() {
  const cur = currentPage();
  const li = (item) =>
    `<li><a href="${item.href}" ${item.href === cur ? 'class="is-active"' : ""}>${item.label}</a></li>`;

  return `
  <div class="header-inner">
    <a class="brand" href="index.html">
      <span class="brand-mark">R</span>
      <span class="brand-text">RE FASHION MARKET</span>
    </a>
    <nav class="global-nav" id="globalNav" aria-label="メインメニュー">
      <ul>
        ${NAV_ITEMS.map(li).join("")}
        <li class="has-sub">
          <button type="button" class="sub-toggle" aria-expanded="false">その他</button>
          <ul class="sub-menu">${NAV_SUB_ITEMS.map(li).join("")}</ul>
        </li>
      </ul>
    </nav>
    <div class="header-actions">
      <button type="button" class="btn btn-outline btn-login">ログイン</button>
      <button type="button" class="nav-toggle" id="navToggle" aria-label="メニューを開く" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>`;
}

function renderFooter() {
  return `
  <div class="container footer-grid">
    <div class="footer-brand">
      <p class="footer-logo">RE FASHION MARKET</p>
      <p class="footer-copy-lead">インフルエンサーフリーマーケット（デモサイト）</p>
    </div>
    <nav class="footer-nav" aria-label="フッターメニュー">
      <div>
        <h3>チケット</h3>
        <ul>
          <li><a href="event.html">チケット購入・開催予定はこちら</a></li>
          <li><a href="goods.html">グッズ販売【郵送】</a></li>
          <li><a href="news.html">ニュース</a></li>
        </ul>
      </div>
      <div>
        <h3>会社情報</h3>
        <ul>
          <li><a href="hagi.html">取材・メディア掲載はこちら</a></li>
          <li><a href="recruit.html">採用情報</a></li>
          <li><a href="tokushoho.html">特定商取引法に基づく表示</a></li>
        </ul>
      </div>
    </nav>
  </div>
  <p class="copyright">Copyright © Demo Site</p>`;
}

// 注入
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const footer = document.querySelector(".site-footer");
  if (header && !header.innerHTML.trim()) header.innerHTML = renderHeader();
  if (footer && !footer.innerHTML.trim()) footer.innerHTML = renderFooter();
  setupNavCommon();
});

function setupNavCommon() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("globalNav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  document.querySelectorAll(".sub-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const li = btn.closest(".has-sub");
      const isOpen = li.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(isOpen));
    });
  });
}

// 汎用: デモフォーム（送信処理なし・完了メッセージのみ）
function setupDemoForm(formId, doneId) {
  const form = document.getElementById(formId);
  const done = document.getElementById(doneId);
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    form.querySelectorAll("input, textarea, select").forEach((el) => {
      const ok = el.checkValidity();
      el.classList.toggle("is-error", !ok);
      if (!ok) valid = false;
    });
    if (!valid) return;
    form.reset();
    if (done) {
      done.hidden = false;
      done.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}
