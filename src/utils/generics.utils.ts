export const GenericsUtils = (() => {
  const writeText = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadQR = (
    id: string,
    fileName: string = 'QRCode',
    fileType: string = 'image/png',
    quality: number = 1
  ) => {
    const svg: any = document.getElementById(id);
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const imageData = canvas.toDataURL(fileType, quality);
      const downloadLink = document.createElement('a');
      downloadLink.download = fileName;
      downloadLink.href = imageData;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return { writeText, downloadQR };
})();
