export function DownloadDocument(path) {
	const tagA = document.createElement("a");
	tagA.href = path;
	tagA.target = "_blank";
	document.body.appendChild(tagA);
	tagA.click();
}