const responseHeaders = {
	'access-control-allow-origin': '*',
	'access-control-allow-methods': 'GET, POST',
	'access-control-allow-headers': 'content-type, accept',
	'access-control-max-age': 10,
	'Content-Type': 'application/json'
};

const isset = (obj:Object):boolean => {
	var exists = false;
	if (typeof obj !== 'undefined') {
		exists = true;
	}
	return exists;
};

export {
	responseHeaders,
	isset
}