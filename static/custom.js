window.onload = function () {
  const handleCloudBtn = () => {
    const cloud = document.querySelector('.navbar__item.nav-cloud');
    const isEnEnv = window.location.href.indexOf('en') > -1;
    cloud.style.display = isEnEnv ? 'block' : 'none';
  };
  window.addEventListener('hashchange', () => {
    handleCloudBtn()
  });
  window.addEventListener('popstate', () => {
    handleCloudBtn()
  });

  handleCloudBtn()
};
