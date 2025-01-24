import { Provider } from 'react-redux';
import store from '../store/store'; // Redux ストアをインポート
import '../styles/globals.css'; // Tailwind CSS のグローバルスタイルを適用

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	);
}
