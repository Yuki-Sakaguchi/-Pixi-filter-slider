/**
 * スライドアニメーション
 * 
 * 参考
 *    https://idolypride.jp/
 *    https://qiita.com/jun01ito/items/74cb080345c5de327ef4
 * 
 * PIXIのFilter
 *    https://pixijs.io/pixi-filters/tools/demo/
 *    https://github.com/pixijs/pixi-filters
 */
var currentIndex = 0;
var isAnimation = false;
var isWacky = false; // trueにすると奇抜なアニメーションになる

var app, imagesContainer, texture, displacementFilter;
var imageList = [ "../images/sample01.png", "../images/sample02.png"];
var textureImage = "../images/crystalize.jpg"; // "../images/smog.webp";

/**
 * 初期化
 */
function init () {
  // アプリケーションを作成
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // フルスクリーンになるように設定
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(window.innerWidth, window.innerHeight);
  document.body.appendChild(app.view);

  // メインの画像を読み込み、位置を調整してステージに追加
  imagesContainer = new PIXI.Container();
  app.stage.addChild(imagesContainer);

  for (var i = 0; i < imageList.length; i++) {
    var texture = new PIXI.Texture.from(imageList[i]);
    var sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(.5);
    sprite.x = window.innerWidth / 2;
    sprite.y = window.innerHeight / 2;
    // １つ目以外は透明にする
    if (i != 0) {
      TweenMax.set(sprite, {
        alpha: 0
      });
    }
    imagesContainer.addChild(sprite);
  }

  // アニメーションで使うテクスチャーを読み込む
  texture = new PIXI.Sprite.from(textureImage);
  texture.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
  texture.scale.x = 2;
  texture.scale.y = 2;
  if (isWacky) {
    texture.anchor.set(.5);
    texture.x = window.innerWidth / 2;
    texture.y = window.innerHeight / 2;
  }

  // テクスチャーをフィルターに変換
  displacementFilter = new PIXI.filters.DisplacementFilter(texture);
  displacementFilter.scale.x = 0;
  displacementFilter.scale.y = 0;
  displacementFilter.autoFit = true;

  // その他のフィルター
  var asciiFilter = new PIXI.filters.AsciiFilter();
  var oldFilmFilter = new PIXI.filters.OldFilmFilter();
  var pixelateFilter = new PIXI.filters.PixelateFilter();
  var noiseFilter = new PIXI.filters.NoiseFilter();

  // フィルターを追加
  app.stage.filters = [ displacementFilter ];
  app.stage.addChild(texture);
}

/**
 * スライドアニメーション
 * @param {number} index 
 */
function moveSlide (index) {
  isAnimation = true

  // フェードアニメーション用
  var fadeAnime = new TimelineMax();

  // クリスタルのアニメーションの設定（終わったら初期化とアニメーション中に変更する値）
  var slideAnime = new TimelineMax({
    onComplete: function () {
      isAnimation = false
      currentIndex = index;
      if (isWacky) {
        texture.scale.set(1)
      }
    },
    onUpdate: function () {
      if (isWacky) {
        texture.rotation += .02 * slideAnime.progress();
        texture.scale.set(3 * slideAnime.progress())
      }
    }
  });

  // 初期化
  fadeAnime.clear();
  slideAnime.clear();

  // スライドアニメーション
  if (!slideAnime.isActive()) {
    slideAnime.to(displacementFilter.scale, .5, {
      x: - 200,
      y: - 0,
      ease: "easeInCirc",
      onComplete: function () {
        slideAnime.fromTo(displacementFilter.scale, .5, {
            x: - 200,
            y: - 0,
          }, {
              x: 0,
              y: 0,
              ease: "easeOutQuart"
          })
      }
    })
  }

  // カレントを透明にして、次の表示を表示
  fadeAnime.to(imagesContainer.children[currentIndex], .2, {
      alpha: 0,
      ease: Power2.easeOut
  }, .5).to(imagesContainer.children[index], .2, {
      alpha: 1,
      ease: Power2.easeOut
  }, .5)
}

/**
 * クリックでアニメーションを起動させる 
 */
function clickHandler () {
  if (isAnimation) {
    return false;
  }
  moveSlide(currentIndex+1 == imageList.length ? 0 : currentIndex+1);
}

/**
 * リサイズで画面サイズを調整
 */
function resizeHandler () {
  imagesContainer.children.forEach(function (val) {
    val.x = window.innerWidth / 2;
    val.y = window.innerHeight / 2;
  })
  app.renderer.resize(window.innerWidth, window.innerHeight);
}

/**
 * 描画
 */
function render () {
    displacementFilter.rotation += .001;
    requestAnimationFrame(render);
    app.renderer.render(app.stage);
}

/**
 * 実行
 */
init();
window.addEventListener('click', clickHandler)
window.addEventListener('resize', resizeHandler)
render();