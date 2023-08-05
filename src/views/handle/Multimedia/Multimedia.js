
export const getBase64 = (img, callback)  => {
	const reader = new FileReader();
	reader.addEventListener("load", () => callback(reader.result));
	reader.readAsDataURL(img);
}

export const getUrl = async (file)  =>  {
	return await new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(file.originFileObj);
		reader.onload = () => resolve(reader.result);
	});
}


export const onPreviewHelper = async (file) => {
	if(!file?.type?.toLowerCase()?.includes("image") || !["png","jpg","jpeg","tif","tiff"].includes(file?.url?.toLowerCase())){
		let src = file.url;
		if(!src){
			src = await getUrl(file);
		}
		let a = document.createElement('a');
		a.target = "_blank";
		a.href = src;
		a.download = file.name;
		a.click();
	}else{
		let src = file.url;
		if (!src) {
			src = await getUrl(file);
		}
		const image = new Image();
		image.src = src;
		const imgWindow = window.open(src);
		imgWindow.document.write(image.outerHTML);
	}
};