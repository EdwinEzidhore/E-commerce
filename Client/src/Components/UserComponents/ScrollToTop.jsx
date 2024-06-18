import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';


 function ScrollToTop({dependency}) {
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [dependency]);

    return null;
}

export default ScrollToTop

