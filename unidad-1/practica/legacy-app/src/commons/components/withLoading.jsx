import { useState, useEffect } from 'react';

// HOC con carga local por montaje, independiente del estado global de la app.
const withLoading = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const {
      localLoadingMs = 4200,
      loadingText = 'Cargando vista...',
      ...restProps
    } = props;
    const [isLocalLoading, setIsLocalLoading] = useState(true);

    useEffect(() => {
      setIsLocalLoading(true);
      const timer = setTimeout(() => {
        setIsLocalLoading(false);
      }, localLoadingMs);

      return () => clearTimeout(timer);
    }, [localLoadingMs]);

    if (isLocalLoading) {
      return (
        <div style={{ textAlign: 'center', padding: '100px', fontSize: '18px', color: '#94a3b8' }}>
          {loadingText}
        </div>
      );
    }

    return <WrappedComponent {...restProps} />;
  };
};

export default withLoading;
