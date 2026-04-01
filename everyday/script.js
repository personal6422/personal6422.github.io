const BAEMIN_URL = "https://s.baemin.com/rh000vmmEzYY9";

const menuData = [
  {
    id: 1,
    title: "시그니처 메뉴",
    subtitle: "다양한 어종 구성",
    price: "인기 최고",
    desc: "푸짐한 회와 정갈한 포장으로 초대용으로 딱.",
    image: "images/menu-1.jpg",
  },
{
  id: 2,
  title: "모듬회 메뉴",
  subtitle: "모두가 좋아하는 구성",
  price: "주문 인기",
  desc: "여러 가지 회를 한 번에 즐길 수 있어 가족, 지인과 함께하기 좋은 대표 인기 메뉴입니다.",
  image: "images/menu-2.jpg",
},
{
  id: 3,
  title: "도다리 세꼬시",
  subtitle: "꼬들한 식감의 별미",
  price: "봄 메뉴 추천",
  desc: "씹을수록 고소한 맛이 살아나 세꼬시 좋아하는 분들이 많이 찾는 메뉴입니다.",
  image: "images/menu-3.jpg",
},
{
  id: 4,
  title: "혼술세트",
  subtitle: "혼자서도 푸짐하게",
  price: "실속 만족",
  desc: "부담 없이 즐기기 좋고 집에서 편하게 한잔하기 좋은 1인 추천 구성입니다.",
  image: "images/menu-4.jpg",
},

];

const reviewData = [
  { id: 1, image: "images/review-1.jpg", alt: "회브리데이 리뷰 이미지 1" },
  { id: 2, image: "images/review-2.jpg", alt: "회브리데이 리뷰 이미지 2" },
  { id: 3, image: "images/review-3.jpg", alt: "회브리데이 리뷰 이미지 3" },
  { id: 4, image: "images/review-4.jpg", alt: "회브리데이 리뷰 이미지 4" },
  { id: 5, image: "images/review-5.jpg", alt: "회브리데이 리뷰 이미지 5" },
  { id: 6, image: "images/review-6.jpg", alt: "회브리데이 리뷰 이미지 6" },
];

function goToBaemin() {
  window.open(BAEMIN_URL, "_blank", "noopener,noreferrer");
}

function createMenuCard(item) {
  const article = document.createElement("article");
  article.className = "menu-card";

  article.innerHTML = `
    <img src="${item.image}" alt="${item.title}" class="menu-card-image" />
    <div class="menu-card-body">
      <h3 class="menu-card-title">${item.title}</h3>
      <p class="menu-card-subtitle">${item.subtitle}</p>
      <p class="menu-card-price">${item.price}</p>
      <p class="menu-card-desc">${item.desc}</p>
      <button type="button" class="cta-btn js-menu-order-btn">이 메뉴 주문하러 가기</button>
    </div>
  `;

  article.querySelector(".js-menu-order-btn").addEventListener("click", goToBaemin);
  return article;
}

function createReviewCard(item) {
  const article = document.createElement("article");
  article.className = "review-card";
  article.innerHTML = `
    <img src="${item.image}" alt="${item.alt}" />
  `;
  return article;
}

function renderMenus() {
  const menuList = document.getElementById("menu-list");
  if (!menuList) return;

  menuData.forEach((item) => {
    menuList.appendChild(createMenuCard(item));
  });
}

function renderReviews() {
  const reviewList = document.getElementById("review-list");
  if (!reviewList) return;

  reviewData.forEach((item) => {
    reviewList.appendChild(createReviewCard(item));
  });
}

function bindBaeminButtons() {
  const buttons = document.querySelectorAll(".js-baemin-link");
  buttons.forEach((button) => {
    button.addEventListener("click", goToBaemin);
  });
}

function bindScrollButtons() {
  const scrollButtons = document.querySelectorAll("[data-scroll]");
  scrollButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.getAttribute("data-scroll");
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenus();
  renderReviews();
  bindBaeminButtons();
  bindScrollButtons();
});