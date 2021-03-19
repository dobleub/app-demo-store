const responseHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
	'Allow': 'OPTIONS,POST,GET',
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