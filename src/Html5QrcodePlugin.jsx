import {
	Html5QrcodeScanner,
	Html5QrcodeScannerState
} from "html5-qrcode";

import React, { useEffect, useRef } from 'react';

export const Html5QrcodePlugin = ({
	elementId,
	config,
	onCodeScanned,
	onCodeScanFailed = undefined,
	verbose = false,
	className
}) => {
	const html5QrcodeScanner = useRef(null);

	useEffect(() => {
		const initiatedStates = [
			Html5QrcodeScannerState.SCANNING,
			Html5QrcodeScannerState.PAUSED,
		];

		if (!html5QrcodeScanner.current || initiatedStates.includes(html5QrcodeScanner.current?.getState())) {
			html5QrcodeScanner.current = new Html5QrcodeScanner(
				elementId,
				config,
				verbose
			);

			html5QrcodeScanner.current?.render(onCodeScanned, onCodeScanFailed);
		}

		return () => {
			if (html5QrcodeScanner.current && initiatedStates.includes(html5QrcodeScanner.current?.getState())) {
				html5QrcodeScanner.current?.clear().catch(error => {
					console.error("Failed to clear html5QrcodeScanner. ", error);
				});
			}
		};
	}, [elementId, config, onCodeScanned, onCodeScanFailed, verbose, html5QrcodeScanner]);

	return <div id={elementId} className={className} />;
};