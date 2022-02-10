export const CheckURL = (url, extnsns) =>
  new Promise((resolve, reject) => {
    if (url) {
      let extFile = GetFileExtension(url);

      const arrExtns = Object.keys(extnsns);

      let noCorrectExt = true;

      for (const ext of arrExtns) {
        if (extnsns[ext].includes(extFile.toLowerCase())) {
          resolve(ext);

          noCorrectExt = false;
        }
      }

      if (noCorrectExt) {
        reject('Invalid file type  ( enter json, jpg, jpeg or png file )');
      }
    } else {
      reject('Check URL, image is not found');
    }
  });

export function GetFileExtension(filename) {
  return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
}

export const FileAndImageSize = (url, params) => {
  return new Promise((resolve, reject) => {
    let size;
    fetch(url)
      .then((response) => {
        size = Number(response.headers.get('content-length'));
        console.log(size);
        if (Number(size) > params.minimumFileSize && Number(size) < params.maximumFileSize) {
          const img = new Image();

          img.crossOrigin = 'Anonymous';

          img.addEventListener('load', () => {
            if (
              img.width > params.widthRowMin &&
              img.width < params.sizeImgMax &&
              img.height > params.heightRowMin &&
              img.height < params.sizeImgMax
            ) {
              resolve(img);
            } else reject(url + '  (incorrect image size)');
          });

          img.src = url;

          img.addEventListener('error', () => {
            reject(url + '  (loading error)');
          });
        } else reject(url + '  (incorrect file size)');
      })

      .catch(() => reject(url + '  (loading error)'));
  });
};
