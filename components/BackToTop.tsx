import "../style/recipes.css";

function BackToTop() {
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <div id="scrollDiv">
      <button id="scrollToTop" onClick={topFunction}>
        ↑ Back to Top ↑
      </button>
    </div>
  );
}

export default BackToTop;
