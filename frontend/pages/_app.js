import { Provider } from 'react-redux';
import store from '../store/store'; // Redux ストアをインポート
import '../styles/globals.css'; // Tailwind CSS のグローバルスタイルを適用

// React Toastify のスタイルを適用
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<ToastContainer position='top-right' autoClose={3000} />
			<Component {...pageProps} />
		</Provider>
	);
}
