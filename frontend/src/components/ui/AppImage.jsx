import { useState, useCallback, useMemo, memo } from 'react';

const AppImage = memo(function AppImage({
  src,
  alt,
  width,
  height,
  className = '',
  fallbackSrc = '/assets/image/no_image.png',
  loading = 'lazy',
  onClick,
  fill = false,
  style,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = useCallback(() => {
    if (imageSrc !== fallbackSrc) setImageSrc(fallbackSrc);
    setIsLoading(false);
  }, [imageSrc, fallbackSrc]);

  const handleLoad = useCallback(() => setIsLoading(false), []);

  const imageClassName = useMemo(() => {
    const classes = [className];
    if (isLoading) classes.push('app-image-loading');
    if (onClick) classes.push('app-image-clickable');
    return classes.filter(Boolean).join(' ');
  }, [className, isLoading, onClick]);

  const imgStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style }
    : style;

  const wrapped = (
    <img
      src={imageSrc}
      alt={alt}
      width={fill ? undefined : width || 400}
      height={fill ? undefined : height || 300}
      className={imageClassName}
      loading={loading}
      onError={handleError}
      onLoad={handleLoad}
      onClick={onClick}
      style={imgStyle}
      {...props}
    />
  );

  if (fill) {
    return <div style={{ position: 'relative', width: '100%', height: '100%' }}>{wrapped}</div>;
  }
  return wrapped;
});

AppImage.displayName = 'AppImage';

export default AppImage;
