import React, { useState, useEffect, useRef } from 'react';
import type { DotType, CornerType, ErrorCorrectionLevel } from './types';
import { ControlPanel } from './components/ControlPanel';

// Since qr-code-styling is loaded via a script tag, we declare it globally for TypeScript
declare const QRCodeStyling: any;

const App: React.FC = () => {
  const [text, setText] = useState<string>('https://gemini.google.com/');
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [dotColor, setDotColor] = useState<string>('#1f2937');
  const [backgroundColor, setBackgroundColor] = useState<string>('#ffffff');
  const [dotType, setDotType] = useState<DotType>('rounded');
  const [eyeType, setEyeType] = useState<CornerType>('extra-rounded');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<ErrorCorrectionLevel>('Q');

  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<any | null>(null);

  useEffect(() => {
    if (qrRef.current) {
      qrCodeInstance.current = new QRCodeStyling({
        width: 500,
        height: 500,
        data: text,
        image: logo,
        dotsOptions: {
          color: dotColor,
          type: dotType,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
          type: eyeType,
          color: dotColor,
        },
        cornersDotOptions: {
          type: 'dot', // Keep inner dots consistent
          color: dotColor,
        },
        qrOptions: {
            errorCorrectionLevel: errorCorrectionLevel,
        },
        imageOptions: {
          crossOrigin: 'anonymous',
          margin: 10,
        },
      });
      qrCodeInstance.current.append(qrRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount to initialize

  useEffect(() => {
    if (qrCodeInstance.current) {
      qrCodeInstance.current.update({
        data: text,
        image: logo,
        dotsOptions: {
          color: dotColor,
          type: dotType,
        },
        backgroundOptions: {
          color: backgroundColor,
        },
        cornersSquareOptions: {
            type: eyeType,
            color: dotColor,
        },
        cornersDotOptions: {
            type: 'dot',
            color: dotColor,
        },
        qrOptions: {
            errorCorrectionLevel: errorCorrectionLevel,
        },
      });
    }
  }, [text, logo, dotColor, backgroundColor, dotType, eyeType, errorCorrectionLevel]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setLogo(undefined);
    }
  };
  
  const handleDownload = (extension: 'png' | 'svg') => {
      if (qrCodeInstance.current) {
          qrCodeInstance.current.download({
              name: 'qr-code',
              extension,
          });
      }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <ControlPanel
              text={text}
              dotColor={dotColor}
              backgroundColor={backgroundColor}
              dotType={dotType}
              eyeType={eyeType}
              errorCorrectionLevel={errorCorrectionLevel}
              onTextChange={setText}
              onLogoChange={handleLogoChange}
              onDotColorChange={setDotColor}
              onBackgroundColorChange={setBackgroundColor}
              onDotTypeChange={setDotType}
              onEyeTypeChange={setEyeType}
              onErrorCorrectionLevelChange={setErrorCorrectionLevel}
              onDownloadPNG={() => handleDownload('png')}
              onDownloadSVG={() => handleDownload('svg')}
            />
          </div>
          <div className="lg:col-span-3 flex items-center justify-center bg-gray-100 rounded-lg p-8 min-h-[300px] lg:min-h-0">
            <div ref={qrRef} className="w-full h-full max-w-[500px] max-h-[500px] aspect-square" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
