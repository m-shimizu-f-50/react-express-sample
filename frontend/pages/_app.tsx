import '../styles/globals.css'; // Tailwind CSS のグローバルスタイルを適用

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
