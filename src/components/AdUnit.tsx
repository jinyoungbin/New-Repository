import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdUnitProps {
    slotId?: string; // Optional for auto-ads, but usually required for specific units
    style?: React.CSSProperties;
    format?: 'auto' | 'fluid' | 'rectangle';
}

export default function AdUnit({ slotId = "0000000000", style, format = 'auto' }: AdUnitProps) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.error("AdSense Error:", e);
        }
    }, []);

    if (process.env.NODE_ENV === 'development') {
        return (
            <div style={{
                background: '#eee',
                border: '1px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                color: '#666',
                margin: '20px 0',
                ...style
            }}>
                <p>Google AdSense Placeholder</p>
                <small>Slot ID: {slotId}</small>
            </div>
        );
    }

    return (
        <div style={{ margin: '20px 0', overflow: 'hidden', ...style }}>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-3088684113092344" // Replace this!
                data-ad-slot={slotId}
                data-ad-format={format}
                data-full-width-responsive="true">
            </ins>
        </div>
    );
}
