import http from 'http';
import app from './server';
import appConfig from './config';

const server = http.createServer(app);
let currentApp = app;

server.listen(appConfig.port, () => {
	console.log(`Server listening on port: ${appConfig.port}`)
});

if (module.hot) {
	module.hot.accept(['./server'], () => {
		server.removeListener('request', currentApp)
		server.on('request', app)
		currentApp = app
	})
}
