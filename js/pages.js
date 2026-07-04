// ==========================================================
// サブページ別の初期化処理
// <body data-page="..."> の値で振り分け（CSP対応のため外部ファイル化）
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  const init = PAGE_INITS[page];
  if (init) init();
});

const PAGE_INITS = {
  // ---------- グッズ販売【郵送】 ----------
  goods() {
    const grid = document.getElementById("goodsGridAll");
    if (!grid) return;
    grid.innerHTML = GOODS.map(
      (g, i) => `
      <article class="goods-card is-visible">
        <div class="goods-visual"><span>${String.fromCharCode(65 + (i % 26))}</span></div>
        <div class="goods-body">
          <h3 class="goods-name">${g.name}</h3>
          <p class="goods-price-label">価格</p>
          <p class="goods-price">￥${g.price.toLocaleString("ja-JP")} <span class="goods-tax">消費税抜き</span></p>
        </div>
      </article>`
    ).join("");
  },

  // ---------- 株式会社HAGI ----------
  hagi() {
    // メンバー（ダミー名）
    const MEMBERS = [
      { role: "代表取締役", name: "山田 花子" },
      { role: "役員", name: "佐藤 あかり" },
      { role: "メンバー", name: "鈴木 亜美" },
      { role: "メンバー", name: "田中 瀬里" },
      { role: "メンバー", name: "高橋 結" },
      { role: "メンバー", name: "伊藤 葵" },
      { role: "メンバー", name: "渡辺 奈那" },
      { role: "メンバー", name: "中村 葉奈" },
    ];
    const memberGrid = document.getElementById("memberGrid");
    if (memberGrid) {
      memberGrid.innerHTML = MEMBERS.map(
        (m, i) => `
        <div class="member-card">
          <div class="member-photo">${String.fromCharCode(65 + i)}</div>
          <p class="m-role">${m.role}</p>
          <p class="m-name">${m.name}</p>
        </div>`
      ).join("");
    }
    const sponsorGrid = document.getElementById("sponsorGrid");
    if (sponsorGrid) {
      sponsorGrid.innerHTML = SPONSORS.map((s) => `<div class="sponsor-cell">${s}</div>`).join("");
    }
    setupDemoForm("pressForm", "pressDone");
  },

  // ---------- ニュース ----------
  news() {
    const list = document.getElementById("newsList");
    if (!list) return;
    const tabs = document.querySelectorAll(".news-tab");

    function render(cat) {
      const items = NEWS_ARTICLES.filter((a) => cat === "すべて" || a.cat === cat);
      list.innerHTML = items.length
        ? items.map((a) => `
          <li class="news-item">
            <time>${a.date}</time>
            <span class="news-tag">${a.cat}</span>
            <a href="#">${a.title}</a>
          </li>`).join("")
        : '<li class="news-item"><span>該当する記事はありません。</span></li>';
    }

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => t.classList.remove("is-active"));
        tab.classList.add("is-active");
        render(tab.dataset.cat);
      });
    });

    document.querySelectorAll("#pagination button").forEach((b) => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#pagination button").forEach((x) => x.classList.remove("is-active"));
        b.classList.add("is-active");
      });
    });

    render("すべて");
  },

  // ---------- 過去のイベント ----------
  event() {
    const rows = document.getElementById("eventRows");
    if (!rows) return;
    rows.innerHTML = PAST_EVENTS.map(
      (ev) => `
      <div class="event-row">
        <div class="event-row-date">
          <div class="d">${ev.d}</div>
          <div class="w">${ev.w}</div>
        </div>
        <div class="event-row-body">
          <h3>${ev.name}</h3>
          <p class="venue">${ev.venue}</p>
          <p class="time">${ev.time}</p>
        </div>
        <a href="#" class="btn btn-outline">詳細</a>
      </div>`
    ).join("");
  },

  // ---------- フォームのみのページ ----------
  oubo() { setupDemoForm("applyForm", "applyDone"); },
  volunteer() { setupDemoForm("volForm", "volDone"); },
  sponsorship() { setupDemoForm("sponsorForm", "sponsorDone"); },
  casting() { setupDemoForm("castingForm", "castingDone"); },
  sample() { setupDemoForm("sampleForm", "sampleDone"); },
};
