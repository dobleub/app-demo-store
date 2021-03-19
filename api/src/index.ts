import { createServer, IncomingMessage, ServerResponse } from 'http';
import { execute, parse } from 'graphql';
import { compileQuery } from 'graphql-jit';
import { set, connect, connection } from 'mongoose';

// Api imports
import superSchema from './schemas';
import dataSources from './datasources';

// Defining types
import appconfig from './app.config';

// Custom imports
import mongoURL from './utils/mongoURL';
import { responseHeaders } from './utils';
import { responseType } from './types/response';

if (appconfig.NODE_ENV == 'development') {
	set('debug', true);
}
connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true}, function (err:any) {
	if (err) throw err;
	console.info(`Successfully connected to DB in ${appconfig.DB_HOST}`);
});

const PORT = appconfig.APP_PORT || 3000;
const PATH = appconfig.APP_URI || '/graphql';

// Setting up Server
const cache:any = {};
const httpServer = createServer((req:IncomingMessage, res:ServerResponse) => {
	let response:responseType = { code: 404, data: { msg: 'Not found' } };
	const { url, headers, method } = req;
	
	if (url && url.includes(PATH)) {
		let payload:string = '';
		let data:any = [];
		
		req.on('data', (chunk:any) => {
			payload += chunk.toString();
		});
	
		req.on('end', async () => {
			try {
				if (method !== 'OPTIONS') {
					const { query, variables } = JSON.parse(payload);
					
					cache[query] = cache[query] || compileQuery(superSchema, parse(query));
					data = await cache[query].query({}, { dataSources }, variables);
				}
				response.code = 200;
				response.data = data;
			} catch (error) {
				response = {code: 400, data: {msg: 'Bad Request'}};
			}
			
			res.writeHead(response.code, responseHeaders);
			res.end(JSON.stringify(response.data));
		});
	} else {
		response = {code: 404, data: {msg: 'Not found'}};	

		res.writeHead(response.code, responseHeaders);
		res.end(JSON.stringify(response.data));
	}
});

// The `listen` method launches a web server.
httpServer.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}${PATH}`);
});

process.on('SIGINT', () => {
	connection.close(() => {
		process.exit(0);
	});
});