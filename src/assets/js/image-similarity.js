/**
 * @author zhangxinxu(.com)
 * @created 2021-06-27
 * @description 判断图像，或者图像部分区域是不是在视觉上接近纯色
 * 详见：https://www.zhangxinxu.com/wordpress/?p=9982
**/


// 获取图像相似度值
export const imageSimilarityValue = function (url, bounding) {
  // 获取图像资源，此方法可以有效避免跨域限制
  const getImgObj = function (src, onloaded, onerror) {
      onloaded = onloaded || function () {};
      // 请求图片数据
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
          var url = URL.createObjectURL(this.response);
          var img = new Image();
          img.onload = function () {
              // 此时你就可以使用canvas对img为所欲为了
              onloaded(img);
              // 释放内存
              URL.revokeObjectURL(url);
          };
          img.src = url;
      };
      xhr.onerror = onerror || function () {};
      xhr.open('GET', src, true);
      xhr.responseType = 'blob';
      xhr.send();
  };

  // 两个RGB色值之间的相似度判断
  const colorDistance = function (arrRGB1, arrRGB2) {
      let [r1, g1, b1] = arrRGB1;
      let [r2, g2, b2] = arrRGB2;

      let rmean = (r1 + r2) / 2;

      let r = r1 - r2;
      let g = g1 - g2;
      let b = b1 - b2;

      return Math.sqrt((2 + rmean / 256) * r * r  + 4 * g * g + (2 + (255 - rmean) / 256) * b * b);
  };

  // 核心逻辑
  return new Promise((resolve, reject) => {
      if (typeof ColorThief != 'function') {
          reject('need color-thief.js');
          return;
      }

      getImgObj(url, function (img) {
          // 图像的尺寸
          let imageWidth = img.naturalWidth;
          let imageHeight = img.naturalHeight;

          if (imageWidth * imageHeight == 0) {
              reject('image size error');
              return;
          }
          // 原始图像的比例
          let scaleImage = imageWidth / imageHeight;

          // 目标尺寸在30-40左右
          let canvasWidth = 41.5687;
          let canvasHeight = 41.5687;
          if (scaleImage > 1) {
              canvasHeight = canvasWidth / scaleImage;
          } else {
              canvasWidth = canvasHeight * scaleImage;
          }

          // 避免极限尺寸
          if (canvasWidth < 30) {
              canvasWidth = 30;
              canvasHeight = 30 / scaleImage;
          } else if (canvasHeight < 30) {
              canvasHeight = 30;
              canvasWidth = 30 * scaleImage;
          }

          // canvas绘制缩小的比例
          let scaleCanvas = canvasHeight / imageHeight;

          if (scaleCanvas > 1) {
              scaleCanvas = 1;
              canvasWidth = imageWidth;
              canvasHeight = imageHeight;
          }

          // bounding尺寸同步缩小
          if (Array.isArray(bounding) && bounding.length == 4) {
              bounding = bounding.map(val => val * scaleCanvas);
          } else {
              bounding = [0, 0, canvasWidth, canvasHeight];
          }

          var canvasColor = document.createElement('canvas');
          canvasColor.width = canvasWidth;
          canvasColor.height = canvasHeight;
          var contextColor = canvasColor.getContext('2d');

          // 缩小范围
          contextColor.drawImage(img, 0, 0, canvasWidth, canvasHeight);

          var colorThief = new ColorThief();
          var arrLocalDominantColor = colorThief.getPalette(canvasColor, 3, bounding);

          // document.body.insertAdjacentHTML('beforeend', `<p>${arrLocalDominantColor.map(rgb => {
          //     return `<button style="background-color:rgb(${rgb.join()});border:0;">&emsp;</button>`;
          // }).join('')}</p>`);

          // 计算平均颜色距离
          let arrDistance = [];
          arrLocalDominantColor.forEach(function (arrRGB) {
              arrLocalDominantColor.forEach(function (arrRGB2) {
                  if (arrRGB2 != arrRGB) {
                      arrDistance.push(colorDistance(arrRGB, arrRGB2));
                  }
              });
          });

          // 求和
          let sum = arrDistance.reduce(function (prev, curv) {
              return prev + curv;
          });

          resolve({
              colors: arrLocalDominantColor.map(rgb => `rgb(${rgb.join()})`),
              similarity: Math.round(100 * sum / arrDistance.length) / 100
          });
      }, function () {
          reject('image load failed!');
      });
  });
};

// 获取相似度
// 0 极度相似
// 1 相似
// 2 不太相似
// 3 不相似
// 4 差异较大
export const imageSimilarity = function (url, bounding) {
  return new Promise((resolve, reject) => {
      imageSimilarityValue(url, bounding).then(result => {
          let similarity = result.similarity;
          resolve(Math.floor(similarity / 50));
      }).catch((reason) => {
          console.error('失败：' + reason);
          reject(reason);
      });
  });
};



// imageSimilarityValue(src, bounding)

//  src 是任意格式的图像地址。 bounding 是图像上局部区域的尺寸设置，格式是数组，需要4个数组项，都是数值，分别表示坐标和宽高，例如 [10, 10, 300, 100] 表示判断原始图像左上角坐标是 10,10，宽高是 300×100 的矩形区域的视觉色彩是否丰富。