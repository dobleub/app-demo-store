const responseHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
	'Access-Control-Allow-Headers': 'Content-Type,Accept,Authorization',
	'Access-Control-Max-Age': 1000,
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