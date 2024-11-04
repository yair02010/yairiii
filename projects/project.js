async function downloadFile(  fileurl) {
    const url = fileurl;
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "GallryProject1.html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}