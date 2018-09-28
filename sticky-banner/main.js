(function() {
  const banner = document.querySelector("#the-target");
  const bannerHeight = banner.getBoundingClientRect().height;
  const navbarHeight = document.querySelector(".navbar").getBoundingClientRect()
    .height;
  const accordion = document.querySelector("#accordion");
  const main = document.querySelector(".col-md-8");
  const mainAds = main.querySelector(".page-ads");
  const sidebar = document.querySelector(".col-md-4");
  const marginBottom = 30;

  let mainHeight;
  let mainOffsetBottom;
  let sidebarHeight;
  let sidebarOffsetTop;

  // Listen for changes to the height of the sidebar due to toggling of accordion panels
  const bannerObserverConfig = {
    attributes: true,
    childList: true,
    subtree: true
  };
  const bannerObserver = new MutationObserver(bannerObserverCallback);
  bannerObserver.observe(sidebar, bannerObserverConfig);
  function bannerObserverCallback() {
    mainHeight =
      main.getBoundingClientRect().height + main.getBoundingClientRect().top;
    sidebarHeight =
      sidebar.getBoundingClientRect().height +
      sidebar.getBoundingClientRect().top;
  }

  // Recalculate values of offset variables
  function resetValues() {
    mainOffsetBottom = mainAds.getBoundingClientRect().bottom - navbarHeight;
    sidebarOffsetTop =
      accordion.getBoundingClientRect().bottom +
      document.documentElement.scrollTop +
      marginBottom;
  }

  // Toggle styles for banner
  function toggleBanner() {
    if (window.innerWidth > 992 && mainHeight > sidebarHeight) {
      if (
        document.documentElement.scrollTop + navbarHeight >
        sidebarOffsetTop
      ) {
        banner.style.position = "fixed";
      } else {
        banner.style.position = "";
      }
      if (mainOffsetBottom <= bannerHeight) {
        let offset = bannerHeight - mainOffsetBottom - marginBottom;
        banner.style.top = `-${offset}px`;
      } else {
        banner.style.top = `${navbarHeight}px`;
      }
    }
  }

  // Break out event listener for on scroll events
  function scrollListener() {
    resetValues();
    toggleBanner();
  }
  window.addEventListener("scroll", scrollListener);
})();
